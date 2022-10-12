import { HarmonyKey } from "../colorHarmonies";
import { deserializeConfig, serializeConfig } from "./serializedUri";

it("works all the way around", () => {
  const config = {
    harmony: HarmonyKey.analogous,
    pickedColor: "#ffffff",
    colors: [{ label: "#aaaaaa", value: "#aaaaaa" }]
  };
  expect(deserializeConfig(serializeConfig(config))).toEqual(config);
});
