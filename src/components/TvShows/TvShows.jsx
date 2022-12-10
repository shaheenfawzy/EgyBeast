import React, { useEffect, useState } from "react";
import $ from "jquery";
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Poster from "../Poster";

export default function TvShows({ apiConf, getTrending }) {
  const { imageBaseUrl } = apiConf;
  const navigate = useNavigate();

  let [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const loading = $("#loading");
    getTrending("tv", "week", 1, false).then((d) => {
      setTvShows(d);
      loading.fadeOut(1000);
    });
  }, []);

  function changePage(page) {
    const loading = $("#loading-page");
    loading.fadeIn(0);
    getTrending("tv", "week", page.selected + 1, false).then((d) => {
      setTvShows(d);
      loading.fadeOut();
    });
  }

  return (
    <>
      <Loading selector="loading" />

      {tvShows.results && (
        <>
          <div className="row justify-content-center position-relative">
            <Loading selector="loading-page" hidden={true} />
            {tvShows.results.splice(0, 18).map((show, i) => {
              return (
                <Poster
                  classNames={["col-2"]}
                  title={show.name}
                  posterUrl={imageBaseUrl + show.poster_path}
                  key={i}
                  mediaId={show.id}
                  clickCallBack={(id) => navigate("/tv/" + id)}
                  rating={show.vote_average.toFixed(1)}
                  hoverable={true}
                />
              );
            })}
          </div>
          <Pagination callBack={changePage} />
        </>
      )}
    </>
  );
}
