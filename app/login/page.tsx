import Link from 'next/link';
import { signIn } from './actions';
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <main className="login-page"><div className="login-card"><Link className="brand" href="/">TripConnect</Link><p className="eyebrow">STAFF ACCESS</p><h1>Welcome back.</h1><p className="muted">Sign in with your authorised admin account.</p><form action={signIn} className="interest-form login-form"><label>Email address<input name="email" type="email" required autoComplete="email" /></label><label>Password<input name="password" type="password" required autoComplete="current-password" /></label><button className="submit-button" type="submit">Sign in <span>↗</span></button>{error && <p className="status error" role="alert">{error}</p>}</form><Link className="back-link" href="/">← Back to trips</Link></div></main>;
}
