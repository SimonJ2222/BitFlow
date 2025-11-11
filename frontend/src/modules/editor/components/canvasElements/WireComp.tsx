import { type Wire } from "../../types/Wire";
import { gridSize } from "../constants";

function WireComp({wire}: {wire: Wire}) {

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