

type Output = {
  x: number;
  y: number;
}

function newOutput(x: number = 0, y: number = 0): Output {
  return {
    x: Math.floor(x),
    y: Math.floor(y),
  }
}

export {
  type Output,
  newOutput,
}