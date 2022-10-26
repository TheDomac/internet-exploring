import VennDiagram from "./core/VennDiagram";

const SeasonVennDiagram = () => {
  return (
    <VennDiagram
      topText="Flu"
      leftText="Year"
      rightText="Episodes"
      size="450px"
      correctionsTop={{
        top: "100px",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      correctionsLeft={{
        top: "50%",
        left: "100px",
        transform: "translate(-50%, -50%)",
      }}
      correctionsRight={{
        top: "50%",
        right: "-20px",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default SeasonVennDiagram;
