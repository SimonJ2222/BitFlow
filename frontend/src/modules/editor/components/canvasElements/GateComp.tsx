import { type Gate } from "../../types/Gate";
import { type Input, type Rotation } from "../../types/Input";
import { gridSize } from "../constants";

function GateComp({gate, onMouseDownGate, onMouseDownInput}: {gate: Gate, onMouseDownGate?: React.MouseEventHandler<SVGRectElement>, onMouseDownInput?: React.MouseEventHandler<SVGPolylineElement>}) {

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
  // >> temp

  let rotation: Rotation = "East";
  // << temp
  const rot_distrib_offset: Record<Rotation, { x: number; y: number }> = {
    North: { x: 1, y: 0 },
    East:  { x: 0, y: 1 },
    South: { x: 1, y: 0 },
    West:  { x: 0, y: 1 }
  };

  const rot_start_offset: Record<Rotation, { x: number; y: number }> = {
    North: { x: 0, y: 1 },
    East:  { x: 0, y: 0 },
    South: { x: 0, y: 0 },
    West:  { x: 1, y: 0 }
  };

  const rot_end_offset: Record<Rotation, { x: number; y: number }> = {
    North: { x: 0, y: 1 },
    East:  { x: -1, y: 0 },
    South: { x: 0, y: -1 },
    West:  { x: 1, y: 0 }
  };

  let input_svg_props = {
    strokeWidth: 4,
    stroke: "violet",
    fill: "none",
  }

  let input_pos = gate.inputs.map((_input: Input, i: number) => {
    const distrib_offset = rot_distrib_offset[rotation]
    const start_offset = rot_start_offset[rotation]
    const end_offset = rot_end_offset[rotation]

    // Gleichmäßig verteilen
    /* alt (auch zwischen Kästchen möglich)
    let distrib_offset_x = distrib_offset.x * (gate.width / inputs.length) * 0.5 
    let distrib_offset_y = distrib_offset.y * (gate.height / inputs.length) * 0.5
    */

    return {
      x: (gate.x + distrib_offset.x + (i * distrib_offset.x) + (start_offset.x * gate.width)),
      y: (gate.y + distrib_offset.y + (i * distrib_offset.y) + (start_offset.y * gate.height)),
      x_offset: end_offset.x * (gridSize * 0.5),
      y_offset: end_offset.y * (gridSize * 0.5)
    }
  })

  // Input Positionen des Gates anpassen
  gate.inputs = gate.inputs.map((input: Input, i: number) => {
    return {
      gateId: input.gateId,
      wiresId: input.wiresId,
      x: input_pos[i].x,
      y: input_pos[i].y
    }
  })
  
  return (
    <g>
      <rect {...gate_svg_props} {...svg_pos} onMouseDown={onMouseDownGate} cursor="grab" />
      <text 
        x={svg_pos.x + (gate.width * gridSize) / 2}
        y={svg_pos.y + (gate.height * gridSize) / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {gate.label}
      </text>
      {input_pos.map((input, index: number) => (
        <polyline
          key={index}
          {...input_svg_props}
          points={`${input.x * gridSize},${input.y * gridSize} ${(input.x * gridSize) + input.x_offset},${(input.y * gridSize) + input.y_offset}`}
          cursor="pointer"
          input-id={index}
          pos-x={input.x}
          pos-y={input.y}
          onMouseDown={onMouseDownInput}
        />
      ))}
    </g>
  );
}

export default GateComp;