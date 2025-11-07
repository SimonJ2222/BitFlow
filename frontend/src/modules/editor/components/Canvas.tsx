import { useState } from "react";
import WireComp from "./canvasElements/WireComp";
import GateComp from "./canvasElements/GateComp";
import { newWire, type Wire } from "../types/Wire";
import { newGate, type Gate } from "../types/Gate";
import { canvasLeft, canvasTop, canvasWidth, canvasHeight } from "./constants";

function Canvas() {

  var gridSize: number = 20;
  var useDotPattern: boolean = false;

  const [wires, setWires] = useState<Wire[]>([]);
  const [gates, setGates] = useState<Gate[]>([]);

  return(
    <svg id="svg_canvas" className="absolute" style={{left: canvasLeft, top: canvasTop}} width={canvasWidth} height={canvasHeight}>
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
          wires.map((wire, i) => <WireComp wire={wire} gridSize={gridSize} key={i}/>)
        }
      </g>
      <g id="gate_group">
        {
          gates.map((gate, i) => <GateComp gate={gate} gridSize={gridSize} key={i}/>)
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