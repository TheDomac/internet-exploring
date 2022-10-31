import name from "./images/name.png";
import rebusSolvedText from "./images/rebusSolvedText.png";
import clueSolvedText from "./images/clueSolvedText.png";
import helpText from "./images/helpText.png";
import clueGroup from "./images/clueGroup.png";
import dependencies from "./images/dependencies.png";

const helpModalContents = {
  name: (
    <>
      <p>A name of the riddle group.</p>
      <img src={name} alt="name" />
    </>
  ),
  rebusSolvedText: (
    <>
      <p>Solved text is a text that is displayed on a solved riddle.</p>
      <img src={rebusSolvedText} alt="rebusSolvedText" />
    </>
  ),
  rebusSolutions: (
    <p>Here you can add all possible solutions for a particular riddle.</p>
  ),
  clueSolutions: (
    <p>Here you can add all possible solutions for a particular clue.</p>
  ),
  clueWidth: (
    <p>
      Set the width of a clue. For example, a value of 100% would take up a
      whole row.{" "}
    </p>
  ),
  clueSolvedText: (
    <>
      <p>
        Solved text for a clue is a text that is displayed on a solved clue.
      </p>
      <img src={clueSolvedText} alt="clueSolvedText" />
    </>
  ),
  helpText: (
    <>
      <p>A text shown to the user when he decides to use the help button.</p>
      <img src={helpText} alt="helpText" />
    </>
  ),
  clueGroup: (
    <>
      <p style={{ maxWidth: 500 }}>
        If clues have the same clue group, they are marked as clues that should
        be looked up together by having the same border color. Different clue
        groups mean that the user won't find what they have in common if he
        looks them up together..
      </p>
      <img src={clueGroup} alt="clueGroup" />
    </>
  ),
  clueValueWidth: (
    <p>
      Set the width of a subclue. For example, a value of 100% would take up
      a whole row of a clue.{" "}
    </p>
  ),
  dependencies: (
    <>
      <p>
        Add a dependency to a clue if you wan't it to be revealed only when that
        clue gets solved.
      </p>
      <img src={dependencies} alt="dependencies" />
    </>
  ),
};

export default helpModalContents;
