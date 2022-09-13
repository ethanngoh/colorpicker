import { hexToHsl } from "./colorConvert";

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
  const { h, s, l } = hexToHsl(hex);
  const h3 = h * 360;
  const h4 = h3 + 8;
  const props: Props = {
    steps: 10,
    hue: {
      start: h * 360, // 0 - 359
      end: h * 360 + 8, // 0 - 359
      curve: "easeInSine"
    },
    saturation: {
      start: 0.8, // 0 - 1
      end: 0.2, // 0 - 1
      curve: "easeInSine",
      rate: 1
    },
    brightness: {
      start: 1,
      end: 0.2,
      curve: "easeInSine"
    }
  };
  const options: Options = {
    minorSteps: [0, 1],
    lockHex: hex,
    provideInverted: true,
    lockHexInverted: hex,
    rotation: "cw", //"clockwise" | "counterclockwise" | "cw" | "ccw";
    name: "basicColorChoice"
  };

  return colorAlgoLib.generate(props, options);
}
