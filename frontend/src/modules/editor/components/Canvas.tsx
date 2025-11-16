import { useState } from "react";
import WireComp from "./canvasElements/WireComp";
import GateComp from "./canvasElements/GateComp";
import { createNewWire, type Wire } from "../types/Wire";
import { newGate, type Gate } from "../types/Gate";
import { canvasLeft, canvasTop, canvasWidth, canvasHeight, gridSize } from "./constants";
import type { Input } from "../types/Input";

function Canvas() {

  var useDotPattern: boolean = false;

  const [wires, setWires] = useState<Wire[]>([]);
  const [gates, setGates] = useState<Gate[]>([
    // 3 * 5 
    newGate(2,2,3,5, [{gateId:1}, {gateId:1}, {gateId:1}, {gateId:1}]),
    // 4 * 4
    newGate(6,2,4,4, [{gateId:2}]),
    // 3 * 3
    newGate(10,2,3,3, [{gateId:3}, {gateId:3}]),
    // 5 * 5 
    newGate(2,2,5,5, [{gateId:4}, {gateId:4}, {gateId:4}]),
  ]);

  const [gateDraggingId, setGateDraggingId] = useState<number | null>(null);
  const [wireDraggingId, setWireDraggingId] = useState<number | null>(null);

  const[offset, setOffset] = useState({x: 0, y: 0})

  const getGridCoords = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / gridSize);
    const y = Math.round((e.clientY - rect.top) / gridSize);
    return { x, y };
  }

  const handleMouseDownGate = (e: React.MouseEvent<SVGRectElement, MouseEvent>, id: number) => {
    if (e.button !== 0) return;

    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setGateDraggingId(id);

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top; 
    setOffset({x: mouseX / gridSize, y: mouseY / gridSize});
  }

  const handleMouseDownInput = (e: React.MouseEvent<SVGPolylineElement, MouseEvent>, gateId: number) => {
    if (e.button !== 0) return;

    e.stopPropagation();
    const polyline = e.currentTarget;
    const inputId = parseInt(polyline.getAttribute("input-id")!);
    const x = parseInt(polyline.getAttribute("pos-x")!);
    const y = parseInt(polyline.getAttribute("pos-y")!);
    
    // Neues Wire einfügen
    setWires(wires => [...wires, createNewWire([[x, y]], true)])
    const newWireId = wires.length

    setWireDraggingId(newWireId);
    
    setGates(gates => gates.map((gate: Gate, index: number) => {
      if (index !== gateId) return gate
      
      return {
        ...gate,
        inputs: gate.inputs.map((input: Input, index: number) => {
        if (index !== inputId) return input
        
        return {
          ...input,
          wiresId: [...input.wiresId ? input.wiresId : [], newWireId]
        }
        })
      }
    }))
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e.button !== 0) return;

    const { x, y } = getGridCoords(e);
    
    if(gateDraggingId !== null) {
      const newGates = gates.map((g, i) => (i === gateDraggingId) ? {...g, x: Math.round(x - offset.x), y: Math.round(y - offset.y)} : g);
      setGates(newGates);
    } else if(wireDraggingId !== null) {
      moveWire(x, y)
    }
  }

  const handleMouseUp = () => {
    if (gateDraggingId !== null) {
      setGateDraggingId(null);
    }
    if (wireDraggingId !== null) {
      const newWires = wires.map((wire: Wire, index: number) => {
        if (index !== wireDraggingId) return wire;

        return {
          ...wire,
          isPreview: false
        };
      });
      setWires(newWires);
      setWireDraggingId(null);
    }
  }

  const moveWire = (newX: number, newY: number) => {
    if (wireDraggingId === null) return

    const newWires = wires.map((wire: Wire, index: number) => {
      if (index !== wireDraggingId) return wire;

      if (wire.points.length === 0) return wire;
      
      const start = wire.points[0];
      const [x0, y0] = start;
      const [x1, y1] = [newX, newY];

      // Erzeuge gezackte Linie: horizontal zuerst, dann vertikal
      const newPoints: [number, number][] = [
        start,
        [x1, y0], // horizontal
        [x1, y1]  // vertikal
      ];

      return {
        ...wire,
        points: newPoints
      };
    });
    setWires(newWires);
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
          gates.map((gate, i) => 
            <GateComp 
              gate={gate} 
              key={i} 
              onMouseDownGate={(e: any) => handleMouseDownGate(e, i)} 
              onMouseDownInput={(e: any) => handleMouseDownInput(e, i)} 
            />
          )
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