

type Output = {
  gateId: number;
  x?: number;
  y?: number;
  logicFunction?: Function
}

function newOutput(gateId: number, x: number = 0, y: number = 0, logicFunction: Function = (() => "low" as const)): Output {
  return {
    gateId: gateId,
    x: Math.round(x),
    y: Math.round(y),
    logicFunction: logicFunction,
  }
}

export {
  type Output,
  newOutput,
}