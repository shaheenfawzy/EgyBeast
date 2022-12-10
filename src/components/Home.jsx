import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import Poster from "./Poster";
import Loading from "./Loading";

export default function Home({ apiConf, getTrending }) {
  const { imageBaseUrl } = apiConf;
  const navigate = useNavigate();

  let [trendingMovies, setTrendingMovies] = useState([]);
  let [trendingTvShows, setTrendingTvShows] = useState([]);

  useEffect(() => {
    const loading = $("#loading");
    getTrending("movie", "day", 1).then((d) => {
      setTrendingMovies(d.results);
      loading.fadeOut(700);
    });
    getTrending("tv", "day", 1).then((d) => {
      setTrendingTvShows(d.results);
    });
  }, []);

  return (
    <>
      <Loading selector="loading" />
      {/* Trending movies */}
      <div className="row align-items-center">
        <div className="col-4 trending-title">
          <h3 className="h1">
            Trending <br />
            movies <br />
            to Watch now
          </h3>
          <p className="alt-font-color mt-3">Most watched movies by days</p>
        </div>
        <div className="col-8">
          <div className="row">
            {trendingMovies.slice(0, 4).map((movie, i) => {
              return (
                <Poster
                  classNames={["col-3"]}
                  title={movie.title}
                  posterUrl={imageBaseUrl + movie.poster_path}
                  key={i}
                  mediaId={movie.id}
                  clickCallBack={(id) => navigate("/movies/" + id)}
                  hoverable={true}
                  rating={movie.vote_average.toFixed(1)}
                />
              );
            })}
          </div>
        </div>
        <div className="row g-0">
          {trendingMovies.slice(4, 10).map((movie, i) => {
            return (
              <Poster
                classNames={["col-2"]}
                title={movie.title}
                posterUrl={imageBaseUrl + movie.poster_path}
                key={i}
                mediaId={movie.id}
                clickCallBack={(id) => navigate("/movies/" + id)}
                hoverable={true}
                rating={movie.vote_average.toFixed(1)}
              />
            );
          })}
        </div>
      </div>

      {/* Trending Tv shows */}
      <div className="row align-items-center">
        <div className="col-4 trending-title">
          <h3 className="h1">
            Trending <br />
            Tv shows <br />
            to Watch now
          </h3>
          <p className="alt-font-color mt-3">Most watched Tv shows by days</p>
        </div>
        <div className="col-8">
          <div className="row">
            {trendingTvShows.slice(0, 4).map((show, i) => {
              return (
                <Poster
                  classNames={["col-3"]}
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
        </div>
        <div className="row g-0 m-auto">
          {trendingTvShows.slice(4, 10).map((show, i) => {
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
      </div>
    </>
  );
}
