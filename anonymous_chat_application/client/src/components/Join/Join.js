import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

function Join() {
  const [user_name, set_user_name] = useState("");
  const [user_room, set_user_room] = useState("");
  const [touched, setTouched] = useState({ name: false, room: false });

  // random alias to discourage real names (anonymity UX)
  const randomAlias = useMemo(() => () => {
    const animals = ["Falcon","Kestrel","Panther","Lynx","Wolf","Orca","Viper","Raven","Jaguar","Otter","Fox","Puma","Eagle","Mamba","Ibis","Iguana","Heron","Drake","Bison","Ibex"];
    const adj = ["Silent","Hidden","Shadow","Ghost","Misty","Azure","Crimson","Obsidian","Golden","Silver","Ivory","Emerald","Cobalt","Amber","Violet","Indigo"];
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    return `${pick(adj)}${pick(animals)}${Math.floor(100 + Math.random() * 900)}`;
  }, []);

  // validation
  const cleanName = (s) => s.replace(/\s+/g, " ").trimStart();
  const cleanRoom = (s) => s.toLowerCase().replace(/[^a-z0-9\-]/g, "-").replace(/\-+/g, "-").replace(/^\-+|\-+$/g, "");

  const nameValid = user_name.trim().length >= 2;
  const roomValid = user_room.trim().length >= 2;

  const canJoin = nameValid && roomValid;

  // href for your existing Chat route (query-string parsing stays the same)
  const joinHref = `/chat?user_name=${encodeURIComponent(user_name.trim())}&user_room=${encodeURIComponent(user_room.trim())}`;

  // keyboard: prevent submit when disabled
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !canJoin) e.preventDefault();
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer" role="dialog" aria-labelledby="join-title" aria-describedby="join-desc">
        <h1 id="join-title" className="heading">Join</h1>
        <p id="join-desc" className="subtle">Choose an alias and a room to start messaging.</p>

        <label className="fieldLabel" htmlFor="alias-input">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="#9aa3ab" d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>
          Alias
        </label>
        <div className="inlineRow">
          <input
            id="alias-input"
            placeholder="Alias (recommended: do not use real name)"
            className="joinInput"
            type="text"
            value={user_name}
            onChange={(e) => set_user_name(cleanName(e.target.value))}
            onBlur={() => setTouched(t => ({...t, name: true}))}
            onKeyDown={onKeyDown}
            maxLength={48}
            autoComplete="off"
            aria-invalid={!nameValid && touched.name}
            aria-describedby={!nameValid && touched.name ? "alias-err" : undefined}
          />
          <button
            type="button"
            className="secondaryBtn"
            onClick={() => set_user_name(randomAlias())}
            title="Generate random alias"
          >
            Random Alias
          </button>
        </div>
        {!nameValid && touched.name && (
          <div id="alias-err" className="helper error">Alias must be at least 2 characters.</div>
        )}

        <label className="fieldLabel mt-14" htmlFor="room-input">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="#9aa3ab" d="M12 3l9 6v12H3V9l9-6zm0 2.2L5 10v9h14v-9l-7-4.8z"/></svg>
          Room
        </label>
        <input
          id="room-input"
          placeholder="Room (e.g., project-x)"
          className="joinInput"
          type="text"
          value={user_room}
          onChange={(e) => set_user_room(cleanRoom(e.target.value))}
          onBlur={() => setTouched(t => ({...t, room: true}))}
          onKeyDown={onKeyDown}
          maxLength={64}
          autoComplete="off"
          aria-invalid={!roomValid && touched.room}
          aria-describedby={!roomValid && touched.room ? "room-err" : undefined}
        />
        {!roomValid && touched.room && (
          <div id="room-err" className="helper error">Room must be at least 2 characters (letters, numbers, “-”).</div>
        )}
        <div className="helper mt-6">Tip: share only the room name; no personal details needed.</div>

        <Link
          to={joinHref}
          onClick={(event) => { if (!canJoin) event.preventDefault(); }}
          className="mt-18"
        >
          <button className="button" type="submit" disabled={!canJoin}>
            Enter Room
          </button>
        </Link>

        <div className="footer">End-to-end privacy ready · Minimal metadata</div>
      </div>
    </div>
  );
}

export default Join;
