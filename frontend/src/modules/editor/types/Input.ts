

type Input = {
  x: number;
  y: number;
}

function newInput(x: number = 0, y: number = 0): Input {
  return {
    x: Math.floor(x),
    y: Math.floor(y),
  }
}

export {
  type Input,
  newInput,
}