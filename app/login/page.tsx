import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { AuthForm } from "@/components/auth-form";
export default function Login(){return <SiteShell><section className="auth-wrap"><p className="eyebrow">GOOD TO SEE YOU AGAIN</p><h1 className="mt-2">Welcome back.</h1><p className="mt-2">Sign in to your Logo account.</p><AuthForm mode="login"/><p className="mt-5">New here? <Link className="underline font-bold" href="/register">Create an account</Link>.</p></section></SiteShell>}
