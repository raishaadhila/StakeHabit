"use client";

import { useState } from "react";

interface Props {
  goalTitle: string;
  streak: number;
  completedDays: number;
  totalDays: number;
  missedDays: number;
}

export function AiCoach({ goalTitle, streak, completedDays, totalDays, missedDays }: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchCoachMessage() {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goalTitle, streak, completedDays, totalDays, missedDays }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        // Parse plain text stream
        const lines = chunk.split("\n");
        for (const line of lines) {
          result += line;
          setMessage(result);
        }
      }
    } catch (err) {
      setMessage("Could not reach AI coach right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 bg-gray-800 rounded-xl p-5 border border-purple-800">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-purple-400 text-lg">🤖</span>
        <span className="font-semibold text-purple-300">AI Coach</span>
      </div>

      {message ? (
        <p className="text-gray-200 text-sm leading-relaxed">{message}</p>
      ) : (
        <p className="text-gray-500 text-sm">Get personalized advice based on your progress.</p>
      )}

      <button
        onClick={fetchCoachMessage}
        disabled={loading}
        className="mt-4 text-sm bg-purple-700 hover:bg-purple-600 disabled:opacity-50 px-4 py-2 rounded-lg"
      >
        {loading ? "Thinking..." : message ? "Ask again" : "Get coaching"}
      </button>
    </div>
  );
}
