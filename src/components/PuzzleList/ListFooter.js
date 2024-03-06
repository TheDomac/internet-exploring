import useIsWeb from "../../common/services/useIsWeb";
import { Link } from "react-router-dom";
import { TextLink } from "./index.styled";
import { REDDIT_URL } from "../../common/consts";

const ListFooter = () => {
    const isWeb = useIsWeb()

    return (                       <p style={{ textAlign: "center" }}>
    Check out{" "}
    <Link style={{ textDecoration: "none" }} to="/play/workshop">
      <TextLink>workshop</TextLink>
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