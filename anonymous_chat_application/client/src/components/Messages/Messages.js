import React, { useMemo } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";
import "./Messages.css";

/**
 * Props:
 * - messages: Array<{ message_id?, ... }>
 * - current_user_name: string
 * - editMessage: fn
 */
const Messages = React.memo(function Messages({
  messages = [],
  current_user_name,
  editMessage,
}) {
  const items = useMemo(() => {
    if (!Array.isArray(messages)) return [];

    return messages.map((m, idx) => {
      // Prefer deterministic key from backend. Fallback to a composite.
      const key =
        (m && (m.message_id ?? m.id ?? m._id)) ??
        `${idx}-${(m?.message_sender ?? "anon")}-${(m?.message_text ?? "").slice(0, 16)}`;

      return (
        <div key={key}>
          <Message
            message={m}
            current_user_name={current_user_name}
            editMessage={editMessage}
          />
        </div>
      );
    });
  }, [messages, current_user_name, editMessage]);

  return (
    <ScrollToBottom className="messages">
      {items.length > 0 ? (
        items
      ) : (
        <div className="emptyState" aria-live="polite">
          No messages yet — say hi!
        </div>
      )}
    </ScrollToBottom>
  );
});

export default Messages;
