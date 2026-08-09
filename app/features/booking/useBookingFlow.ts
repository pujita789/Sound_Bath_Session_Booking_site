"use client";

import { useMemo, useState } from "react";
import { api } from "../../lib/api";
import type { Frequency, Preferences, Screen } from "../../types";

const INITIAL_PREFERENCES: Preferences = { goal: "Relaxation", experience: "First time", intensity: "Gentle", sensitivity: "Slightly sensitive", support: "Extra cushion" };

/** Owns attendee-flow state and API orchestration, leaving page.tsx declarative. */
export function useBookingFlow() {
  const [screen, setScreen] = useState<Screen>("home");
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>("Low");
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [bookingRef, setBookingRef] = useState(""); const [notice, setNotice] = useState("");

  const localRecommendation = useMemo<Frequency>(() => {
    if (preferences.intensity === "Immersive" && preferences.sensitivity === "Not sensitive") return "High";
    if (preferences.intensity === "Moderate" && preferences.sensitivity !== "Sensitive to loud sounds") return "Middle";
    return "Low";
  }, [preferences]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const updatePreference = (field: keyof Preferences, value: string) => setPreferences(current => ({ ...current, [field]: value }));

  async function recommend() {
    try {
      const result = await api.getRecommendation({ experience_level: preferences.experience, sound_intensity: preferences.intensity, sound_sensitivity: preferences.sensitivity, session_goal: preferences.goal });
      setSelectedFrequency(result.recommended_frequency);
    } catch { setSelectedFrequency(localRecommendation); }
    setScreen("recommendation"); scrollTop();
  }

  async function confirm() {
    if (name.trim().length < 2 || !email.includes("@")) { setNotice("Please add your name and a valid email to reserve your space."); return; }
    setNotice("Saving your reservation…");
    try {
      const result = await api.createBooking({
        name,
        email,
        frequency: selectedFrequency,
        experience_level: preferences.experience,
        session_goal: preferences.goal,
        sound_intensity: preferences.intensity,
        sound_sensitivity: preferences.sensitivity,
        comfort_requirement: preferences.support,
      });

      // Save the registered user's identity for the header
      localStorage.setItem(
        "session_user",
        JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        })
      );

      // Tell Header.tsx that the user has changed
      window.dispatchEvent(new Event("user-updated"));

      setBookingRef(result.booking_reference);
      setNotice("");
      setScreen("confirmed");
      scrollTop();
    } catch (error) { setNotice(error instanceof Error ? error.message : "The backend is not available."); }
  }

  return { screen, setScreen, preferences, updatePreference, selectedFrequency, setSelectedFrequency, name, setName, email, setEmail, bookingRef, notice, setNotice, localRecommendation, recommend, confirm };
}
