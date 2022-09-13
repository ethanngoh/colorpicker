export enum ColorKey {
  PRIMARY = "PRIMARY",
  BACKGROUND = "BACKGROUND"
}

export type ColorPalette = {
  [key in ColorKey]: string;
};

export const COLORS = {
  NAVY: "#15214B",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  BLUE: "#f8fcff",
  GREEN: "#186118"
};

export const LIGHT_COLORS: ColorPalette = {
  PRIMARY: "#15214B",
  BACKGROUND: "#FFFFFF"
};

export const DARK_COLORS: ColorPalette = {
  PRIMARY: "#6E78A6",
  BACKGROUND: "#15214B"
};

export const GRAY_RANGE = {
  0: "#fff",
  50: "#fcfcfc",
  100: "#f2f0f0",
  200: "#d7d2d2",
  300: "#bcb4b4",
  400: "#a29696",
  500: "#877878",
  600: "#695d5d",
  700: "#4b4343",
  800: "#2d2828",
  900: "#0f0d0d"
};

export function getColor(colorKey: keyof ColorPalette) {
  var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDarkScheme ? DARK_COLORS[colorKey] : LIGHT_COLORS[colorKey];
}
