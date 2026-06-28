"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mic, MicOff } from "lucide-react";

// Type minimal de l'API Web Speech (non typée par défaut dans lib.dom).
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

interface Props {
  name: string;
  role: string;
  avatar: string;
  accent: string;
  lastActivity: string;
  stat: string;
  statLabel: string;
  href: string;
}

export function AgentCard({
  name,
  role,
  avatar,
  accent,
  lastActivity,
  stat,
  statLabel,
  href,
}: Props) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recRef = useRef<SpeechRecognitionLike | null>(null);

  function toggleMic() {
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) {
      setTranscript("Reconnaissance vocale non supportée par ce navigateur.");
      return;
    }

    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }

    const rec = new Ctor();
    rec.lang = "fr-FR";
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) => {
      const text = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      setTranscript(text);
    };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  }

  return (
    <div
      className="rounded-2xl bg-white p-5"
      style={{ boxShadow: "0 4px 16px rgba(11,31,74,0.06)" }}
    >
      <div className="flex items-start gap-3">
        <Image
          src={avatar}
          alt={`Avatar ${name}`}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="min-w-0 flex-1">
          <p
            className="font-display text-lg font-bold leading-tight"
            style={{ color: "#0B1F4A" }}
          >
            {name}
          </p>
          <p className="font-body text-xs" style={{ color: "#9AA5B4" }}>
            {role}
          </p>
        </div>
      </div>

      {/* Bulle de speech : dernière activité */}
      <div
        className="mt-4 rounded-xl rounded-tl-sm px-3 py-2"
        style={{ background: "#ECEEF8" }}
      >
        <p className="font-body text-xs" style={{ color: "#4A5568" }}>
          {transcript || lastActivity}
        </p>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p
            className="font-display text-2xl font-bold"
            style={{ color: accent }}
          >
            {stat}
          </p>
          <p className="font-body text-[11px]" style={{ color: "#9AA5B4" }}>
            {statLabel}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMic}
            aria-label={`Parler à ${name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            style={{
              background: listening ? accent : "#ECEEF8",
              color: listening ? "#fff" : accent,
            }}
          >
            {listening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          <Link
            href={href}
            className="rounded-full px-3 py-2 font-body text-xs font-semibold text-white"
            style={{ background: accent }}
          >
            Ouvrir
          </Link>
        </div>
      </div>
    </div>
  );
}
