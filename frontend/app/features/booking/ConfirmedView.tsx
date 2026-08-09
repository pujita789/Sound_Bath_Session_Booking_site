import { useState } from "react";
import { WaveMark } from "../../components/WaveMark";
import type { Frequency } from "../../types";

interface Props {
  frequency: Frequency;
  support: string;
  bookingRef: string;
  onDashboard: () => void;
}

export function ConfirmedView({
  frequency,
  support,
  bookingRef,
  onDashboard,
}: Props) {
  const [showCalendarNotice, setShowCalendarNotice] = useState(false);

  const addToGoogleCalendar = () => {
    const title = "Deep Rest Sound Bath";
    const location = "Field House";

    const description = [
      `Booking: ${bookingRef}`,
      `Experience: ${frequency} frequency`,
      `Comfort request: ${support}`,
    ].join("\n");

    // Friday, August 14, 2026
    // 6:00 PM → 7:15 PM
    const start = "20260814T180000";
    const end = "20260814T191500";

    const googleCalendarUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(title)}` +
      `&dates=${start}/${end}` +
      `&location=${encodeURIComponent(location)}` +
      `&details=${encodeURIComponent(description)}`;

    window.open(
      googleCalendarUrl,
      "_blank",
      "noopener,noreferrer"
    );

    setShowCalendarNotice(true);

    // Hide notification after 4 seconds
    setTimeout(() => {
      setShowCalendarNotice(false);
    }, 4000);
  };

  return (
    <div className="page confirmation-page">

      <div className="confirmation-mark">✓</div>

      <p className="eyebrow">You’re all set</p>

      <h1>Your space is waiting.</h1>

      <p className="lead">
        We’ve shared your preferences with Maya. You can update them
        anytime before the session.
      </p>

      <section className="ticket">

        <div className="ticket-top">
          <p>
            <small>FRIDAY · AUGUST 14</small>

            <b>Deep Rest Sound Bath</b>

            <span>6:00–7:15 PM · Field House</span>
          </p>

          <WaveMark />
        </div>

        <div className="ticket-grid">

          <p>
            <small>Your experience</small>
            <b>{frequency} frequency</b>
          </p>

          <p>
            <small>Comfort request</small>
            <b>{support}</b>
          </p>

          <p>
            <small>Recommended arrival</small>
            <b>5:45 PM</b>
          </p>

          <p>
            <small>Booking</small>
            <b>{bookingRef}</b>
          </p>

        </div>

        <div className="ticket-note">
          Wear something comfortable. Mats are provided, and your
          comfort item will be ready when you arrive.
        </div>

      </section>

      <div className="confirmation-actions">

        <button
          className="primary"
          onClick={onDashboard}
        >
          Back to my sessions
        </button>

        <button
          className="secondary"
          onClick={addToGoogleCalendar}
        >
          Add to calendar
        </button>

      </div>

      {showCalendarNotice && (
        <div className="calendar-toast">
          <span className="calendar-toast-icon">✓</span>

          <div>
            <strong>Google Calendar opened</strong>
            <small>
              Review the event and click Save to add it to your calendar.
            </small>
          </div>
        </div>
      )}

    </div>
  );
}
