
type Input = {
  gateId: number;
  wiresId?: number[];
  x?: number;
  y?: number;
}

function newInput(gateId: number, wiresId: number[] = [], x: number = 0, y: number = 0): Input {
  return {
    gateId: gateId,
    wiresId: wiresId,
    x: Math.floor(x),
    y: Math.floor(y),
  }
}

type Rotation = "North" | "East" | "South" | "West";

const rotationNext: Record<Rotation, Rotation> = {
  North: "East",
  East: "South",
  South: "West",
  West: "North",
};

export {
  type Input,
  newInput,
  type Rotation,
  rotationNext
}