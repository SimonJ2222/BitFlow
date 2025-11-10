

type Gate = {
  x: number;
  y: number;
  width: number;
  height: number;
}

function newGate(x: number = 0, y: number = 0, width: number = 2, height: number = 2): Gate {
  return {
    x: Math.floor(x),
    y: Math.floor(y),
    width: width,
    height: height,
  }
}

export {
  type Gate,
  newGate,
}