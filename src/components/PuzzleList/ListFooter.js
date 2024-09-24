import useIsWeb from "../../common/services/useIsWeb";
import { Link } from "react-router-dom";
import { TextLink } from "./index.styled";
import { REDDIT_URL } from "../../common/consts";
import styled from "styled-components";


const TextSpan = styled.span`
  color: #309d6d;
  -webkit-text-stroke: 0.5px white;
  text-decoration: none;
`;

const ListFooter = () => {
    const isWeb = useIsWeb()

    return (                       <p style={{ textAlign: "center" }}>
    Check out{" "}
    <Link style={{ textDecoration: "none" }} to="/play/workshop">
      <TextSpan>workshop</TextSpan>
    </Link>{" "}
    for more!
    <br /> You can send your suggestions and ideas to {!isWeb && "a subreddit "}
    <TextLink
      href={isWeb ? REDDIT_URL : undefined}
      target="_blank"
      rel="noreferrer"
    >
      {isWeb ? "Reddit" : "r/InternetExploring"}
    </TextLink>.
    <br />
  </p>
);
}
 
export default ListFooter;