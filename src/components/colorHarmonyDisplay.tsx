import styled from "@emotion/styled";
import Color from "color";
import { AiFillCaretDown } from "react-icons/ai";
import { HARMONIES, HarmonyKey } from "../colorHarmonies";
import { FlexColC, FlexRow, H2 } from "../stylePrimitives";

type ColorDisplayProps = {
  color: string;
};

const ColorDisplay = styled.div<ColorDisplayProps>`
  background-color: ${(props) => props.color};
  margin-bottom: 0.25rem;
  padding: 2rem;
`;

const ColorText = styled.span`
  font-size: 1rem;
  font-family: "Roboto Mono", monospace;
`;

const Result = ({ color }: { color: string }) => {
  return (
    <FlexColC width2="100%">
      <ColorDisplay color={color} />
      <ColorText>{color}</ColorText>
    </FlexColC>
  );
};

const HarmonyDisplay = styled(FlexRow)`
  justify-content: space-between;
  width: 100%;
`;

export const ColorHarmonyDisplay = ({ color, harmony }: { color: string; harmony: HarmonyKey }) => {
  const c = Color(color);
  const hslColor = c.hsl().array();
  const harmonies = HARMONIES[harmony](hslColor[0], hslColor[1], hslColor[2]);

  return (
    <FlexColC>
      <H2>
        <AiFillCaretDown />
      </H2>
      <HarmonyDisplay>
        {harmonies.map((harmony) => {
          const c = Color(harmony);
          return <Result key={Object.values(harmony).join(",")} color={c.hex()} />;
        })}
      </HarmonyDisplay>
    </FlexColC>
  );
};
