

type Gate = {
  x: number;
  y: number;
  width: number;
  height: number;
}

function newGate(x: number = 0, y: number = 0, width: number = 2, height: number = 2): Gate {
  return {
    x: x | 0,
    y: y | 0,
    width: width | 2,
    height: height | 2,
  }
}

export {
  type Gate,
  newGate,
}