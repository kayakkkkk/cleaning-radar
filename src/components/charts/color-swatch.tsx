interface Props {
  colors: string[];
  size?: number;
}

export function ColorSwatchRow({ colors, size = 28 }: Props) {
  return (
    <div className="flex gap-1">
      {colors.map((c, i) => (
        <div
          key={`${c}-${i}`}
          className="rounded-md ring-1 ring-black/5 shadow-sm"
          style={{
            backgroundColor: c,
            width: size,
            height: size,
          }}
          title={c}
        />
      ))}
    </div>
  );
}

export function ColorPaletteBar({ colors }: { colors: string[] }) {
  return (
    <div className="flex h-6 w-full overflow-hidden rounded-md ring-1 ring-black/5">
      {colors.map((c, i) => (
        <div key={`${c}-${i}`} style={{ backgroundColor: c }} className="flex-1" />
      ))}
    </div>
  );
}
