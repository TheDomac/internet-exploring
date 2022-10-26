import VennDiagram from "./core/VennDiagram";

const MiddleVennDiagram = () => {
  return (
    <VennDiagram
      topText="School"
      leftText="Earth"
      rightText="East"
      size="300px"
      fontSize="16px"
      correctionsTop={{
        top: "70px",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100px",
      }}
      correctionsLeft={{
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        width: "100px",
      }}
      correctionsRight={{
        top: "50%",
        right: "10px",
        width: "100px",
        transform: "translateY(-50%)",
      }}
    />
  );
};

export default MiddleVennDiagram;
