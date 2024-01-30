import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  font-size: 20px;
  margin: 2px;
  padding: 4px;
  width: 30px;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 3px;
  transition: 300ms;

  ${({ $isSelected }) =>
    $isSelected ? "background: rgba(255,255,255, 0.4);" : ""}

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const Button = ({ letter, handleLetterClick, isSelected, disabled }) => {
  return (
    <StyledButton
      $isSelected={isSelected}
      disabled={disabled}
      type="button"
      name={letter}
      onClick={handleLetterClick}
    >
      {letter}
    </StyledButton>
  );
};

const Keyboard = ({ handleLetterClick, letters, hash }) => {
  const lettersValues = Object.values(letters);
  return (
    <div>
      <div>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => (
          <Button
            isSelected={lettersValues.includes(letter)}
            disabled={lettersValues.includes(letter)}
            letter={letter}
            handleLetterClick={handleLetterClick}
            key={letter}
          >
            {letter}
          </Button>
        ))}
      </div>
      <div>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => (
          <Button
            isSelected={lettersValues.includes(letter)}
            disabled={lettersValues.includes(letter)}
            key={letter}
            letter={letter}
            handleLetterClick={handleLetterClick}
          >
            {letter}
          </Button>
        ))}
      </div>
      <div>
        {["Z", "X", "C", "V", "B", "N", "M", "_"].map((letter) => (
          <Button
            isSelected={lettersValues.includes(letter)}
            disabled={lettersValues.includes(letter)}
            key={letter}
            letter={letter}
            handleLetterClick={handleLetterClick}
          >
            {letter}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
