import { useEffect } from "react";
import { logEvent } from "firebase/analytics";

import latestNews from "../../common//latestNews";
import { ScrollDiv } from "./index.styled";
import { analytics } from "../../common/firebase";

const LatestNews = () => {
  useEffect(() => {
    logEvent(analytics, "latest_news_modal_shown");
  }, []);

  return (
    <ScrollDiv>
      {latestNews.map((news, index) => {
        return (
          <div key={news.title}>
            <h3 style={{ marginBottom: 5 }}>{news.title}</h3>
            <p style={{ marginTop: 5 }}>{news.content}</p>

            {index !== latestNews.length - 1 && (
              <hr style={{ margin: "10px 0" }} />
            )}
          </div>
        );
      })}
    </ScrollDiv>
  );
};

export default LatestNews;
