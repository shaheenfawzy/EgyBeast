import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import Loading from "../Loading";

export default function Episode({ apiConf }) {
  const { apiUrl, ytUrl, imdbUrl, episodeEmbedBaseUrl, apiKey, imageBaseUrl } =
    apiConf;
  let { id, season, episode } = useParams();
  let [tvShow, setTvShow] = useState({});
  let [episodUrl, setEpisodeUrl] = useState("");

  useEffect(() => {
    getTvShow(id);
  }, []);

  useEffect(() => {
    if (Object.keys(tvShow).length !== 0) {
      const url = `${episodeEmbedBaseUrl}?id=${id}&s=${season}&e=${episode}`;
      setEpisodeUrl(url);
    }
  }, [tvShow]);

  function getTvShow() {
    const loading = $("#loading");
    axios
      .get(`${apiUrl}/tv/${id}?api_key=${apiKey}&language=en-US`)
      .then((response) => response.data)
      .then((d) => {
        setTvShow(d);
        loading.fadeOut(1000);
      });
  }

  return (
    <>
      <Loading selector={"loading"} />
      {episodUrl && (
        <div className="row align-items-center text-center">
          <h1>
            Watching {tvShow.original_name} Season {season} episode {episode}
          </h1>
          <div className="row col-12 media-watch vh-100 py-5">
            <iframe src={episodUrl} allowFullScreen={true}></iframe>
          </div>
        </div>
      )}
    </>
  );
}
