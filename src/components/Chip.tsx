import { chipColorFor } from "@/lib/colors";

export function Chip({
  label,
  variant,
  size = "md",
}: {
  label: string;
  variant?: string; // explicit chip-* class
  size?: "sm" | "md";
}) {
  const cls = variant ?? chipColorFor(label);
  const sizing = size === "sm" ? "text-xs px-2.5 py-1" : "";
  return <span className={`chip ${cls} ${sizing}`}>{label}</span>;
}
