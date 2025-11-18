import type { Wire } from "./Wire";

type WireGroup = {
  id: number;
  error?: "multiple_outputs" | "wire_multiple_groups";
  wires: Wire[];
}

export {
  type WireGroup
}