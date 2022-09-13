import styled from "@emotion/styled";
import { generateColors, GenerateColorsResult } from "../colorAlgo";
import { FlexCol, H1, H2 } from "../stylePrimitives";

const ResultsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
`;

export const ColorResultsExport = ({ colors }: { colors: string[] }) => {
  const colGen = colors.map((c) => {
    const gen = generateColors(c);
    const lightOut = generateTypescript(gen[0], "_LIGHT");
    const darkOut = generateTypescript(gen[1], "_DARK");

    const ret = "\n".concat(lightOut, darkOut);
    return ret;
  });

  return <ResultsContainer>{colGen}</ResultsContainer>;
};

function generateTypescript(obj: GenerateColorsResult, suffix: string) {
  const entries = obj.colors.map((d) => {
    const key = (d.step * 100).toString();
    return [key, d.hex];
  });
  const lightJson = JSON.stringify(Object.fromEntries(entries), null, 2);
  const tsOutput = `${obj.name}${suffix} = ${lightJson};`;
  return tsOutput;
}
