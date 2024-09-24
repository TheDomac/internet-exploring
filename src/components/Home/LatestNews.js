import { useEffect, useState } from "react";
import { logEvent } from "firebase/analytics";

import { ScrollDiv } from "./index.styled";
import { analytics } from "../../common/firebase";

const LatestNews = () => {
    const [latestNews, setLatestNews] = useState({ status: "loading", data: null });

    const fetchLatestNews = async () => {
        try {
          const file = await fetch("../../../latestNews.json", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          const newLatestNews = await file.json();
          setLatestNews({ status: "success", data: newLatestNews.latestNews });
        } catch (err) {
          console.log(err);
          setLatestNews({ status: "error", data: null });
        }
      };
    
      useEffect(() => {
        logEvent(analytics, "latest_news_modal_shown");

        fetchLatestNews();
      }, []);
    
  return (
    <ScrollDiv>
      {latestNews.status === "loading" && <p>Loading...</p>}
        {latestNews.status === "error" && <p>Sorry, something went wrong while fetching latest news.</p>}
        {latestNews.status === "success" && latestNews.data.map((news, index) => (
            <div key={news.title}>
                <h3 style={{marginBottom: 5}}>{news.title}</h3>
                <p style={{ marginTop: 5}}>{news.content}</p>

                {index !== latestNews.data.length - 1 && <hr style={{margin: "10px 0"}} />}
                </div>
        ))}
    </ScrollDiv>
  );
};

export default LatestNews;
