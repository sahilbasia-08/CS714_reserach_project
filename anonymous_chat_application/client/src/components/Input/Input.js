import React, { useCallback } from "react";
import "./Input.css";

/**
 * Props:
 * - message: string
 * - setMessage: fn
 * - sendMessage: fn  (kept compatible with your existing signature)
 * - room, roomPubKey (optional; reserved for sealed-sender upgrade later)
 */
const Input = ({ message, setMessage, sendMessage }) => {
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // keep legacy behavior: delegate to parent with the event
      if (message && message.trim().length > 0) {
        sendMessage(e);
      }
    },
    [message, sendMessage]
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onSubmit(e);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        className="input"
        type="text"
        inputMode="text"
        placeholder="Type a message…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyDown}
        autoComplete="off"
        aria-label="Message"
        maxLength={4000}
      />
      <button
        type="submit"
        className="sendButton"
        disabled={!message || message.trim().length === 0}
      >
        Send
      </button>
    </form>
  );
};

export default Input;
