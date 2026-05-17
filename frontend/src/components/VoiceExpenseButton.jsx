import { useRef, useState } from "react";
import { SparklesIcon, StopIcon } from "@heroicons/react/24/outline";
import { parseVoiceExpense } from "../services/api";

function VoiceExpenseButton({ setExpenseData, setIsModalOpen, setToast }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = async () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setToast({
        type: "error",
        message: "Voice recognition is not supported in this browser. Use Chrome.",
      });
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setToast({
        type: "error",
        message: "Microphone permission is blocked. Allow microphone access in Chrome.",
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-AU";
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);
    setToast({
      type: "success",
      message: "Listening... say your expense now",
    });

    recognition.start();

    recognition.onresult = async (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript;

      if (!transcript) {
        setToast({
          type: "error",
          message: "No speech detected. Please try again.",
        });
        setIsListening(false);
        return;
      }

      try {
        setToast({
          type: "success",
          message: `Heard: ${transcript}`,
        });

        const parsed = await parseVoiceExpense(transcript);

        setExpenseData(parsed);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Gemini parse error:", error);

        setToast({
          type: "error",
          message: "Speech was heard, but Gemini could not parse the expense.",
        });
      } finally {
        setIsListening(false);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      let message = "Voice recognition failed.";

      if (event.error === "not-allowed") {
        message = "Microphone permission denied. Allow microphone access.";
      }

      if (event.error === "no-speech") {
        message = "No speech detected. Try again and speak clearly.";
      }

      if (event.error === "audio-capture") {
        message = "No microphone found or microphone is unavailable.";
      }

      if (event.error === "network") {
        message = "Voice recognition network error. Try Chrome and check internet.";
      }

      setToast({
        type: "error",
        message,
      });

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

    return (
    <button
        onClick={isListening ? stopListening : startListening}
        className={` animation-floating fixed bottom-8 right-8 z-[80] group inline-flex items-center gap-3 rounded-full px-4 py-4 text-sm font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 ${
        isListening
            ? "bg-red-600 shadow-red-500/40 hover:shadow-red-500/70"
            : "bg-gradient-to-r from-purple-600 to-brand-600 shadow-purple-500/40 hover:shadow-purple-500/80"
        }`}
    >
        <span
        className={`absolute inset-0 -z-10 rounded-full blur-xl transition-all duration-300 ${
            isListening
            ? "bg-red-500 opacity-50 group-hover:opacity-80"
            : "bg-purple-500 opacity-50 group-hover:opacity-90"
        }`}
        />

        {isListening ? (
        <StopIcon className="h-7 w-7" />
        ) : (
        <SparklesIcon className="h-7 w-7" />
        )}
    </button>
    );
}

export default VoiceExpenseButton;