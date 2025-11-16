import { type Wire } from "../../types/Wire";
import { gridSize } from "../constants";

function WireComp({wire, remove}: {wire: Wire, remove: Function}) {

  let wire_svg_props = {
    strokeWidth: 4,
    stroke: (wire.isPreview ? "gray" : "black"),
    fill: "none",
  }

  let svg_points = wire.points.map((point: number[]) => (
    point.map((coord: number) => (
      coord * gridSize
    ))
  ))

  const handleMouseDownWire = (e: React.MouseEvent<SVGPolylineElement, MouseEvent>) => {
    if (e.button !== 0) return;
    remove();
    e.stopPropagation();
  }

  return (
    <>
      <polyline {...wire_svg_props} points={svg_points.toString()} onMouseDown={handleMouseDownWire} />
      {
        wire.points.map((point: [number, number]) => (
          <circle //TODO: Handle Mouse Down ?Node?
            r="4" 
            cx={point[0] * gridSize} 
            cy={point[1] * gridSize} 
            fill={(wire.isPreview ? "gray" : "black")}
          />
        ))
      }
    </>
  );
}

export default WireComp;