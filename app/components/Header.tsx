"use client";

import { useEffect, useState } from "react";
import { WaveMark } from "./WaveMark";
import type { ProductView } from "../types";
import type { User } from "../types/auth";

interface HeaderProps {
  view: ProductView;
  onViewChange: (view: ProductView) => void;
  onHome: () => void;
  onProfile: () => void;
  user?: User;
}

function getInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/**
 * Global product navigation shared by attendee and facilitator experiences.
 * The registered attendee is read from localStorage and updated immediately
 * after a successful registration.
 */
export function Header({
  view,
  onViewChange,
  onHome,
  onProfile,
  user,
}: HeaderProps) {
  const [registeredUser, setRegisteredUser] = useState<User | undefined>(
    user
  );

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("session_user");

      if (!storedUser) {
        setRegisteredUser(user);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser) as User;

        if (parsedUser.name) {
          setRegisteredUser(parsedUser);
        }
      } catch {
        localStorage.removeItem("session_user");
        setRegisteredUser(user);
      }
    };

    // Load the user when Header first mounts.
    loadUser();

    // Listen for the successful registration event.
    window.addEventListener("user-updated", loadUser);

    return () => {
      window.removeEventListener("user-updated", loadUser);
    };
  }, [user]);

  const initials = getInitials(
    registeredUser?.name ?? ""
  );

  return (
    <header className="nav-shell">

      <a
        className="brand"
        href="#"
        onClick={(event) => {
          event.preventDefault();
          onHome();
        }}
      >
        <WaveMark />
        <span>stillform</span>
      </a>

      <div className="view-switch">

        <button
          className={view === "attendee" ? "active" : ""}
          onClick={() => onViewChange("attendee")}
        >
          Attendee
        </button>

        <button
          className={view === "facilitator" ? "active" : ""}
          onClick={() => onViewChange("facilitator")}
        >
          Facilitator
        </button>

      </div>

      <button
        className="avatar"
        onClick={onProfile}
        title={registeredUser?.name ?? "Profile"}
        aria-label={`Open profile for ${registeredUser?.name ?? "user"
          }`}
      >
        {initials}
      </button>

    </header>
  );
}