import styled from "@emotion/styled";
import React from "react";

import { GRAY_RANGE } from "../colors";
import { NavBrand } from "./navbrand";

const NavFixedPositon = styled.div`
  position: fixed;
  width: 100%;
  // max-width: 1440px;
  top: 0;
  z-index: 1000;
`;
const NavContainer = styled.nav`
  background-color: ${GRAY_RANGE[900]};
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const NavLeft = styled.nav`
  display: flex;
`;

const NavRight = styled.nav`
  display: flex;
`;

const Nav = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => {
  return (
    <NavFixedPositon>
      <NavContainer>
        <NavLeft>{left}</NavLeft>
        <NavRight>{right}</NavRight>
      </NavContainer>
    </NavFixedPositon>
  );
};

export const Navigation = () => {
  return <Nav left={<NavBrand />} right={<></>} />;
};
