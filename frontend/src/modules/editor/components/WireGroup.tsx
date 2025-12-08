import type { Gate } from "../types/Gate";
import type { Wire } from "../types/Wire";
import type { WireGroup } from "../types/WireGroup";

function calculateWireGroups(wires: Wire[], gates: Gate[]): WireGroup[] {
  const visited = new Set<number>();
  let groups: WireGroup[] = [];
  let groupId = 0;

  for (let i = 0; i < wires.length; i++) {
    if (visited.has(i)) continue;

    // Neue Gruppe
    const queue = [i];
    const group: Wire[] = [];
    visited.add(i);

    while (queue.length > 0) {
      const currentIndex = queue.pop()!;
      const currentWire = wires[currentIndex];
      group.push(currentWire);

      for (let j = 0; j < wires.length; j++) {
        if (!visited.has(j) && wiresSharePoint(currentWire, wires[j])) {
          visited.add(j);
          queue.push(j);
        }
      }
    }

    groups.push({
      id: groupId++,
      state: "low",
      wires: group,
      inputs: [],
      outputs: [],
    });
  }

  groups = calculateWireGroupInputs(groups, gates)
  groups = calculateWireGroupOutputs(groups, gates)
  //console.log("Bearbeitete Gruppen:", groups)

  return groups;
}

function wiresSharePoint(a: Wire, b: Wire): boolean {
  return a.points.some(ap =>
    b.points.some(bp => ap[0] === bp[0] && ap[1] === bp[1])
  );
}

function calculateWireGroupInputs(wireGroups: WireGroup[], gates: Gate[]) {
  return wireGroups.map(group => {
    const foundInputs: [number, number][] = [];

    for (let wire of group.wires) {
      for (let [px, py] of wire.points) {
        gates.forEach((gate, gateId) => {
          if (!gate.inputs) return;

          gate.inputs.forEach((input, inputId) => {
            if (px === input.x && py === input.y) {
              if(!foundInputs.some(([gId, iId]: [number, number]) => (gId === gateId && iId === inputId))) foundInputs.push([gateId, inputId]);
            }
          });
        });
      }
    }

    return {
      ...group,
      inputs: foundInputs
    };
  });
}

function calculateWireGroupOutputs(wireGroups: WireGroup[], gates: Gate[]) {
  return wireGroups.map(group => {
    const foundOutputs: [number, number][] = [];

    for (let wire of group.wires) {
      for (let [px, py] of wire.points) {
        gates.forEach((gate, gateId) => {
          if (!gate.outputs) return;

          gate.outputs.forEach((output: any, outputId: number) => {
            if (px === output.x && py === output.y) {
              if(!foundOutputs.some(([gId, oId]: [number, number]) => (gId === gateId && oId === outputId))) foundOutputs.push([gateId, outputId]);
            }
          });
        });
      }
    }

    return {
      ...group,
      outputs: foundOutputs,
      state: ((foundOutputs.length > 1) ? "error" as const : group.state)
    };
  });
}


export {
  calculateWireGroups
}