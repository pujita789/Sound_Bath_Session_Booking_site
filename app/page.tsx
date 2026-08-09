"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { Assistant } from "./features/assistant/Assistant";
import { ConfirmedView } from "./features/booking/ConfirmedView";
import { HomeView } from "./features/booking/HomeView";
import { PersonalizeView } from "./features/booking/PersonalizeView";
import { RecommendationView } from "./features/booking/RecommendationView";
import { useBookingFlow } from "./features/booking/useBookingFlow";
import { FacilitatorView } from "./features/facilitator/FacilitatorView";
import type { ProductView } from "./types";

/** Composition root for the UI. Feature logic belongs in hooks and feature modules. */
export default function Home() {
  const booking = useBookingFlow();
  const [view, setView] = useState<ProductView>("attendee");
  const [assistantOpen, setAssistantOpen] = useState(false);

  return <main>
    <Header view={view} onViewChange={setView} onHome={() => booking.setScreen("home")} onProfile={() => booking.setNotice("Profile settings are available after your first booking.")} />
    {view === "facilitator" ? <FacilitatorView onAttendee={() => setView("attendee")} /> : <>
      {booking.screen === "home" && <HomeView onBegin={() => booking.setScreen("personalize")} onSkip={() => { booking.setSelectedFrequency("Middle"); booking.setScreen("recommendation"); }} />}
      {booking.screen === "personalize" && <PersonalizeView preferences={booking.preferences} onChange={booking.updatePreference} onBack={() => booking.setScreen("home")} onContinue={booking.recommend} />}
      {booking.screen === "recommendation" && <RecommendationView recommendation={booking.localRecommendation} selected={booking.selectedFrequency} onSelect={booking.setSelectedFrequency} name={booking.name} email={booking.email} onNameChange={booking.setName} onEmailChange={booking.setEmail} notice={booking.notice} onBack={() => booking.setScreen("personalize")} onConfirm={booking.confirm} />}
      {booking.screen === "confirmed" && <ConfirmedView frequency={booking.selectedFrequency} support={booking.preferences.support} bookingRef={booking.bookingRef} onDashboard={() => booking.setScreen("home")} />}
    </>}
    <button className="concierge" onClick={() => setAssistantOpen(open => !open)} aria-expanded={assistantOpen}><span className="spark">✦</span><span>Ask Lumi</span></button>
    {assistantOpen && <Assistant onClose={() => setAssistantOpen(false)} />}
    {booking.notice && booking.screen !== "recommendation" && <div className="toast" role="status">{booking.notice}<button onClick={() => booking.setNotice("")}>×</button></div>}
  </main>;
}
