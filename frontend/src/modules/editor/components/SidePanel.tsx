const gates = [
  { type: "AND", width: 3, height: 5 },
  { type: "OR", width: 3, height: 3 },
  { type: "XOR", width: 5, height: 5 },
  { type: "FlipFlop", width: 4, height: 4 },
];

function SidePanel() {
  return (
      <div className="w-48 bg-gray-100 border-r p-2">
      <h3 className="font-bold mb-2">Logikgatter</h3>
      {gates.map((gate) => (
        <div
          key={gate.type}
          className="p-2 bg-white border mb-2 cursor-pointer hover:bg-gray-200"
          draggable
          onDragStart={(e) => {
            
            e.dataTransfer.setData("gateType", gate.type);
            e.dataTransfer.setData("gateWidth", gate.width.toString());
            e.dataTransfer.setData("gateHeight", gate.height.toString());
          }}
        >
          {gate.type}
        </div>
      ))}
    </div>
  );
}

export default SidePanel;
