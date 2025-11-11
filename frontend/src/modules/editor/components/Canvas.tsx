import { useState } from "react";
import WireComp from "./canvasElements/WireComp";
import GateComp from "./canvasElements/GateComp";
import { newWire, type Wire } from "../types/Wire";
import { newGate, type Gate } from "../types/Gate";
import { canvasLeft, canvasTop, canvasWidth, canvasHeight, gridSize } from "./constants";

function Canvas() {

  var useDotPattern: boolean = false;

  const [wires, setWires] = useState<Wire[]>([
    newWire([
      [2,3],
      [2,5],
    ], false),
    newWire([
      [3,3],
      [3,5],
      [5,5],
    ], false),
    newWire([
      [7,3],
      [10,3],
    ], false),
  ]);
  const [gates, setGates] = useState<Gate[]>([
    // 3 * 3 
    newGate(2,2,3,3),
    // 4 * 4
    newGate(6,2,4,4),
    // 5 * 2
    newGate(10,2,5,2),
  ]);

  const [draggingId, setDraggingId] = useState<number | null>(null);
  const[offset, setOffset] = useState({x: 0, y: 0})

  const getGridCoords = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / gridSize);
    const y = Math.floor((e.clientY - rect.top) / gridSize);
    return { x, y };
  }

  const handleMouseDownGate = (e: React.MouseEvent<SVGRectElement, MouseEvent>, id: number) => {
    if (e.button !== 0) return;

    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggingId(id);

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top; 
    setOffset({x: mouseX / gridSize, y: mouseY / gridSize});
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e.button !== 0) return;
    if(draggingId === null) return;

    const { x, y } = getGridCoords(e);
    const newGates = gates.map((g, i) => (i === draggingId) ? {...g, x: Math.round(x - offset.x), y: Math.round(y - offset.y)} : g);
    setGates(newGates);
  }

  const handleMouseUp = () => {
    if (draggingId === null) {
      return;
    }
    setDraggingId(null);
  }

  const deleteWire = (id: number) => {
    let newWires = wires.filter((_: Wire, index: number) => (index !== id));
    setWires(newWires);
  }


  return(
    <svg id="svg_canvas" className="absolute" style={{left: canvasLeft, top: canvasTop}} width={canvasWidth} height={canvasHeight} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <defs>
        <pattern id="canvas_pattern" x="0" y="0" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
          { useDotPattern
            ? <>
              <circle id="gridcircletl" r="1" cx="0" cy="0" fill="grey" stroke="grey" strokeWidth="0.5"/>
              <circle id="gridcirclebl" r="1" cx="0" cy={gridSize} fill="grey" stroke="grey" strokeWidth="0.5"/>
              <circle id="gridcircletr" r="1" cx={gridSize} cy="0" fill="grey" stroke="grey" strokeWidth="0.5"/>
              <circle id="gridcirclebr" r="1" cx={gridSize} cy={gridSize} fill="grey" stroke="grey" strokeWidth="0.5"/>
            </>
            : <rect width="100%" height="100%" fill="none" stroke="grey" strokeWidth="0.5"/>
          }
        </pattern>
      </defs>
      <rect width="100%" height="100%" x="0" y="0" stroke="black" strokeWidth="2" fill="url(#canvas_pattern)"/>
      <g id="wire_group">
        {
          wires.map((wire, i) => <WireComp wire={wire} key={i} remove={() => deleteWire(i)}/>)
        }
      </g>
      <g id="gate_group">
        {
          gates.map((gate, i) => <GateComp gate={gate} key={i} onMouseDown={(e: any) => handleMouseDownGate(e, i)} />)
        }
      </g>
      <g id="input_group">

      </g>
      <g id="output_group">

      </g>
    </svg>
  );
}

export default Canvas