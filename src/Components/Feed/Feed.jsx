import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Added missing import
import "./Feed.css";
import { API_KEY, value_convertor } from "../../Data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(videoListUrl);
      const result = await response.json();
      setData(result.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.length > 0 ? (
        data.map((item, index) => (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="card" key={item.id || index}>
            <img
              src={item.snippet?.thumbnails?.medium?.url || "placeholder.png"}
              alt={item.snippet?.title || "Video Thumbnail"}
            />
            <h2>{item.snippet?.title || "Video Title"}</h2>
            <h3>{item.snippet?.channelTitle || "Channel Name"}</h3>
            <p>
              {value_convertor(item.statistics?.viewCount || "0")} views &bull;
              {moment(item.snippet.publishedAt).fromNow()}
              
            </p>
          </Link>
        ))
      ) : (
        <p>Loading videos...</p>
      )}
    </div>
  );
};

export default Feed;
