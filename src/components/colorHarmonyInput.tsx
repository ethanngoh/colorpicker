import styled from "@emotion/styled";
import Select, { ActionMeta, SingleValue } from "react-select";
import { HarmonyKey } from "../colorHarmonies";

import { COLORS, GRAY_RANGE } from "../colors";

const SearchFilterContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  color: #000;
`;

type SelectOption = { value: string; label: string };

export const ColorHarmonyInput = ({
  harmonies,
  harmony,
  setHarmony
}: {
  harmonies: HarmonyKey[];
  harmony: HarmonyKey;
  setHarmony: React.Dispatch<React.SetStateAction<HarmonyKey>>;
}) => {
  const options = [
    ...harmonies.map((d) => {
      return {
        value: d,
        label: d
      };
    })
  ];

  const customStyle = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: `1px solid ${GRAY_RANGE[300]}`,
      color: state.isSelected ? GRAY_RANGE[900] : GRAY_RANGE[900],
      backgroundColor: state.isSelected ? GRAY_RANGE[200] : GRAY_RANGE[100],
      padding: "0.75rem 1rem"
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: COLORS.BLUE,
      border: `1px solid ${GRAY_RANGE[200]}`
    }),
    menuList: (provided: any, state: any) => ({
      ...provided,
      padding: 0,
      border: `1px solid ${GRAY_RANGE[300]}`
    }),
    valueContainer: (provided: any, state: any) => ({
      ...provided,
      padding: "0.25rem 1rem"
    })
  };

  return (
    <SearchFilterContainer>
      <Select
        name="filters"
        options={options}
        className="select"
        classNamePrefix="select"
        styles={customStyle}
        value={{ label: harmony, value: harmony }}
        onChange={(newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => {
          setHarmony(newValue?.value as HarmonyKey);
        }}
      />
    </SearchFilterContainer>
  );
};
