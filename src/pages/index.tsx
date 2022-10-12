import styled from "@emotion/styled";
import Color from "color";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useNavigate, useParams } from "react-router-dom";
import { MultiValue } from "react-select";
import { debounce } from "lodash";

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
import { ConfigData, deserializeConfig, serializeConfig } from "../model/serializedUri";

const ColorPickers = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const maxPageWidth = "1024px";

export const Index = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { config } = params;
  const parsedConfig = config
    ? deserializeConfig(config)
    : {
        colors: null,
        pickedColor: null,
        harmony: null
      };

  useBackgroundColor(GRAY_RANGE[900]);
  useTextColor(GRAY_RANGE[0]);

  const [colors, setColors] = useState<MultiValue<SelectOption>>(parsedConfig.colors || []);
  const [pickedColor, setPickedColor] = useState(parsedConfig.pickedColor || "#1A17D0");
  const [harmony, setHarmony] = useState(parsedConfig.harmony || HarmonyKey.analogous);

  const updateState = debounce((config: Partial<ConfigData>) => {
    const finalConfig = {
      colors,
      pickedColor,
      harmony,
      ...config
    };
    navigate("/" + serializeConfig(finalConfig));
  }, 250);

  return (
    <Page maxWidth={maxPageWidth}>
      <FlexColC gap="1rem">
        <H1>Color Picker</H1>
        <ColorPickers>
          <HexColorPicker
            color={pickedColor}
            onChange={(pickedColor) => {
              updateState({ pickedColor });
              setPickedColor(pickedColor);
            }}
            style={{
              width: "15rem",
              height: "15rem"
            }}
          />
        </ColorPickers>
        <SingleValueInput
          selections={Object.values(HarmonyKey)}
          currentValue={harmony}
          setCurrentValue={(harmony) => {
            updateState({ harmony: harmony as HarmonyKey });
            setHarmony(harmony);
          }}
        />
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

            const newColors = [...colors, ...harmonySelects];
            setColors(newColors);
            updateState({ colors: newColors });
          }}
        >
          Use Colors
        </button>
        <HR />
        <H1>Shade Generator</H1>
        <MultiColorInput
          placeholder={"Type Hex Colors"}
          input={colors}
          setInput={(colors) => {
            setColors(colors);
            updateState({ colors });
          }}
        />
        {colors && <ShadeResultsDisplay colors={colors.map((c) => c.value)} />}
        <HR />
        <H1>Export</H1>
        {colors && <ShadeResultsExport colors={colors.map((c) => c.value)} />}
      </FlexColC>
    </Page>
  );
};
