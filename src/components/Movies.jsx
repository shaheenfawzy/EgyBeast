import React, { useEffect, useState } from "react";
import $ from "jquery";
import Pagination from "./Pagination";
import Poster from "./Poster";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export default function Movies({ apiConf, getTrending }) {
  const { imageBaseUrl } = apiConf;
  const navigate = useNavigate();

  let [movies, setMovies] = useState([]);

  useEffect(() => {
    const loading = $("#loading");
    getTrending("movie", "week", 1, false).then((d) => {
      setMovies(d);
      loading.fadeOut(1000);
    });
  }, []);

  function changePage(page) {
    const loading = $("#loading-page");
    loading.fadeIn(0);
    getTrending("movie", "week", page.selected + 1, false).then((d) => {
      setMovies(d);
      loading.fadeOut();
    });
  }

  return (
    <>
      <Loading selector="loading" />
      {movies.results && (
        <>
          <div className="row justify-content-center movies position-relative">
            <Loading selector="loading-page" hidden={true} />
            {movies.results.slice(0, 18).map((movie, i) => {
              return (
                <Poster
                  classNames={["col-2"]}
                  title={movie.title}
                  posterUrl={imageBaseUrl + movie.poster_path}
                  key={i}
                  rating={movie.vote_average.toFixed(1)}
                  mediaId={movie.id}
                  clickCallBack={(id) => navigate("/movies/" + id)}
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
