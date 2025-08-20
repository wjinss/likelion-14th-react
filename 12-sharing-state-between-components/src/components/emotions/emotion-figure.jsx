import EmotionFace from "./emotion-face";
import StatusMessage from "./status-message";
import "./emotion-figure.css";

export default function EmotionFigure({ label, image }) {
  return (
    <figure className="emotion-figure">
      <EmotionFace image={image} />
      <StatusMessage label={label} />
    </figure>
  );
}
