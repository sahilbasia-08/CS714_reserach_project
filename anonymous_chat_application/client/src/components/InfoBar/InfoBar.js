import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

import "./InfoBar.css";

/**
 * Props:
 * - user_room: string (display name / id of the room)
 * - onLeave?: function (optional). If not provided, falls back to redirect "/"
 */
const InfoBar = ({ user_room, onLeave }) => {
  const handleLeave = () => {
    if (typeof onLeave === "function") {
      onLeave();
      return;
    }
    // fallback: soft redirect (no target=_self anchor to avoid full reload artifacts)
    window.location.href = "/";
  };

  const handleCopy = async () => {
    try {
      if (!user_room) return;
      await navigator.clipboard.writeText(String(user_room));
      // quick, non-intrusive feedback
      // eslint-disable-next-line no-alert
      console.log("Room copied");
    } catch (e) {
      console.warn("Copy failed", e);
    }
  };

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        {/* tiny status dot; using your asset keeps bundle consistent */}
        <img className="onlineIcon" src={onlineIcon} alt="online" />
        <h3 title={user_room || ""}>
          {user_room || "Room"}
        </h3>
      </div>

      <div className="rightInnerContainer">
        {/* copy room id/name (handy for sharing) */}
        <button
          type="button"
          className="iconBtn"
          aria-label="Copy room"
          title="Copy room"
          onClick={handleCopy}
        >
          {/* reuse the online icon as a simple glyph; replace with a dedicated copy icon if you add one */}
          <img src={onlineIcon} alt="" aria-hidden="true" />
        </button>

        {/* leave/close */}
        <button
          type="button"
          className="iconBtn"
          aria-label="Leave"
          title="Leave"
          onClick={handleLeave}
        >
          <img src={closeIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default InfoBar;
