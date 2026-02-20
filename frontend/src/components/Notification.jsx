import { useEffect } from "react";

export default function Notification({ notif, onClose }) {
  useEffect(() => {
    if (!notif) return;
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [notif, onClose]);

  if (!notif) return null;
  return (
    <div className={`notif ${notif.type === "error" ? "error" : ""}`}>
      <div className="notif-title">{notif.type === "error" ? "⚠ Error" : "✓ Success"}</div>
      <div className="notif-msg">{notif.msg}</div>
    </div>
  );
}
