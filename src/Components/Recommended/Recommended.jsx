
import "./Recommended.css"

import { useEffect, useState } from "react"
import { API_KEY, value_convertor } from "../../Data"
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Recommended = ({categoryId}) => {

    const[apiData,setApiData]=useState([]);

    const fetchData =async ()=>{

        const relatedVideo_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(relatedVideo_url).then(res=>res.json()).then(data=>setApiData(data.items))
    }
    useEffect(()=>{
        fetchData();
    },[])

  return (
    <div className="recommended">
        {apiData && apiData.length > 0 ? (
            apiData.map((items, index) => (
            <Link to={`/video/${items.snippet.categoryId}/${items.id}`} className="side-video-list" key={ index}>
                <img
                src={items.snippet?.thumbnails?.medium?.url || "placeholder.png"}
                alt={items.snippet?.title || "Thumbnail"}
                />
                <div className="vid-info">
                    <h4>{items.snippet?.title || "Video Title"}</h4>
                    <p>{items.snippet?.channelTitle || "Channel Name"}</p>
                    <p>
                    {value_convertor(items.statistics.viewCount)} Views
                    </p>
                </div>
            </Link>
        ))
  ) : (
    <p>Loading recommended videos...</p>
  )}
</div>

  )
}

export default Recommended
