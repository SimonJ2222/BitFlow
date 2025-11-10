import { type Gate } from "../../types/Gate";

function GateComp({gate, gridSize, onMouseDown}: {gate: Gate, gridSize: number, onMouseDown?: React.MouseEventHandler<SVGRectElement>}) {

  let gate_svg_props = {
    strokeWidth: 4,
    stroke: "black",
    fill: "white",
  }

  let svg_pos = {
    x: gate.x * gridSize + 0.5 * gate_svg_props.strokeWidth,
    y: gate.y * gridSize + 0.5 * gate_svg_props.strokeWidth,
    width: gate.width * gridSize - gate_svg_props.strokeWidth,
    height: gate.height * gridSize - gate_svg_props.strokeWidth,
  }

  return (
    <rect {...gate_svg_props} {...svg_pos} onMouseDown={onMouseDown} cursor="grab">

    </rect>
  );
}

export default GateComp;