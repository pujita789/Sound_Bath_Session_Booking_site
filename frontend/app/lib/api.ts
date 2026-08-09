/** Central API client. Keep transport concerns out of React components. */

import type {
  AssistanceRequest,
  BookingPayload,
  BookingResult,
  FacilitatorSummary,
  RecommendationPayload,
  RecommendationResult,
} from "../types";
interface Attendee {
  id: string;
  name: string;
  frequency: string;
  experience?: string;
  goal?: string;
  status: string;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api";

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ?? "The request could not be completed."
    );
  }

  return data as T;
}

export const api = {
  createBooking: (payload: BookingPayload) =>
    request<BookingResult>("/attendees", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getRecommendation: (payload: RecommendationPayload) =>
    request<RecommendationResult>("/recommendation", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  chat: (message: string) =>
    request<{ reply: string }>("/assistant/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    }),

  getSummary: () =>
    request<FacilitatorSummary>("/facilitator/session-summary"),

  getAssistance: () =>
    request<AssistanceRequest[]>("/assistance"),
  getAttendees: () =>
    request<Attendee[]>("/attendees"),
  createAssistance: (payload: Record<string, string>) =>
    request<{ id: string }>("/assistance", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  acknowledgeAssistance: (id: string) =>
    request<{ status: string }>(`/assistance/${id}`, {
      method: "PATCH",
    }),
};
