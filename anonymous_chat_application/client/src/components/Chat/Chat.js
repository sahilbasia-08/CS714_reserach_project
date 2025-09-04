import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

function Chat() {
  const location = useLocation();
  const socketRef = useRef(null);

  const [user_name, set_user_name] = useState("");
  const [user_room, set_user_room] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = process.env.REACT_APP_ENDPOINT || "http://localhost:5001";
  const [roomPubKey, setRoomPubKey] = useState(null);

  useEffect(() => {
    const { user_name: qName, user_room: qRoom } = queryString.parse(location.search);
    if (!qName || !qRoom) return;

    set_user_name(String(qName));
    set_user_room(String(qRoom));

    if (socketRef.current) {
      try { socketRef.current.disconnect(); } catch {}
    }
    const socket = io(ENDPOINT, { transports: ["websocket", "polling"], withCredentials: true });
    socketRef.current = socket;
    socket.emit("join", { user_name: String(qName), user_room: String(qRoom) });

    return () => {
      if (socketRef.current) {
        socketRef.current.off();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    const s = socketRef.current;
    if (!s) return;
    const onMsg = (msg) => setMessages((prev) => [...prev, msg]);
    s.on("message", onMsg);
    return () => s.off("message", onMsg);
  }, []);

  useEffect(() => {
    const s = socketRef.current;
    if (!s) return;
    const onEdited = ({ originalMessage, editedMessageText }) => {
      setMessages((prev) =>
        prev.map((m) => (m.message_id === originalMessage.message_id ? { ...m, message_text: editedMessageText } : m))
      );
    };
    s.on("editedMessage", onEdited);
    return () => s.off("editedMessage", onEdited);
  }, []);

  useEffect(() => {
    if (!user_room) return;
    fetch(`${ENDPOINT}/roomPubKey?room=${encodeURIComponent(user_room)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(({ pubkey_b64 }) => setRoomPubKey(pubkey_b64 || null))
      .catch(() => setRoomPubKey(null));
  }, [user_room, ENDPOINT]);

  function editMessage(originalMessage, editedMessageText) {
    const s = socketRef.current;
    if (!s) return;
    s.emit("editMessage", { user_room, originalMessage, editedMessageText });
  }

  const sendMessage = (event) => {
    if (event?.preventDefault) event.preventDefault();
    const s = socketRef.current;
    if (!s) return;
    if (message && message.trim()) {
      s.emit("sendMessage", { user_name, user_room, message_text: message.trim() });
      setMessage("");
    }
  };

  return (
    <div className="outerContainer">
      <main className="container chatCard" role="main" aria-label="Chat window">
        <InfoBar user_room={user_room} />
        <Messages messages={messages} current_user_name={user_name} editMessage={editMessage} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} room={user_room} roomPubKey={roomPubKey} />
      </main>
    </div>
  );
}

export default Chat;
