import VennDiagram from "./core/VennDiagram";

const _1932VennDiagram = () => {
  return (
    <VennDiagram
      topText="John Galsworthy"
      leftText="Werner Heisenberg"
      rightText="Irving Langmuir"
      size="450px"
      correctionsTop={{
        top: "100px",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "150px",
      }}
      correctionsLeft={{
        top: "50%",
        left: "90px",
        transform: "translate(-50%, -50%)",
      }}
      correctionsRight={{
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        width: "150px",
      }}
    />
  );
};

export default _1932VennDiagram;
