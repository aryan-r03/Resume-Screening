import { barColor } from "../utils/scoring";

export default function ScoreBar({ label, value, max = 100 }) {
  return (
    <div className="criteria-item">
      <div className="criteria-label">
        <span>{label}</span>
        <span className="text-accent">{value}/{max}</span>
      </div>
      <div className="score-bar">
        <div
          className="score-bar-fill"
          style={{ width: `${(value / max) * 100}%`, background: barColor((value / max) * 100) }}
        />
      </div>
    </div>
  );
}
