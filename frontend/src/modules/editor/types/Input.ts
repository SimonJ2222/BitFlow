
type Input = {
  gateId: number;
  wiresId?: number[];
  x?: number;
  y?: number;
}

function newInput(gateId: number, x: number = 0, y: number = 0): Input {
  return {
    gateId: gateId,
    x: Math.floor(x),
    y: Math.floor(y),
  }
}

type Rotation = "North" | "East" | "South" | "West";

export {
  type Input,
  newInput,
  type Rotation
}