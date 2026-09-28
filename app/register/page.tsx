import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { AuthForm } from "@/components/auth-form";
export default function Register(){return <SiteShell><section className="auth-wrap"><p className="eyebrow">MAKE YOURSELF AT HOME</p><h1 className="mt-2">Your Logo account.</h1><p className="mt-2">A home for your good finds and order details.</p><AuthForm mode="register"/><p className="mt-5">Already part of the family? <Link className="underline font-bold" href="/login">Sign in</Link>.</p></section></SiteShell>}
