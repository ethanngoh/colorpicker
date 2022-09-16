import styled from "@emotion/styled";
import { useState } from "react";
import { CopyBlock, monokaiSublime } from "react-code-blocks";

import { generateColors, GenerateColorsResult } from "../colorAlgo";
import { FlexCol } from "../stylePrimitives";
import { SingleValueInput } from "./singleValueInput";

const ResultsContainer = styled(FlexCol)`
  width: 30rem;
  gap: 2rem;
  font-size: 1rem;
  height: 30rem;
  overflow-y: auto;
  align-items: center;
`;

export enum SupportedLanguageKey {
  typescript = "typescript",
  json = "json"
}

const LANGUAGE_TO_CODE_GENERATOR: {
  [key in SupportedLanguageKey]: (obj: GenerateColorsResult, suffix: string) => string;
} = {
  typescript: generateTypescript,
  json: generateJson
};

export const ShadeResultsExport = ({ colors }: { colors: string[] }) => {
  const [language, setLanguage] = useState(SupportedLanguageKey.typescript);

  const colGen = colors.map((c) => {
    const gen = generateColors(c);

    const codeGenFunc = LANGUAGE_TO_CODE_GENERATOR[language];
    const lightOut = codeGenFunc(gen[0], "_LIGHT");
    const darkOut = codeGenFunc(gen[1], "_DARK");

    const ret = [lightOut, darkOut].join("\n\n");
    return ret;
  });

  return (
    <ResultsContainer>
      <span>{language}</span>
      <SingleValueInput
        selections={Object.values(SupportedLanguageKey)}
        currentValue={language}
        setCurrentValue={setLanguage}
      />
      <CopyBlock
        text={colGen.join("\n\n")}
        language={language}
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

function generateJson(obj: GenerateColorsResult, suffix: string) {
  const entries = obj.colors.map((d) => {
    const key = (d.step * 100).toString();
    return [key, d.hex];
  });
  const lightJson = JSON.stringify(Object.fromEntries(entries), null, 4);
  const tsOutput = `export const ${obj.name}${suffix} = ${lightJson};`;
  return tsOutput;
}
