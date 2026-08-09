/** Shared frontend domain types mirror the public API contract. */
export type Frequency = "Low" | "Middle" | "High";
export type Screen = "home" | "personalize" | "recommendation" | "confirmed";
export type ProductView = "attendee" | "facilitator";

export interface Preferences {
  goal: string;
  experience: string;
  intensity: string;
  sensitivity: string;
  support: string;
}

export interface BookingPayload {
  name: string; email: string; frequency: Frequency;
  experience_level: string; session_goal: string; sound_intensity: string;
  sound_sensitivity: string; comfort_requirement: string;
}

export interface BookingResult { id: string; booking_reference: string; status: string }
export interface RecommendationPayload { experience_level: string; sound_intensity: string; sound_sensitivity: string; session_goal: string }
export interface RecommendationResult { recommended_frequency: Frequency; reason: string; confidence: number; advisory: string }
export interface AssistanceRequest { id: string; attendee_name: string; message: string; request_type: string; priority: string; status: string }
export interface FacilitatorSummary { attendees: number; capacity: number; first_time: number; frequencies: Record<Frequency, number>; comfort: Record<string, number>; sound_sensitive: number; open_requests: number; brief: string }
