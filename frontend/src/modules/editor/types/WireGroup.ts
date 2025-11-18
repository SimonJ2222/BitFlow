import type { Wire } from "./Wire";

type WireGroup = {
  id: number;
  error: false | "multiple_outputs";
  wires: Wire[];
  inputs: [gateId: number, inputId: number][]
  outputs: [gateId: number, outputId: number][]
}

export {
  type WireGroup
}