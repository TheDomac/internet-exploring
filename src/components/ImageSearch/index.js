import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { INTERNET_EXPLORING_URL } from "../../common/consts";
import { Container } from "../../common/components/Container.styled";
import Loading from "../../common/components/Loading.styled";
import ArrowBack from "../../common/components/ArrowBack";
import { useToggle } from "../../common/services/useToggle";

const ImageSearch = () => {
  const { imageId } = useParams();
  const loadedImage = useToggle();

  return (
    <Container>
      <Link to="/">
        <ArrowBack />
      </Link>
      {loadedImage.isOn ? (
        <p style={{ fontSize: "24px", textAlign: "center" }}>
          Use image search in your browser.
        </p>
      ) : (
        <Loading />
      )}
      <img
        style={{ display: loadedImage.isOn ? "block" : "none" }}
        onLoad={loadedImage.setOn}
        src={`${INTERNET_EXPLORING_URL}/static/media/${imageId}`}
        alt={imageId}
      />
    </Container>
  );
};

export default ImageSearch;
