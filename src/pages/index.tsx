import styled from "@emotion/styled";
import Color from "color";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { MultiValue } from "react-select";

import { HARMONIES, HarmonyKey } from "../colorHarmonies";
import { GRAY_RANGE } from "../colors";
import { ColorHarmonyDisplay } from "../components/colorHarmonyDisplay";
import { MultiColorInput } from "../components/multiColorInput";
import { SelectOption } from "../components/selectBase";
import { ShadeResultsDisplay } from "../components/shadeResultsDisplay";
import { ShadeResultsExport } from "../components/shadeResultsExport";
import { SingleValueInput } from "../components/singleValueInput";
import { useBackgroundColor } from "../hooks/useBackgroundColor";
import { useTextColor } from "../hooks/useTextColor";
import { FlexColC, H1, HR, Page } from "../stylePrimitives";

const ColorPickers = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const maxPageWidth = "1024px";

export const Index = () => {
  useBackgroundColor(GRAY_RANGE[900]);
  useTextColor(GRAY_RANGE[0]);

  const [colors, setColors] = useState<MultiValue<SelectOption>>([]);
  const [pickedColor, setPickedColor] = useState("#1A17D0");
  const [harmony, setHarmony] = useState(HarmonyKey.analogous);

  return (
    <Page maxWidth={maxPageWidth}>
      <FlexColC gap="1rem">
        <H1>Color Picker</H1>
        <ColorPickers>
          <HexColorPicker
            color={pickedColor}
            onChange={setPickedColor}
            style={{
              width: "15rem",
              height: "15rem"
            }}
          />
        </ColorPickers>
        <SingleValueInput selections={Object.values(HarmonyKey)} currentValue={harmony} setCurrentValue={setHarmony} />
        <ColorHarmonyDisplay color={pickedColor} harmony={harmony} />
        <button
          onClick={(e) => {
            const c = Color(pickedColor);
            const hslColor = c.hsl().array();
            const harmonies = HARMONIES[harmony](hslColor[0], hslColor[1], hslColor[2]);

            const harmonySelects = harmonies.map((h) => {
              const c = Color(h);
              return {
                label: c.hex(),
                value: c.hex()
              };
            });

            setColors([...colors, ...harmonySelects]);
          }}
        >
          Use Colors
        </button>
        <HR />
        <H1>Shade Generator</H1>
        <MultiColorInput placeholder={"Type Hex Colors"} input={colors} setInput={setColors} />
        {colors && <ShadeResultsDisplay colors={colors.map((c) => c.value)} />}
        <HR />
        <H1>Export</H1>
        {colors && <ShadeResultsExport colors={colors.map((c) => c.value)} />}
      </FlexColC>
    </Page>
  );
};
