import styled from "@emotion/styled";

const SearchFilterContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  color: #000;
`;

export const NameInput = ({
  placeholder,
  setName
}: {
  placeholder?: string;
  setName: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <SearchFilterContainer>
      <input
        placeholder={placeholder}
        onChange={(e) => {
          setName(e.target.value);
          e.preventDefault();
        }}
      />
    </SearchFilterContainer>
  );
};
