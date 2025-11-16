

type Wire = {
  points: [number,number][];
  isPreview: boolean;
}

function createNewWire(points: [number,number][], is_preview: boolean = true): Wire {
  return {
    points: points,
    isPreview: is_preview,
  }
}

export {
  type Wire,
  createNewWire,
}