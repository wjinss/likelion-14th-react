import "./change-button.css";

export default function ChangeButton({ getRandomIndex, label }) {
  return (
    <button type="button" className="change-button" onClick={getRandomIndex}>
      {label}
    </button>
  );
}
