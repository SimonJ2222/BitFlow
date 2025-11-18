type Wire = {
  id: number;
  points: [number,number][];
  isPreview: boolean;
}

function createNewWire(id: number, points: [number,number][], is_preview: boolean = true): Wire {
  return {
    id: id,
    points: points,
    isPreview: is_preview,
  }
}

export {
  type Wire,
  createNewWire,
}