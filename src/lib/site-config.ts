export const colorTheme = (
  process.env.NEXT_PUBLIC_COLOR_THEME || "default"
).trim();

/** `theme-color` meta and manifest colors follow the active color theme. */
export const themeColor =
  colorTheme === "green"
    ? "#fcfcf8"
    : colorTheme === "orange"
      ? "#fdf8f3"
      : "#f3f2ed";
