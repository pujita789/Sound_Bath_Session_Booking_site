interface Props { onBegin: () => void; onSkip: () => void }

/** First-time attendee landing view for the featured session. */
export function HomeView({ onBegin, onSkip }: Props) {
  return <div className="page home-page">
    <section className="welcome"><p className="eyebrow">Your next moment of stillness</p><h1>A session shaped<br />around <em>you.</em></h1><p className="lead">Share only what feels useful. We’ll help your facilitator prepare the details that make it easier to settle in.</p></section>
    <section className="session-feature">
      <div className="session-art" aria-hidden="true"><div className="orb orb-one" /><div className="orb orb-two" /><div className="orb orb-three" /><div className="art-label"><span>FRI</span><b>14</b><small>AUG</small></div></div>
      <div className="session-copy"><div className="pill-row"><span className="pill sage">Sound bath</span><span className="pill">7 spaces left</span></div><h2>Deep Rest<br />Sound Bath</h2><div className="details"><p><span>◷</span><b>Friday, August 14</b><small>6:00–7:15 PM</small></p><p><span>⌖</span><b>Field House, Studio 2</b><small>42 Garden Lane</small></p><p><span>◌</span><b>With Maya Chen</b><small>Sound practitioner</small></p></div><button className="primary" onClick={onBegin}>Find my experience <span>→</span></button><button className="text-button" onClick={onSkip}>Skip personalization & book normally</button></div>
    </section>
    <section className="trust-row"><div><span>01</span><p><b>You choose what to share</b><small>Every preference is optional.</small></p></div><div><span>02</span><p><b>You make the final choice</b><small>Our guidance is only a suggestion.</small></p></div><div><span>03</span><p><b>A human is always nearby</b><small>Ask the session team anytime.</small></p></div></section>
  </div>;
}
