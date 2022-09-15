import styled from "@emotion/styled";
import { KeyboardEventHandler, useState } from "react";
import { ActionMeta, OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";

import { getContrastTextColor } from "../colorConvert";
import { COLORS, GRAY_RANGE } from "../colors";
import { SelectOption } from "./selectBase";

const SearchFilterContainer = styled.div`
  min-width: 20rem;
  margin-bottom: 2rem;
  color: #000;
`;

const components = {
  DropdownIndicator: null
};

function hexIsValid(hex: string) {
  return /^#?([0-9A-F]{3}){1,2}$/i.test(hex);
}

export const MultiColorInput = ({
  placeholder,
  input,
  setInput
}: {
  placeholder?: string;
  input: any;
  setInput: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [inputValue, setInputValue] = useState("");

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
    }),
    multiValue: (provided: any, state: any) => {
      const colorHex = state.data.value;
      return {
        ...provided,
        backgroundColor: colorHex,
        fontSize: "1.175rem"
      };
    },
    multiValueLabel: (provided: any, state: any) => {
      const textColor = getContrastTextColor(state.data.value);
      return {
        ...provided,
        color: textColor
      };
    },
    multiValueRemove: (provided: any, state: any) => {
      const colorHex = state.data.value;
      const textColor = getContrastTextColor(state.data.value);
      return {
        ...provided,
        color: textColor,
        ":hover": {
          backgroundColor: colorHex,
          color: textColor
        }
      };
    },
    placeholder: (provided: any, state: any) => ({
      ...provided,
      fontSize: "1rem"
    }),
    input: (provided: any, state: any) => ({
      ...provided,
      fontSize: "1rem"
    })
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        event.preventDefault();

        var valWithHex = inputValue.startsWith("#") ? inputValue.slice(1) : inputValue;
        if (valWithHex.length === 3) {
          valWithHex = valWithHex[0] + valWithHex[0] + valWithHex[1] + valWithHex[1] + valWithHex[2] + valWithHex[2];
        }

        if (!hexIsValid(valWithHex)) {
          setInputValue("");
          console.log(`${input} must be valid hex code`);
          return;
        }

        const val = [
          ...input,
          {
            label: `#${valWithHex}`,
            value: `#${valWithHex}`
          }
        ];
        setInput(val);
        setInputValue("");
        console.log(`Added #${valWithHex}`);
    }
  };

  return (
    <SearchFilterContainer>
      <CreatableSelect
        components={components}
        isClearable
        isMulti
        menuIsOpen={false}
        onKeyDown={handleKeyDown}
        onInputChange={(inputValue: string) => setInputValue(inputValue)}
        onChange={(value: OnChangeValue<SelectOption, true>, actionMeta: ActionMeta<SelectOption>) => {
          setInput(value);
        }}
        styles={customStyle}
        placeholder={placeholder}
        value={input}
        inputValue={inputValue}
      />
    </SearchFilterContainer>
  );
};
