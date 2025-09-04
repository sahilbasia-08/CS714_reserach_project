import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Message.css";

/**
 * Props:
 * - message: { message_id, message_text, message_sender }
 * - current_user_name: string
 * - editMessage: fn(originalMessage, editedMessageText)
 */
const Message = ({ message, current_user_name, editMessage }) => {
  const { message_id, message_text, message_sender } = message;
  const isOwn = message_sender === current_user_name;

  const [isEditing, setIsEditing] = useState(false);
  const [editedMessageText, setEditedMessageText] = useState(message_text);

  const textAreaRef = useRef(null);

  // keep edited text in sync if a different message instance arrives
  useEffect(() => {
    setEditedMessageText(message_text);
  }, [message_text]);

  // auto-resize textarea
  useEffect(() => {
    if (!isEditing || !textAreaRef.current) return;
    const el = textAreaRef.current;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 300) + "px";
  }, [isEditing, editedMessageText]);

  const startEdit = () => setIsEditing(true);

  const saveEdit = useCallback(() => {
    const next = editedMessageText ?? "";
    if (next.trim() === message_text.trim()) {
      setIsEditing(false);
      return;
    }
    editMessage(message, next);
    setIsEditing(false);
  }, [editedMessageText, message, message_text, editMessage]);

  const cancelEdit = () => {
    setEditedMessageText(message_text);
    setIsEditing(false);
  };

  const onKeyDown = (e) => {
    if ((e.key === "Enter" && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  };

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(String(message_id));
      // non-intrusive feedback
      console.log("Message ID copied");
    } catch (e) {
      console.warn("Copy failed", e);
    }
  };

  const hasChanged =
    (editedMessageText ?? "").trim() !== (message_text ?? "").trim();

  // content block (edit vs read)
  const content = isEditing ? (
    <textarea
      ref={textAreaRef}
      className="editArea"
      value={editedMessageText}
      onChange={(e) => setEditedMessageText(e.target.value)}
      onKeyDown={onKeyDown}
      aria-label="Edit message"
      autoFocus
    />
  ) : (
    <p className={`messageText ${isOwn ? "colorWhite" : "colorDark"}`}>
      {message_text}
    </p>
  );

  // meta row (id + actions)
  const meta = (
    <div className="metaRow">
      <span className="metaId" title={`id: ${message_id}`}>id: {message_id}</span>
      <div className="buttonRow">
        <button type="button" className="smallBtn" onClick={copyId} aria-label="Copy message id">
          Copy ID
        </button>
        {isOwn && !isEditing && (
          <button type="button" className="smallBtn" onClick={startEdit}>
            Edit
          </button>
        )}
        {isOwn && isEditing && (
          <>
            <button
              type="button"
              className="smallBtn"
              onClick={saveEdit}
              disabled={!hasChanged}
              title={hasChanged ? "Save (Ctrl/Cmd+Enter)" : "No changes"}
            >
              Save
            </button>
            <button type="button" className="smallBtn" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );

  // bubble wrapper with side alignment
  const bubble = (
    <div className={`messageBox ${isOwn ? "backgroundBlue" : "backgroundLight"}`}>
      {content}
      {meta}
    </div>
  );

  return isOwn ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{current_user_name}</p>
      {bubble}
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      {bubble}
      <p className="sentText pl-10">{message_sender}</p>
    </div>
  );
};

export default Message;
