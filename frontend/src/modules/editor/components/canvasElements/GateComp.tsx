import { type Gate } from "../../types/Gate";
import { gridSize } from "../constants";
import InputComp from "./InputComp";
import OutputComp from "./OutputComp";

function GateComp({gate, onMouseDown, inOutMouseDown}: {gate: Gate, onMouseDown?: React.MouseEventHandler<SVGRectElement>, inOutMouseDown: React.MouseEventHandler<SVGCircleElement>}) {

  let gate_svg_props = {
    strokeWidth: 4,
    stroke: "black",
    fill: "white",
  }

  let svg_pos = {
    x: (gate.x + 0.5 ) * gridSize + 0.5 * gate_svg_props.strokeWidth,
    y: (gate.y + 0.5 ) * gridSize + 0.5 * gate_svg_props.strokeWidth,
    width: (gate.width - 1) * gridSize - gate_svg_props.strokeWidth,
    height: (gate.height - 1) * gridSize - gate_svg_props.strokeWidth,
  }

  return (
    <g>
      <rect {...gate_svg_props} {...svg_pos} onMouseDown={onMouseDown} cursor="grab">

      </rect>
      {
        gate.inputs.map((input, i) => <InputComp input={input} gate={gate}key={i} onMouseDown={inOutMouseDown} />)
      }
      {
        gate.outputs.map((output, i) => <OutputComp output={output} gate={gate} key={i} onMouseDown={inOutMouseDown} />)
      }
    </g>
  );
}

export default GateComp;