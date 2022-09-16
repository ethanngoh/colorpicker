import styled from "@emotion/styled";
import { CopyBlock, monokaiSublime } from "react-code-blocks";

import { generateColors, GenerateColorsResult } from "../colorAlgo";

const ResultsContainer = styled.div`
  width: 30rem;
  gap: 2rem;
  font-size: 1rem;
  height: 30rem;
  overflow-y: auto;
  border: 1px solid gray;
`;

export const ShadeResultsExport = ({ colors }: { colors: string[] }) => {
  const colGen = colors.map((c) => {
    const gen = generateColors(c);

    const lightOut = generateTypescript(gen[0], "_LIGHT");
    const darkOut = generateTypescript(gen[1], "_DARK");

    const ret = [lightOut, darkOut].join("\n\n");
    return ret;
  });

  return (
    <ResultsContainer>
      <CopyBlock
        text={colGen.join("\n\n")}
        language={"typescript"}
        showLineNumbers={true}
        theme={monokaiSublime}
        wrapLines
      />
    </ResultsContainer>
  );
};

function generateTypescript(obj: GenerateColorsResult, suffix: string) {
  const entries = obj.colors.map((d) => {
    const key = (d.step * 100).toString();
    return [key, d.hex];
  });
  const lightJson = JSON.stringify(Object.fromEntries(entries), null, 4);
  const tsOutput = `export const ${obj.name}${suffix} = ${lightJson};`;
  return tsOutput;
}
