import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { Container } from "../../common/components/Container.styled";
import Loading from "../../common/components/Loading.styled";
import ArrowBack from "../../common/components/ArrowBack";
import { useToggle } from "../../common/services/useToggle";
import Alert from "../../common/components/Alert.styled";

const ImageSearch = () => {
  const { imageId } = useParams();
  const loading = useToggle(true);
  const error = useToggle();

  return (
    <Container>
      <Link to="/">
        <ArrowBack />
      </Link>
        
      <p style={{ fontSize: "24px", textAlign: "center" }}>
          Use image search in your browser.
        </p>
        {error.isOn && <Alert>Sorry, something went wrong.</Alert>}
      {loading.isOn && <Loading />}
      <img
        style={{ display: loading.isOn || error.isOn ? "none" : "block" }}
        onLoad={loading.setOff}
        onError={error.setOn}
        src={decodeURIComponent(imageId)}
        alt={imageId}
      />
    </Container>
  );
};

export default ImageSearch;
