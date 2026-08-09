import { EXPERIENCE_LEVELS, GOALS, SENSITIVITY_LEVELS, SOUND_LEVELS, SUPPORTS } from "./constants";
import type { Preferences } from "../../types";

interface Props { preferences: Preferences; onChange: (field: keyof Preferences, value: string) => void; onBack: () => void; onContinue: () => void }
interface ChoiceProps { number: string; title: string; hint: string; choices: string[]; value: string; onChange: (value: string) => void }

function FlowHeader() { return <div className="flow-header"><div className="progress"><span style={{ width: "33.333%" }} /></div><p className="eyebrow">Step 1 of 3</p><h1>A few details, at your pace.</h1><p>This takes about a minute. Every question is optional and only helps us prepare your session.</p></div>; }

function ChoiceSection({ number, title, hint, choices, value, onChange }: ChoiceProps) {
  return <fieldset className="choice-section"><legend><span>{number}</span><b>{title}</b><small>{hint}</small></legend><div className="choice-grid">{choices.map(choice => <button type="button" key={choice} className={value === choice ? "choice selected" : "choice"} onClick={() => onChange(choice)}><i>{value === choice ? "✓" : ""}</i>{choice}</button>)}</div></fieldset>;
}

/** Optional preference questionnaire. New questions can be added as ChoiceSection rows. */
export function PersonalizeView({ preferences, onChange, onBack, onContinue }: Props) {
  return <div className="flow-page page"><FlowHeader /><div className="form-card">
    <ChoiceSection number="01" title="What would feel most useful today?" hint="Choose one" choices={GOALS} value={preferences.goal} onChange={value => onChange("goal", value)} />
    <ChoiceSection number="02" title="How familiar is this experience?" hint="Choose one" choices={EXPERIENCE_LEVELS} value={preferences.experience} onChange={value => onChange("experience", value)} />
    <ChoiceSection number="03" title="What sound intensity feels right?" hint="You can change this later" choices={SOUND_LEVELS} value={preferences.intensity} onChange={value => onChange("intensity", value)} />
    <ChoiceSection number="04" title="Are you sensitive to louder sounds?" hint="Choose one" choices={SENSITIVITY_LEVELS} value={preferences.sensitivity} onChange={value => onChange("sensitivity", value)} />
    <ChoiceSection number="05" title="Would any comfort support help?" hint="Optional" choices={SUPPORTS} value={preferences.support} onChange={value => onChange("support", value)} />
    <div className="privacy-note"><span>⌁</span><p><b>Why we ask</b><small>Your answers help us suggest an experience and prepare the room. They’re never used for diagnosis or advertising.</small></p></div>
    <div className="form-actions"><button className="secondary" onClick={onBack}>← Back</button><button className="primary" onClick={onContinue}>See my recommendation <span>→</span></button></div>
  </div></div>;
}
