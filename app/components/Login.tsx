"use client";

import { useState } from "react";
import type { User } from "../types/auth";

interface Props {
    onLogin: (user: User) => void;
}

export function Login({ onLogin }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [error, setError] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        const user: User = {
            name: name.trim(),
            email: email.trim(),
        };

        localStorage.setItem("session_user", JSON.stringify(user));

        onLogin(user);
    }

    return (
        <main className="login-page">
            <div className="login-card">

                <div className="login-brand">
                    <div className="wave-mark">
                        <i />
                        <i />
                        <i />
                    </div>

                    <span>Lumi</span>
                </div>

                <p className="eyebrow">
                    {mode === "login" ? "Welcome back" : "Create your profile"}
                </p>

                <h1>
                    {mode === "login"
                        ? "Welcome back."
                        : "Reserve your space."}
                </h1>

                <p className="login-description">
                    {mode === "login"
                        ? "Sign in to continue to your session."
                        : "Create your profile so we can personalize your experience."}
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="login-field">
                        <label htmlFor="name">
                            Full name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Pujita Chakraborty"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="email">
                            Email address
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="primary login-button"
                    >
                        {mode === "login"
                            ? "Continue"
                            : "Create profile"}
                    </button>

                </form>

                <button
                    type="button"
                    className="text-button login-switch"
                    onClick={() => {
                        setMode(mode === "login" ? "signup" : "login");
                        setError("");
                    }}
                >
                    {mode === "login"
                        ? "New here? Create an account"
                        : "Already have an account? Sign in"}
                </button>

            </div>
        </main>
    );
}