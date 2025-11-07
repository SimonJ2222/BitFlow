import { type Wire } from "../../types/Wire";

function WireComp({wire, gridSize}: {wire: Wire, gridSize: number}) {

  let wire_svg_props = {
    strokeWidth: 4,
    stroke: ( wire.isPreview ? "gray" : "black"),
    fill: "none",
  }

  let svg_points = wire.points.map((point: number[]) => (
    point.map((coord: number) => (
      coord * gridSize + 0.5 * gridSize
    ))
  ))

  return (
    <polyline {...wire_svg_props} points={svg_points.toString()} />
  );
}

export default WireComp;