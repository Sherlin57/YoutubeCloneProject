import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_convertor } from "../../Data";
import moment from "moment";

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    try {
      const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetailsUrl);
      const data = await response.json();
      setApiData(data.items?.[0] || null);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  const fetchOtherData = async () => {
    if (!apiData) return;

    try {
      const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const response = await fetch(channelDataUrl);
      const data = await response.json();
      setChannelData(data.items?.[0] || null);

      const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY}`;
      const commentResponse = await fetch(commentUrl);
      const commentData = await commentResponse.json();
      setCommentData(commentData.items || []);
    } catch (error) {
      console.error("Error fetching other data:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="YouTube Video"
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>

      <div className="play-video-info">
        <p>
          {apiData ? value_convertor(apiData.statistics.viewCount) : "16K"} views &bull;{" "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="Like" />
            {apiData ? value_convertor(apiData.statistics.likeCount) : "155"}
          </span>
          <span>
            <img src={dislike} alt="Dislike" />
          </span>
          <span>
            <img src={share} alt="Share" />
            Share
          </span>
          <span>
            <img src={save} alt="Save" />
            Save
          </span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : user_profile}
          alt="Channel Thumbnail"
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Channel Name"}</p>
          <span>
            {channelData ? value_convertor(channelData.statistics.subscriberCount) : ""} Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
        <hr />
        <h4>
          {apiData ? value_convertor(apiData.statistics.commentCount) : "102"} Comments
        </h4>
        {commentData.length > 0 ? (
          commentData.map((item, index) => (
            <div key={index} className="comment">
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl || user_profile}
                alt="User"
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                  <span>
                    {moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}
                  </span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                <div className="comment-action">
                  <img src={like} alt="Like" />
                  <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                  <img src={dislike} alt="Dislike" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default PlayVideo;
