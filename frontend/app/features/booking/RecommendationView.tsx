import type { Frequency } from "../../types";

interface Props { recommendation: Frequency; selected: Frequency; onSelect: (value: Frequency) => void; name: string; email: string; onNameChange: (value: string) => void; onEmailChange: (value: string) => void; notice: string; onBack: () => void; onConfirm: () => void }

/** Explainable recommendation plus attendee-controlled final selection. */
export function RecommendationView(props: Props) {
  return <div className="flow-page page recommendation-page">
    <div className="flow-header"><div className="progress"><span style={{ width: "66.666%" }} /></div><p className="eyebrow">Step 2 of 3</p><h1>Your gentle starting point.</h1><p>Based on what you shared, we think this experience may feel most comfortable.</p></div>
    <section className="recommend-card"><div className="frequency-visual"><div className="rings"><span /><span /><span /></div><p>OUR SUGGESTION</p><h2>{props.recommendation}</h2><small>frequency experience</small></div><div className="reasoning"><span className="ai-label">✦ Lumi’s recommendation</span><h3>A softer soundscape with space to settle in.</h3><p>Your declared sound preferences and experience level suggest {props.recommendation} as a comfortable starting point. This is a comfort suggestion—not a medical decision.</p><button className="why">Why this recommendation? <span>＋</span></button><div className="prep-chip">Your facilitator will prepare your requested comfort support.</div></div></section>
    <section className="alternatives"><div><p className="eyebrow">The choice is always yours</p><h3>Choose your sound level</h3></div><div className="frequency-options">{(["Low", "Middle", "High"] as Frequency[]).map((frequency, index) => <button key={frequency} className={props.selected === frequency ? "frequency selected" : "frequency"} onClick={() => props.onSelect(frequency)}><small>{["Gentle & grounding", "Balanced & enveloping", "Deep & immersive"][index]}</small><b>{frequency}</b><span>{props.selected === frequency ? "Selected ✓" : "Choose"}</span></button>)}</div></section>
    <section className="booking-fields"><div><p className="eyebrow">Reserve your place</p><h3>Where should we send your confirmation?</h3></div><label>Full name<input value={props.name} onChange={event => props.onNameChange(event.target.value)} placeholder="Alex Morgan" /></label><label>Email address<input type="email" value={props.email} onChange={event => props.onEmailChange(event.target.value)} placeholder="alex@example.com" /></label></section>
    {props.notice && <p className="form-error" role="status">{props.notice}</p>}
    <div className="form-actions edge"><button className="secondary" onClick={props.onBack}>← Adjust answers</button><button className="primary" onClick={props.onConfirm}>Continue with {props.selected} <span>→</span></button></div>
  </div>;
}
