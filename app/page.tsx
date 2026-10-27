import { trips } from '@/lib/trips';
import InterestForm from '@/components/InterestForm';

export default function HomePage() {
  return <main>
    <nav className="nav wrap"><a className="brand" href="/">TripConnect</a><a className="nav-link" href="/admin">Admin sign in ↗</a></nav>
    <section className="hero wrap"><p className="eyebrow">LEARNING BEYOND THE CLASSROOM</p><h1>Big experiences.<br/><em>Lasting lessons.</em></h1><p className="hero-copy">Give students a new perspective on the world. Explore our sample educational trips and tell us what your school is interested in.</p><a className="primary-link" href="#register">Register your interest <span>↓</span></a><div className="hero-stamp">CURIOUS<br/>MINDS<br/><b>WELCOME</b></div></section>
    <section className="trips-section"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">THREE WAYS TO EXPLORE</p><h2>Where could learning take you?</h2></div><p>Just a starting point. Share your interest and we’ll follow up with more details.</p></div><div className="trip-grid">{trips.map((trip, i) => <article className={`trip-card trip-${i + 1}`} key={trip.id}><div className="trip-number">0{i + 1} / SAMPLE TRIP</div><div className="trip-art" aria-hidden="true"><span>{i === 0 ? '✳' : i === 1 ? '⌂' : '◉'}</span><small>{trip.location.toUpperCase()}</small></div><div className="trip-info"><h3>{trip.name}</h3><p>{trip.description}</p><a href="#register">I’m interested <span>↗</span></a></div></article>)}</div></div></section>
    <section className="register-section" id="register"><div className="wrap register-grid"><div className="register-intro"><p className="eyebrow">STEP 01 — TELL US ABOUT YOUR SCHOOL</p><h2>Let’s make<br/><em>something happen.</em></h2><p>Register your interest below. This isn’t a booking or commitment—just a way for us to understand what your students would love to experience.</p><div className="note">✳ &nbsp; No commitment required at this stage.</div></div><InterestForm /></div></section>
    <footer className="footer wrap"><a className="brand" href="/">TripConnect</a><p>Made for curious classrooms.</p><a href="/admin">Admin</a></footer>
  </main>;
}
