import { useEffect, useState } from "react";
import WireComp from "./canvasElements/WireComp";
import GateComp from "./canvasElements/GateComp";
import { createNewWire, type Wire } from "../types/Wire";
import { newGate, rotationNext, type Gate } from "../types/Gate";
import { canvasLeft, canvasTop, canvasWidth, canvasHeight, gridSize } from "./constants";
import { calculateWireGroups } from "./WireGroup";
import type { WireGroup } from "../types/WireGroup";
import type { Input } from "../types/Input";
import type { Output } from "../types/Output";

function Canvas() {
  const useDotPattern: boolean = false;
  const [newWireId, setNewWireId] = useState<number>(0);
  const [cacheWires, setCacheWires] = useState<Wire[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  const [wireGroups, setWireGroups] = useState<WireGroup[]>([]);
  const [newGateId, setNewGateId] = useState<number>(0);
  const [gates, setGates] = useState<Gate[]>([]);

  const [gateDraggingId, setGateDraggingId] = useState<number[] | null>(null);
  const [wireDraggingId, setWireDraggingId] = useState<{wireId: number, type?: "input" | "output", nodeId?: number}[] | null>(null);
  const [wireDraggingStart, setWireDraggingStart] = useState<Map<number, { x: number; y: number }>>(new Map());
  const [wireDraggingTarget, setWireDraggingTarget] = useState<Map<number, { x: number; y: number }>>(new Map());
  
  const gatePinConfig: Record<string, { inputs: number; outputs: number }> = {
    AND: { inputs: 4, outputs: 1 },
    OR: { inputs: 2, outputs: 1 },
    XOR: { inputs: 3, outputs: 1 },
    FlipFlop: { inputs: 1, outputs: 1 },
    Add: { inputs: 3, outputs: 2 },
  };

  useEffect(() => {
    const newGroups = calculateWireGroups(cacheWires, gates)
    setWireGroups(newGroups)

    const newWires = cacheWires.map((wire: Wire) => {
      const group = newGroups.find((wireGroup: WireGroup) => (wireGroup.wires.find((wireInGroup: Wire) => (wireInGroup.id === wire.id))))
        if(!group) return wire
        if(group.state === wire.state) return wire

        return {
          ...wire,
          state: wire.state ?? group.state
        }
    })
    setWires(newWires)
  }, [cacheWires, gates])

  function updateWireStart(wireId: number, x: number, y: number) {
    setWireDraggingStart(prev => {
      if(prev.has(wireId)) return prev

      const next = new Map(prev);
      next.set(wireId, { x, y });
      
      return next;
    });
  }

  function updateWireTarget(wireId: number, x: number, y: number) {
    setWireDraggingTarget(prev => {
      const next = new Map(prev);
      next.set(wireId, { x, y });
      
      return next;
    });
  }

  const [offset, setOffset] = useState({x: 0, y: 0})

  const getGridCoords = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / gridSize);
    const y = Math.round((e.clientY - rect.top) / gridSize);
    return { x, y };
  }

  const handleDrop = (e: React.DragEvent<SVGSVGElement>) => {
  e.preventDefault();
  const { x, y } = getGridCoords(e);

  const type = e.dataTransfer.getData("gateType");
  if (!type) return;

  const newId = gates.length;

  // Pins aus Mapping-Tabelle holen
  const config = gatePinConfig[type] || { inputs: 0, outputs: 0 };

  const inputs = Array.from({ length: config.inputs }, () => ({ gateId: newId }));
  const outputs = Array.from({ length: config.outputs }, () => ({ gateId: newId }));

  const width = 3;
  const height = Math.max(2, inputs.length + 1, outputs.length + 1);
  
  // Neues Gate mit Pins erzeugen
  const newGateObj = newGate(newId, x, y, width, height, type, undefined, inputs, outputs);
  setGates((prev) => [...prev, newGateObj]);
  
  };

  const handleDragOver = (e: React.DragEvent<SVGSVGElement>) => {
    e.preventDefault();
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e.button !== 0) return;
    e.stopPropagation();

    const { x, y } = getGridCoords(e);
    
    // Neues Kabel einfügen
    const _newWireId = newWireId
    setNewWireId(_newWireId + 1)

    setCacheWires(wires => [...wires, createNewWire(_newWireId, [[x, y]])])

    setWireDraggingId(prev => [...(prev ?? []), {wireId: _newWireId}]);
    updateWireStart(_newWireId, x, y)
  }

  const handleMouseDownGate = (e: React.MouseEvent<SVGRectElement, MouseEvent>, gateId: number) => {
    if (e.button !== 0) return;
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    setGateDraggingId(prev => [...(prev ?? []), gateId]);

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top; 
    setOffset({x: mouseX / gridSize, y: mouseY / gridSize});

    // Kabel ziehen
    let _newWireId = newWireId

    // Inputs
    const inputs = gates.find((gate: Gate) => (gate.id === gateId))!.inputs
    handleNewWiresInput(inputs, _newWireId)
    // Anzahl an Inputs addieren
    _newWireId += inputs.filter((input: Input, inputId: number) => {
      return wireGroups.some((wireGroup: WireGroup) => 
        wireGroup.inputs.some(inputArr =>
          inputArr[0] === input.gateId &&
          inputArr[1] === inputId
        )
      )
    }).length

    // Outputs
    const outputs = gates.find((gate: Gate) => (gate.id === gateId))!.outputs
    handleNewWiresOutput(outputs, _newWireId)
    // Anzahl an Outputs addieren
    _newWireId += outputs.filter((output: Output, outputId: number) => {
      return wireGroups.some((wireGroup: WireGroup) => 
        wireGroup.outputs.some(outputArr =>
          outputArr[0] === output.gateId &&
          outputArr[1] === outputId
        )
      )
    }).length

    setNewWireId(_newWireId)
  }

  const handleNewWiresInput = (inputs: Input[], _newWireId: number) => {
    // Neue Kabel zum Gate-Input erstellen
    inputs.forEach((input: Input, inputId: number) => {
      // Wenn keine Kabel am Input sind, abbrechen
      if(!wireGroups.some((wireGroup: WireGroup) => 
        wireGroup.inputs.some(inputArr =>
          inputArr[0] === input.gateId &&
          inputArr[1] === inputId
        )
      )) return
      
      const _tempWireId = _newWireId + inputId

      if(wires.some((wire: Wire) => (wire.id === _tempWireId))) return 

      setCacheWires(wires => [...wires, createNewWire(_tempWireId, [[input.x!, input.y!]])])
      setWireDraggingId(prev => [...(prev ?? []), {wireId: _tempWireId, type: "input", nodeId: inputId}]);
      updateWireStart(_tempWireId, input.x!, input.y!)      
    })
  }

  const handleNewWiresOutput = (outputs: Output[], _newWireId: number) => {
    // Neue Kabel zum Gate-Output erstellen
    outputs.forEach((output: Output, outputId: number) => {
      // Wenn keine Kabel am Output sind, abbrechen
      if(!wireGroups.some((wireGroup: WireGroup) => 
        wireGroup.outputs.some(outputArr =>
          outputArr[0] === output.gateId &&
          outputArr[1] === outputId
        )
      )) return
      
      const _tempWireId = _newWireId + outputId

      if(wires.some((wire: Wire) => (wire.id === _tempWireId))) return 

      setCacheWires(wires => [...wires, createNewWire(_tempWireId, [[output.x!, output.y!]])])

      setWireDraggingId(prev => [...(prev ?? []), {wireId: _tempWireId, type: "output", nodeId: outputId}]);
      updateWireStart(_tempWireId, output.x!, output.y!)      
    })
  }

  const handleMouseDownInput = (e: React.MouseEvent<SVGPolylineElement, MouseEvent>) => {
    if (e.button !== 0) return;
    e.stopPropagation();

    const polyline = e.currentTarget;
    const x = parseInt(polyline.getAttribute("pos-x")!);
    const y = parseInt(polyline.getAttribute("pos-y")!);
    
    // Neues Kabel einfügen
    const _newWireId = newWireId
    setNewWireId(_newWireId + 1)

    setCacheWires(wires => [...wires, createNewWire(_newWireId, [[x, y]])])

    setWireDraggingId(prev => [...(prev ?? []), {wireId: _newWireId}]);
    updateWireStart(_newWireId, x, y)
  }

  const handleMouseDownNode = (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    if (e.button !== 0) return;
    e.stopPropagation();

    const circle = e.currentTarget;
    const x = parseInt(circle.getAttribute("pos-x")!);
    const y = parseInt(circle.getAttribute("pos-y")!);
    
    // Neues Wire einfügen
    const _newWireId = newWireId
    setNewWireId(_newWireId + 1)

    setCacheWires(wires => [...wires, createNewWire(_newWireId, [[x, y]])])
    
    setWireDraggingId(prev => [...(prev ?? []), {wireId: _newWireId}]);
    updateWireStart(_newWireId, x, y)

    setNewWireId(_newWireId + 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    console.log(e.code)
    e.stopPropagation();
    switch (e.code) {
      case "KeyR":
        if(!gateDraggingId) return;
          setGates((gates:Gate[]) => gates.map((gate: Gate) => {
            if (!gateDraggingId.includes(gate.id)) return gate
            
            return {
              ...gate,
              rotation: rotationNext[gate.rotation]
            }
          }))
        break;
    }
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();

    const { x, y } = getGridCoords(e);
    
    if(gateDraggingId !== null) {
      moveGate(x, y)
    }
    if(wireDraggingId) { // einzelnes Kabel
      dragWire(x, y)
    }
  }

  const handleMouseUp = () => {
    if (gateDraggingId !== null) {
      setGateDraggingId(null);
    } 
    if (wireDraggingId) {
      const newCacheWires = cacheWires
          .filter((wire: Wire) => (wire.points.length > 1))
          .map((wire: Wire) => ((wireDraggingId.some(value => (value.wireId === wire.id))) ? { ...wire, state: undefined } : wire));
      setCacheWires(newCacheWires);
      setWireDraggingId(null);
      setWireDraggingStart(new Map())
      setWireDraggingTarget(new Map())
    }
  }

  const moveGate = (newX: number, newY: number) => {
    // Gatter verschieben
    const newGates = gates.map((gate: Gate) => {
      if(!gateDraggingId?.includes(gate.id)) return gate

      // Kabel des Gatters verschieben
      wireDraggingId?.forEach((value: {wireId: number, type?: "input" | "output", nodeId?: number}) => {
        if(!value.type || value.nodeId === undefined) return

        switch(value.type) {
          case "input":
            const input = gate.inputs[value.nodeId]
            if(!input.x || !input.y) return
            
            updateWireTarget(value.wireId, input.x, input.y)
            break;
          case "output":
            const output = gate.outputs[value.nodeId]
            
            if(!output.x || !output.y) return
            updateWireTarget(value.wireId, output.x, output.y)
            break;
          default:
            break;
        }        
      })
      
      return {
        ...gate, 
        x: Math.round(newX - offset.x), 
        y: Math.round(newY - offset.y)
      }
    });
    setGates(newGates);
  }

  const dragWire = (targetX: number, targetY: number) => {
    const newCacheWires = cacheWires
      .filter((wire: Wire) => (wire.points.length > 0))
      .map((wire: Wire) => {
        if (!wireDraggingId?.some(value => (value.wireId === wire.id))) return wire;
        if (!wireDraggingStart.has(wire.id)) return wire;
        
        const [x0, y0] = [wireDraggingStart.get(wire.id)!.x, wireDraggingStart.get(wire.id)!.y];
        const [x1, y1] = [wireDraggingTarget.get(wire.id)?.x ?? targetX, wireDraggingTarget.get(wire.id)?.y ?? targetY];
        if(x0 === undefined || y0 === undefined) return wire;

        let newPoints: [number, number][];
        if((x0 === x1 && y0 === y1)) {
          newPoints = [[x0, y0]]
        } else if(x0 === x1 || y0 === y1) {
          newPoints = [
            [x0, y0],
            [x1, y1] 
          ];
        } else {
          if(Math.abs(x1 - x0) > Math.abs(y1 - y0)) {
            newPoints = [
              [x0, y0],
              [x1, y0],
              [x1, y1]
            ];
          } else {
            newPoints = [
              [x0, y0],
              [x0, y1],
              [x1, y1]
            ];
          }
        }

        return {
          ...wire,
          points: newPoints
        };
      });
    setCacheWires(newCacheWires);
  }

  const deleteWire = (wireId: number) => {
    let newCacheWires = cacheWires.filter((wire: Wire) => (wire.id !== wireId));
    setCacheWires(newCacheWires);
  }

  return(
    <svg id="svg_canvas" className="absolute" style={{left: canvasLeft, top: canvasTop}} width={canvasWidth} height={canvasHeight} 
      tabIndex={0}
      onDrop={handleDrop}         
      onDragOver={handleDragOver}  
      onMouseMove={handleMouseMove} 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
    >
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
          wires.map((wire: Wire) => <WireComp wire={wire} key={wire.id} remove={() => deleteWire(wire.id)} onMouseDownNode={(e) => handleMouseDownNode(e)}/>)
        }
      </g>
      <g id="gate_group">
        {
          gates.map((gate: Gate, index: number) => 
            <GateComp 
              gate={gate} 
              key={index} 
              onMouseDownGate={(e: any) => handleMouseDownGate(e, index)} 
              onMouseDownInput={(e: any) => handleMouseDownInput(e)} 
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