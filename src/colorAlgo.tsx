import Color from "color";

const colorAlgoLib = require("@k-vyn/coloralgorithm");

interface Props {
  steps: number;
  hue: {
    start: number; // 0 - 359
    end: number; // 0 - 359
    curve: string; // See acceptable curves below
  };
  saturation: {
    start: number; // 0 - 1
    end: number; // 0 - 1
    curve: string;
    rate: number; // 1 is default
  };
  brightness: {
    start: number; // 0 - 1
    end: number; // 0 - 1
    curve: string;
  };
}

interface Options {
  minorSteps?: number[];
  lockHex?: string; // hex value
  provideInverted?: boolean;
  lockHexInverted?: string; // hex value
  rotation?: "clockwise" | "counterclockwise" | "cw" | "ccw";
  name?: string;
}

export interface ColorResult {
  step: number;
  hue: number;
  saturation: number;
  brightness: number;
  isMajor: boolean;
  isLocked: boolean;
  hex: string;
  hsl: number[];
  hsv: number[];
  lab: number[];
  rgbString: string;
  rgbArray: number[];
  rgbaString: string;
  rgbaArray: number[];
}

export interface GenerateColorsResult {
  inverted: boolean;
  name: string;
  colors: ColorResult[];
}

export function generateColors(hex: string): GenerateColorsResult[] {
  const c = Color(hex);
  const d = c.hsl().array();

  const h = d[0];
  const props: Props = {
    steps: 10,
    hue: {
      start: h, // 0 - 359
      end: h + 8, // 0 - 359
      curve: "easeInSine"
    },
    saturation: {
      start: 0.1, // 0 - 1
      end: 0.7, // 0 - 1
      curve: "easeInSine",
      rate: 1
    },
    brightness: {
      start: 1,
      end: 0.1,
      curve: "easeInSine"
    }
  };
  const options: Options = {
    minorSteps: [0, 1],
    lockHex: hex,
    provideInverted: true,
    lockHexInverted: hex,
    rotation: "cw", //"clockwise" | "counterclockwise" | "cw" | "ccw";
    name: `COLOR_${hex.slice(1).toUpperCase()}`
  };

  return colorAlgoLib.generate(props, options);
}
