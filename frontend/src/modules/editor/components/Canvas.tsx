import { useEffect, useState } from "react";
import WireComp from "./canvasElements/WireComp";
import GateComp from "./canvasElements/GateComp";
import { createNewWire, type Wire } from "../types/Wire";
import { newGate, rotationNext, type Gate } from "../types/Gate";
import { canvasLeft, canvasTop, canvasWidth, canvasHeight, gridSize } from "./constants";
import { calculateWireGroups } from "./WireGroup";
import type { WireGroup } from "../types/WireGroup";

function Canvas() {
  const useDotPattern: boolean = false;
  const [newWireId, setNewWireId] = useState<number>(0);
  const [cacheWires, setCacheWires] = useState<Wire[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  const [wireGroups, setWireGroups] = useState<WireGroup[]>([]);
  const [newGateId, setNewGateId] = useState<number>(3);
  const [gates, setGates] = useState<Gate[]>([
    // 3 * 5 
    newGate(0, 2,2,3,5, "AND", undefined, [{gateId:0}, {gateId:0}, {gateId:0}, {gateId:0}], [{gateId:0}]),
    // 4 * 4
    newGate(1, 6,2,4,4, "FlipFlop", undefined, [{gateId:1}], [{gateId:1}, {gateId:1}, {gateId:1}]),
    // 3 * 3
    newGate(2, 11,2,3,3, "OR", undefined, [{gateId:2}, {gateId:2}], [{gateId:2}]),
    // 5 * 5 
    newGate(3, 2,8,5,5, "XOR", undefined, [{gateId:3}, {gateId:3}, {gateId:3}], [{gateId:3}]),
  ]);

  const [gateDraggingId, setGateDraggingId] = useState<number[] | null>(null);
  const [wireDraggingId, setWireDraggingId] = useState<number[] | null>(null);
  const [wireDraggingStart, setWireDraggingStart] = useState<Map<number, { x: number; y: number }>>(new Map());

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

  function updateWireStart(newWireId: number, x: number, y: number) {
    setWireDraggingStart(prev => {
      if(prev.has(newWireId)) return prev

      const next = new Map(prev);
      next.set(newWireId, { x, y });
      
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

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e.button !== 0) return;
    e.stopPropagation();

    const { x, y } = getGridCoords(e);
    
    // Neues Kabel einfügen
    const _newWireId = newWireId
    setNewWireId(_newWireId + 1)

    setCacheWires(wires => [...wires, createNewWire(_newWireId, [[x, y]])])

    setWireDraggingId(prev => [...(prev ?? []), _newWireId]);
    updateWireStart(_newWireId, x, y)
  }

  const handleMouseDownGate = (e: React.MouseEvent<SVGRectElement, MouseEvent>, id: number) => {
    if (e.button !== 0) return;
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    setGateDraggingId(prev => [...(prev ?? []), id]);

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top; 
    setOffset({x: mouseX / gridSize, y: mouseY / gridSize});

    // Wires des Gates verschieben
    /*
    const newGates = gates.map((gate: Gate, gateId: number) => {
      if(gateId !== id) return gate

      const newInputs = gate.inputs.map((input: Input) => {
        if(!input.wiresId?.length) return input
        // Neues Wire einfügen
        let _newWireId = newWireId
        let newWiresId: number[] = []
        input.wiresId.forEach((wireId: number) => {
          setCacheWires(wires => [...wires, createNewWire(_newWireId, [[input.x!, input.y!]], true)])
          setWireDraggingId(prev => {
            if(prev?.includes(_newWireId)) return prev
            return [...(prev ?? []), _newWireId]
          });
          console.log("88888888", _newWireId)
          updateWireStart(_newWireId, input.x!, input.y!);
          newWiresId = [...newWiresId, _newWireId]
          console.log("99999", _newWireId, newWiresId)
          _newWireId = _newWireId + 1
        })
        console.log("finished")
        setNewWireId(_newWireId + 1)
        console.log(newWiresId)
        return {
          ...input,
          wiresId: [...input.wiresId, ...newWiresId]
        }
      })

      return {
        ...gate,
        inputs: newInputs
      }
    })
    setGates(newGates)
    */
  }

  const handleMouseDownInput = (e: React.MouseEvent<SVGPolylineElement, MouseEvent>) => {
    if (e.button !== 0) return;
    e.stopPropagation();

    const polyline = e.currentTarget;
    const x = parseInt(polyline.getAttribute("pos-x")!);
    const y = parseInt(polyline.getAttribute("pos-y")!);
    
    // Neues Wire einfügen
    const _newWireId = newWireId
    setNewWireId(_newWireId + 1)

    setCacheWires(wires => [...wires, createNewWire(_newWireId, [[x, y]])])

    setWireDraggingId(prev => [...(prev ?? []), _newWireId]);
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
    
    setWireDraggingId(prev => [...(prev ?? []), _newWireId]);
    updateWireStart(_newWireId, x, y)

    setNewWireId(_newWireId + 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    console.log(e.code)
    e.stopPropagation();
    switch (e.code) {
      case "KeyR":
        if(!gateDraggingId) return;
          setGates(gates => gates.map((gate: Gate, gateIndex: number) => {
            if (!gateDraggingId.includes(gateIndex)) return gate
            
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
    } else if(wireDraggingId) { // Neues Wire (allein)
      dragNewWire(x, y)
    }
  }

  const handleMouseUp = () => {
    if (gateDraggingId !== null) {
      setGateDraggingId(null);
    } 
    if (wireDraggingId) {
      const newCacheWires = cacheWires
          .filter((wire: Wire) => (wire.points.length > 1))
          .map((wire: Wire) => ((wireDraggingId.includes(wire.id)) ? { ...wire, state: undefined } : wire));
      setCacheWires(newCacheWires);
      setWireDraggingId(null);
      setWireDraggingStart(new Map())
    }
  }

  const moveGate = (newX: number, newY: number) => {
    // Gate verschieben
    const newGates = gates.map((gate: Gate, index: number) => {
      if(!gateDraggingId?.includes(index)) return gate
      /*  
      if(wireDraggingId) { // Vorhandene Wire (an Gate) verschieben
        gate.inputs.forEach((input: Input) => {
          if(!input.wiresId?.length) return

          input.wiresId.forEach((wireId: number) => {
            dragWire(wireId, input.x!, input.y!)
          })
        })
      }
      */

      return {
        ...gate, 
        x: Math.round(newX - offset.x), 
        y: Math.round(newY - offset.y)
      }
    });
    setGates(newGates);
  }
  /*
  const dragWire = (wireId: number, targetX: number, targetY: number) => {
    const newWires = wires
      .filter((wire: Wire) => (wire.points.length !== 0))
      .map((wire: Wire) => {
        if (wire.id !== wireId) return wire;
        
        const [x0, y0] = [wireDraggingStart.get(wire.id)?.x, wireDraggingStart.get(wire.id)?.y];
        const [x1, y1] = [targetX, targetY];
        console.log("56565656", wire.id)
        console.log("7676766767", [...wireDraggingStart.keys()]); 
        if(x0 === undefined || y0 === undefined) return wire;

        const newPoints: [number, number][] = [
          [x0, y0],
          [x1, y0],
          [x1, y1] 
        ];

        return {
          ...wire,
          points: newPoints
        };
      });
    setWires(newWires);
  }
  */
  const dragNewWire = (targetX: number, targetY: number) => {
    const newCacheWires = cacheWires
      .filter((wire: Wire) => (wire.points.length > 0))
      .map((wire: Wire) => {
        if (!wireDraggingId?.includes(wire.id)) return wire;

        const [x0, y0] = [wireDraggingStart.get(wire.id)?.x, wireDraggingStart.get(wire.id)?.y];
        const [x1, y1] = [targetX, targetY];
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
      onMouseMove={handleMouseMove} 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDownCapture={handleKeyDown}
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
          gates.map((gate, i) => 
            <GateComp 
              gate={gate} 
              key={i} 
              onMouseDownGate={(e: any) => handleMouseDownGate(e, i)} 
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