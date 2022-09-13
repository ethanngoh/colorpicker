import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { MultiValue } from "react-select";

import { GRAY_RANGE } from "../colors";
import { Input, SelectOption } from "../components/input";
import { Navigation } from "../components/navbar";
import { useBackgroundColor } from "../hooks/useBackgroundColor";
import { useTextColor } from "../hooks/useTextColor";
import { H1 } from "../stylePrimitives";
import { Results } from "./Results";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  padding-top: 80px;
`;

const Frame = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const Button = styled.button`
  margin: 1rem;

  &:hover {
    border: 1px solid black;
  }
`;

export const Index = () => {
  useBackgroundColor(GRAY_RANGE[900]);
  useTextColor(GRAY_RANGE[0]);

  const [colors, setColors] = useState<MultiValue<SelectOption>>([]);

  return (
    <>
      <Navigation />
      <Content>
        <Frame>
          <H1 style={{ textAlign: "center" }}>Color Picker</H1>
          <Input placeholder={"Type Hex Colors"} setInput={setColors} />
          {colors && <Results colors={colors.map((c) => c.value)} />}
        </Frame>
      </Content>
    </>
  );
};
