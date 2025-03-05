export const colorize = (color, text) => {
  const colorCode = Bun.color(color, "ansi");
  return `${colorCode}${text}\x1b[0m`;
};
