import type { Input, Rotation } from "./Input";
import type { Output } from "./Output";


type Gate = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  rotation: Rotation;
  inputs: Input[];
  outputs: Output[];
}

function newGate(x: number = 0, y: number = 0, width: number = 2, height: number = 2, label: string = "", rotation: Rotation = "East", inputs: Input[] = [], outputs: Output[] = []): Gate {
  return {
    x: Math.floor(x),
    y: Math.floor(y),
    width: width,
    height: height,
    label: label,
    rotation: rotation,
    inputs: inputs,
    outputs: outputs,
  }
}

export {
  type Gate,
  newGate,
}