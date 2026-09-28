"use client";

import { Children, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Icon } from "./icons";
import { useShop } from "./shop-provider";
import styles from "./manual-slider.module.css";

type ManualSliderProps = {
  children: ReactNode;
  label: string;
  variant?: "products" | "categories";
  controlsLabel?: string;
};

export function ManualSlider({ children, label, variant = "products", controlsLabel = label.toLowerCase() }: ManualSliderProps) {
  const { hydrated } = useShop();
  const slides = Children.toArray(children);
  const track = useRef<HTMLDivElement>(null);
  const id = useId();
  const [position, setPosition] = useState({ previous: false, next: slides.length > 1, first: 1, last: 1 });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const firstSlide = element.firstElementChild as HTMLElement | null;
      if (!firstSlide) return;
      const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
      const step = firstSlide.getBoundingClientRect().width + gap;
      const first = Math.round(element.scrollLeft / step) + 1;
      const visible = Math.max(1, Math.floor((element.clientWidth + gap + 1) / step));
      const next = {
        previous: element.scrollLeft > 2,
        next: element.scrollLeft < element.scrollWidth - element.clientWidth - 2,
        first: Math.min(first, slides.length),
        last: Math.min(first + visible - 1, slides.length),
      };
      setPosition(current => Object.keys(next).every(key => current[key as keyof typeof current] === next[key as keyof typeof next]) ? current : next);
    };
    const frame = requestAnimationFrame(update);
    const resize = new ResizeObserver(update);
    resize.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, [slides.length]);

  function move(direction: number, single = false) {
    const element = track.current;
    const firstSlide = element?.firstElementChild;
    if (!element || !firstSlide) return;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    const step = firstSlide.getBoundingClientRect().width + gap;
    const visible = single ? 1 : Math.max(1, Math.floor((element.clientWidth + gap + 1) / step));
    const target = (Math.round(element.scrollLeft / step) + direction * visible) * step;
    element.scrollTo({
      left: Math.max(0, Math.min(target, element.scrollWidth - element.clientWidth)),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return <div className={styles.slider + " " + styles[variant]} role="region" aria-label={label + " slider"} aria-roledescription="carousel">
    <button className={styles.control + " " + styles.previous} type="button"
      aria-label={"Previous " + controlsLabel} aria-controls={id}
      disabled={!hydrated || !position.previous} onClick={() => move(-1)}>
      <Icon name="arrow" width="20" height="20" className="rotate-180" />
    </button>
    <div id={id} ref={track} className={styles.track} data-slider-track tabIndex={0}
      role="group" aria-label={label + ". Swipe or use the arrow buttons to browse."}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1, true);
        } else if (event.key === "Home" || event.key === "End") {
          event.preventDefault();
          event.currentTarget.scrollTo({ left: event.key === "Home" ? 0 : event.currentTarget.scrollWidth, behavior: "instant" });
        }
      }}>
      {slides.map((slide, index) => <div className={styles.slide} key={index}
        role="group" aria-roledescription="slide" aria-label={(index + 1) + " of " + slides.length}>{slide}</div>)}
    </div>
    <button className={styles.control + " " + styles.next} type="button"
      aria-label={"Next " + controlsLabel} aria-controls={id}
      disabled={!hydrated || !position.next} onClick={() => move(1)}>
      <Icon name="arrow" width="20" height="20" />
    </button>
    <span className="sr-only" aria-live="polite" aria-atomic="true">
      Showing items {position.first} to {position.last} of {slides.length}
    </span>
  </div>;
}
