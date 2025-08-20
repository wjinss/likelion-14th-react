import "./print-count.css";

export default function PrintCount({ count = 0 }) {
  console.log("프린트 카운트 렌더링");

  return (
    <output className="print-count" style={{ padding: 12 }}>
      {count}
    </output>
  );
}
