export type NutritionData = {
  servingSize?: string;
  calories?: string;
  proteinG?: string;
  carbsG?: string;
  fiberG?: string;
  fatG?: string;
  sodiumMg?: string;
  sugarG?: string;
};

type NutrientRow = {
  label: string;
  value: string | undefined;
  unit: string;
};

export function NutritionTile({ data }: { data: NutritionData }) {
  const rows: NutrientRow[] = [
    { label: "Protein", value: data.proteinG, unit: "g" },
    { label: "Total Carbohydrates", value: data.carbsG, unit: "g" },
    { label: "Dietary Fiber", value: data.fiberG, unit: "g" },
    { label: "Total Sugars", value: data.sugarG, unit: "g" },
    { label: "Total Fat", value: data.fatG, unit: "g" },
    { label: "Sodium", value: data.sodiumMg, unit: "mg" },
  ];

  const filledRows = rows.filter((r) => r.value && r.value.trim() !== "");
  const providedCount =
    filledRows.length + (data.calories ? 1 : 0) + (data.servingSize ? 1 : 0);

  // Only render if at least 2 nutrition values are provided
  if (providedCount < 2) return null;

  return (
    <div
      className="mt-5 rounded-xl overflow-hidden"
      style={{
        border: "2px solid #CC9966",
        backgroundColor: "#FFFFFF",
        fontFamily: "var(--font-nobel)",
        maxWidth: "320px",
      }}
    >
      {/* Header */}
      <div
        className="px-4 pt-4 pb-2"
        style={{ borderBottom: "8px solid #2C2C2C" }}
      >
        <h3
          className="text-2xl leading-none"
          style={{
            fontFamily: "var(--font-bronela)",
            color: "#2C2C2C",
            letterSpacing: "-0.01em",
          }}
        >
          Nutrition Facts
        </h3>
        {data.servingSize && (
          <p
            className="mt-1 text-xs"
            style={{ color: "#555" }}
          >
            Per {data.servingSize} serving
          </p>
        )}
      </div>

      {/* Calories row */}
      {data.calories && (
        <div
          className="px-4 py-2 flex items-end justify-between"
          style={{ borderBottom: "4px solid #2C2C2C" }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: "#2C2C2C" }}
          >
            Calories
          </span>
          <span
            className="text-4xl font-bold leading-none"
            style={{
              fontFamily: "var(--font-bronela)",
              color: "#2C2C2C",
            }}
          >
            {data.calories}
          </span>
        </div>
      )}

      {/* Nutrient rows */}
      {filledRows.length > 0 && (
        <div className="px-4 py-1">
          {filledRows.map((row, idx) => (
            <div
              key={row.label}
              className="flex items-center justify-between py-1.5 text-xs"
              style={{
                borderBottom:
                  idx < filledRows.length - 1
                    ? "1px solid rgba(44,44,44,0.1)"
                    : "none",
              }}
            >
              <span style={{ color: "#2C2C2C" }}>{row.label}</span>
              <span
                className="font-semibold"
                style={{ color: "#CC9966" }}
              >
                {row.value}
                {row.unit}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer note */}
      <div
        className="px-4 py-2"
        style={{ borderTop: "1px solid rgba(44,44,44,0.1)" }}
      >
        <p
          className="text-[9px] leading-snug"
          style={{ color: "#999" }}
        >
          * % Daily Values based on a 2,000 calorie diet
        </p>
      </div>
    </div>
  );
}
