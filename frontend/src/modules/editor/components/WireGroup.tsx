import type { Wire } from "../types/Wire";
import type { WireGroup } from "../types/WireGroup";

function calculateWireGroups(wires: Wire[]): WireGroup[] {
  const visited = new Set<number>();
  const groups: WireGroup[] = [];
  let groupId = 0;

  for (let i = 0; i < wires.length; i++) {
    if (visited.has(i)) continue;

    // Neue Gruppe starten
    const queue = [i];
    const group: Wire[] = [];
    visited.add(i);

    while (queue.length > 0) {
      const currentIndex = queue.pop()!;
      const currentWire = wires[currentIndex];
      group.push(currentWire);

      // Nachbar-Wires suchen
      for (let j = 0; j < wires.length; j++) {
        if (!visited.has(j) && wiresSharePoint(currentWire, wires[j])) {
          visited.add(j);
          queue.push(j);
        }
      }
    }

    groups.push({
      id: groupId++,
      wires: group
    });
  }
  console.log(groups)
  return groups;
}


function wiresSharePoint(a: Wire, b: Wire): boolean {
  return a.points.some(ap =>
    b.points.some(bp => ap[0] === bp[0] && ap[1] === bp[1])
  );
}

export {
  calculateWireGroups
}