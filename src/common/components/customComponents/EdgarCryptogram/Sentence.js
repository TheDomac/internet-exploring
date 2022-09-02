import styled from "styled-components";

const SentenceWrapper = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  width: 50%;
  max-width: 50%;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-bottom: 30px;
`;
const WordWrapper = styled.div`
  display: flex;
  margin-right: 15px;
`;

const SentenceItem = styled.div`
  margin-bottom: 10px;
  transition: 300ms;
  cursor: pointer;
  padding: 3px;
  width: 20px;
  border-radius: 3px;
  user-select: none;
  background: ${({ $isSelected }) =>
    $isSelected ? "rgba(255,255,255,0.4)" : "none"};
`;

const Sentence = ({
  solutionAsWords,
  handleLetterSelect,
  letters,
  selectedHashedLetter,
  hash,
}) => {
  return (
    <SentenceWrapper>
      {solutionAsWords.map((word, i) => (
        <WordWrapper key={i}>
          {word.map((symbol, j) => (
            <SentenceItem
              onClick={handleLetterSelect(hash[symbol])}
              key={`${i}-${j}`}
              $isSelected={selectedHashedLetter === hash[symbol]}
            >
              <div style={{ color: "#AAA" }}>
                {hash[symbol] ? letters[hash[symbol]] || <>&nbsp;</> : symbol}
              </div>
              <hr style={{ margin: "3px 0 3px 0" }} />
              <div>{hash[symbol] || symbol}</div>
            </SentenceItem>
          ))}
        </WordWrapper>
      ))}
    </SentenceWrapper>
  );
};
export default Sentence;
