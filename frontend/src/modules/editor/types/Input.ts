
type Input = {
  gateId: number;
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

export {
  type Input,
  newInput,
}