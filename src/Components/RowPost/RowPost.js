import React, { useEffect, useState } from "react";
import "./RowPost.css";
import { imageUrl, API_KEY } from "../../Constants/Constants";
import axios from "../../axios";
import YouTube from "react-youtube";

export default function RowPost(props) {
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const [movie, setMovie] = useState([]);

  const [urlId, seturlId] = useState('')

  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovie(response.data.results);
    });
  });

  const handleMovie = (id) => {
    console.log(id);
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.results.length!==0){
        seturlId(response.data.results[0])
      }else{
        console.log('Array empty')
      }
    })

  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movie.map((obj) => (
          <img
            key={obj.id}
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? "smallPoster" : "poster"}
            src={`${imageUrl + obj.poster_path}`}
            alt="poster"
          />
        ))}
      </div>
      {urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  );
}
