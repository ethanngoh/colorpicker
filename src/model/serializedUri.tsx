import { MultiValue } from "react-select";
import { HarmonyKey } from "../colorHarmonies";
import { SelectOption } from "../components/selectBase";
import { invert } from "lodash";

export type ConfigData = { harmony: HarmonyKey; pickedColor: string; colors: MultiValue<SelectOption> };

const HarmonyToShort = {
  [HarmonyKey.analogous]: "a",
  [HarmonyKey.complementary]: "c",
  [HarmonyKey.doubleSplitComplementary]: "d",
  [HarmonyKey.monochromatic]: "m",
  [HarmonyKey.splitComplementary]: "s",
  [HarmonyKey.square]: "q",
  [HarmonyKey.triad]: "t"
};

const ShortToHarmony = invert(HarmonyToShort);

export const serializeConfig = ({ harmony, pickedColor, colors }: ConfigData): string => {
  return [HarmonyToShort[harmony], pickedColor]
    .concat(colors.map((c) => c.value))
    .join(",")
    .replace(/#/g, "");
};

export const deserializeConfig = (serialized: string): ConfigData => {
  const a = serialized.split(",");
  const short = a[0];
  if (ShortToHarmony.hasOwnProperty(short)) {
    return {
      harmony: ShortToHarmony[short] as any as HarmonyKey,
      pickedColor: "#" + a[1],
      colors: a.splice(2).map((c) => ({
        value: "#" + c,
        label: "#" + c
      }))
    };
  } else {
    throw new Error("Unexpected short harmony type");
  }
};
