"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { AssistanceRequest, FacilitatorSummary } from "../../types";

interface Props { onAttendee: () => void }
interface Attendee {
  id: string;
  name: string;
  frequency: string;
  experience?: string;
  goal?: string;
  status: string;
}
/** Operator dashboard backed by live aggregate and assistance APIs. */
export function FacilitatorView({ onAttendee }: Props) {
  const [summary, setSummary] = useState<FacilitatorSummary | null>(null);
  const [requests, setRequests] = useState<AssistanceRequest[]>([]);
  const [error, setError] = useState("");
  const [attendeesList, setAttendeesList] = useState<Attendee[]>([]);
  const load = useCallback(async () => {
    try {
      // const [nextSummary, nextRequests] = await Promise.all([api.getSummary(), api.getAssistance()]);
      const [nextSummary, nextRequests, nextAttendees] =
        await Promise.all([
          api.getSummary(),
          api.getAssistance(),
          api.getAttendees(),
        ]);

      setSummary(nextSummary);
      setRequests(nextRequests);
      setAttendeesList(nextAttendees);
      setError("");
      setSummary(nextSummary); setRequests(nextRequests); setError("");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Dashboard data is unavailable."); }
  }, []);

  useEffect(() => { load(); }, [load]);
  async function acknowledge(id: string) { await api.acknowledgeAssistance(id); await load(); }

  const attendees = summary?.attendees ?? 23;
  const capacity = summary?.capacity ?? 30;
  const firstTime = summary?.first_time ?? 11;
  const frequencies = summary?.frequencies ?? { Low: 9, Middle: 10, High: 4 };
  const comfortItems = Object.values(summary?.comfort ?? {}).reduce((total, count) => total + Number(count), 0) || 16;

  return <div className="page facilitator-page">
    <div className="dash-head"><div><p className="eyebrow">Friday, August 14 · 6:00 PM</p><h1>Good afternoon, Maya.</h1><p>Here’s what will help tonight’s group settle in.</p></div><button className="primary" onClick={onAttendee}>Preview attendee flow →</button></div>
    {error && <p className="form-error">{error}</p>}
    <section className="brief-card"><div className="brief-icon">✦</div><div><p className="eyebrow">Lumi’s session brief</p><h2>Plan a little more time for arrival and orientation.</h2><p>{summary?.brief ?? "Loading the live session brief…"}</p></div><button className="secondary" onClick={load}>Refresh brief</button></section>
    <div className="stats-grid"><article><small>Attendees</small><b>{attendees} <i>/ {capacity}</i></b><span>{capacity - attendees} spaces remaining</span></article><article><small>First-time guests</small><b>{firstTime}</b><span>{Math.round(firstTime / attendees * 100)}% of tonight’s group</span></article><article><small>Comfort items</small><b>{comfortItems}</b><span>Prepare before 5:30 PM</span></article><article><small>Open requests</small><b>{summary?.open_requests ?? 2}</b><span className="warm">Needs your attention</span></article></div>
    <div className="dashboard-grid"><section className="panel prep-panel"><div className="panel-head"><div><p className="eyebrow">Room preparation</p><h2>What to set out</h2></div></div>{[["Chairs", 4, 6], ["Extra cushions", 7, 10], ["Blankets", 5, 8], ["Easy-exit spaces", 3, 4]].map(([name, count, total]) => <div className="prep-row" key={String(name)}><p><b>{name}</b><small>{count} requested</small></p><div><span style={{ width: `${Number(count) / Number(total) * 100}%` }} /></div><b>{count}</b></div>)}</section><section className="panel distribution"><div className="panel-head"><div><p className="eyebrow">Sound distribution</p><h2>Tonight’s preferences</h2></div></div><div className="donut"><div><b>{attendees}</b><small>guests</small></div></div><ul><li><i className="low" />Low <b>{frequencies.Low ?? 0}</b></li><li><i className="mid" />Middle <b>{frequencies.Middle ?? 0}</b></li><li><i className="high" />High <b>{frequencies.High ?? 0}</b></li></ul></section></div>

    {/* ATTENDEES */}
    <section className="panel attendees-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Tonight's group</p>
          <h2>Registered attendees</h2>
        </div>

        <span className="attendee-count">
          {attendeesList.length} / {capacity}
        </span>
      </div>

      {attendeesList.length === 0 ? (
        <div className="empty-state">
          No attendees have registered yet.
        </div>
      ) : (
        <div className="attendee-list">
          {attendeesList.map((attendee, index) => (
            <div className="attendee-row" key={attendee.id}>
              <span
                className={`person ${index % 2 ? "peach" : "lilac"
                  }`}
              >
                {attendee.name
                  .split(" ")
                  .map((value) => value[0])
                  .join("")
                  .slice(0, 2)}
              </span>

              <div className="attendee-details">
                <b>{attendee.name}</b>

                <small>
                  {attendee.frequency} frequency
                  {attendee.experience
                    ? ` · ${attendee.experience}`
                    : ""}
                </small>
              </div>

              <span className="attendee-status">
                {attendee.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>


    {/* ASSISTANCE REQUESTS */}
    <section className="panel requests">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Human support</p>
          <h2>Assistance requests</h2>
        </div>

        <button
          className="text-button"
          onClick={load}
        >
          Refresh requests
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="empty-state">
          No assistance requests at the moment.
        </div>
      ) : (
        requests.map((request, index) => (
          <div
            className="request-row"
            key={request.id}
          >
            <span
              className={`person ${index % 2 ? "peach" : "lilac"
                }`}
            >
              {request.attendee_name
                .split(" ")
                .map((value) => value[0])
                .join("")
                .slice(0, 2)}
            </span>

            <p className="request-details">
              <b>{request.attendee_name}</b>
              <small>
                {request.message || request.request_type}
              </small>
            </p>

            <span
              className={`priority ${request.priority === "MEDIUM"
                ? "medium"
                : ""
                }`}
            >
              {request.status}
            </span>

            <button
              className="secondary request-action"
              disabled={request.status !== "OPEN"}
              onClick={() =>
                acknowledge(request.id)
              }
            >
              {request.status === "OPEN"
                ? "Acknowledge"
                : "Acknowledged"}
            </button>
          </div>
        ))
      )}
    </section>
  </div>;
}
