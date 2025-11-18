

type Output = {
  gateId: number;
  x?: number;
  y?: number;
}

function newOutput(gateId: number, x: number = 0, y: number = 0): Output {
  return {
    gateId: gateId,
    x: Math.floor(x),
    y: Math.floor(y),
  }
}

export {
  type Output,
  newOutput,
}