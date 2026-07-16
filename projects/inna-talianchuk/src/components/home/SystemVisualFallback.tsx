/** Static, non-3D fallback: same concept (one center, five connected nodes) as plain SVG. */
export function SystemVisualFallback() {
  const nodes = Array.from({ length: 5 }, (_, index) => {
    const angle = (index / 5) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 150 + Math.cos(angle) * 105,
      y: 150 + Math.sin(angle) * 105,
    };
  });

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden="true" focusable="false">
      {nodes.map((node, index) => (
        <line
          key={index}
          x1="150"
          y1="150"
          x2={node.x}
          y2={node.y}
          stroke="#8f9a7a"
          strokeWidth="1.5"
          opacity="0.5"
        />
      ))}
      <circle cx="150" cy="150" r="38" fill="none" stroke="#6f7a5a" strokeWidth="1.5" opacity="0.85" />
      {nodes.map((node, index) => (
        <circle key={index} cx={node.x} cy={node.y} r="8" fill="#5a6349" />
      ))}
    </svg>
  );
}
