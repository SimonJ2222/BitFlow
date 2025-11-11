import { type Input } from "../../types/Input";
import { gridSize } from "../constants";

function InputComp({input, gate, onMouseDown}: {input: Input, gate: any, onMouseDown: React.MouseEventHandler<SVGCircleElement>}) {

  let input_svg_props = {
    strokeWidth: 4,
    stroke: "black",
    // fill: "white",
    fill: "#8ce692",
  }

  let svg_pos = {
    cx: (gate.x + input.x + 0.5) * gridSize,
    cy: (gate.y + input.y + 0.5) * gridSize,
    r: gridSize / 3,
  }

  return (
    <circle {...input_svg_props} {...svg_pos} onMouseDown={onMouseDown} />
  );
}

export default InputComp;