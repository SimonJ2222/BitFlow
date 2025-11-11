import { type Output } from "../../types/Output";
import { gridSize } from "../constants";

function OutputComp({output, gate, onMouseDown}: {output: Output, gate: any, onMouseDown: React.MouseEventHandler<SVGCircleElement>}) {

  let output_svg_props = {
    strokeWidth: 4,
    stroke: "black",
    // fill: "white",
    fill: "#e6988cff",
  }

  let svg_pos = {
    cx: (gate.x + output.x + 0.5) * gridSize,
    cy: (gate.y + output.y + 0.5) * gridSize,
    r: gridSize / 3,
  }

  return (
    <circle {...output_svg_props} {...svg_pos} onMouseDown={onMouseDown}/>
  );
}

export default OutputComp;