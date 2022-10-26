import VennDiagram from "./core/VennDiagram";

const ElectricVennDiagram = () => {
  return (
    <VennDiagram
      topText="Guitar"
      leftText="Car"
      rightText="Toothbrush"
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
        right: "-58px",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default ElectricVennDiagram;
