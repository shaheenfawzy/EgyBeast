import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import Loading from "./Loading";
import Poster from "./Poster";

export default function Movie({ apiConf }) {
  const { apiUrl, ytUrl, imdbUrl, movieEmbedBaseUrl, apiKey, imageBaseUrl } =
    apiConf;
  let { id } = useParams();
  let [movie, setMovie] = useState({});
  let [movieUrl, setMovieUrl] = useState("");
  let [trailer, setTrailer] = useState("");

  useEffect(() => {
    getMovie(id);
  }, []);

  useEffect(() => {
    if (Object.keys(movie).length !== 0) {
      axios
        .get(`${apiUrl}/movie/${id}/videos?api_key=${apiKey}`)
        .then((res) => res.data)
        .then((d) => {
          getTrailer(d);
          setMovieUrl(movieEmbedBaseUrl + id);
        });
    }
  }, [movie]);

  function getMovie() {
    const loading = $("#loading");
    axios
      .get(`${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`)
      .then((response) => response.data)
      .then((d) => {
        setMovie(d);
        loading.fadeOut(1000);
      });
  }

  function getTrailer(d) {
    let results = d.results.filter(
      (r) =>
        r.site === "YouTube" && (r.type === "Trailer" || r.type === "Teaser")
    );
    console.log(results);

    let trailerUrl = ytUrl + results[0].key;
    setTrailer(trailerUrl);
  }

  return (
    <>
      <Loading selector={"loading"} />
      {movie.original_title && (
        <div className="row align-items-center">
          <Poster
            posterUrl={imageBaseUrl + movie.poster_path}
            rating={movie.vote_average.toFixed(1)}
            classNames={["col-4"]}
          />
          <div className="col-8 row">
            <div className="col-12 text-center">
              <h1 className="media-title">{movie.original_title}</h1>
            </div>
            <div className="col-12 row align-items-center my-3">
              <div className="col-2">
                <h3>Genres:</h3>
              </div>
              <div className="col-8">
                {movie.genres.map((g) => g.name).join(", ")}
              </div>
            </div>
            <div className="col-12 row align-items-center my-3">
              <div className="col-2">
                <h3>Language:</h3>
              </div>
              <div className="col-8">{movie.original_language}</div>
            </div>
            <div className="col-12 row align-items-center my-3">
              <div className="col-2">
                <h3>Country:</h3>
              </div>
              <div className="col-8">{movie.production_countries[0].name}</div>
            </div>
            <div className="col-12 row align-items-center my-3">
              <div className="col-2">
                <h3>Released:</h3>
              </div>
              <div className="col-8">{movie.release_date}</div>
            </div>
            <div className="col-12 row align-items-center my-3">
              <div className="col-2">
                <h3>Overview:</h3>
              </div>
              <div className="col-8">{movie.overview}</div>
            </div>
            <div className="col-12 row justify-content-center mt-5 pt-5">
              <div className="col-4 text-start">
                <a
                  href={trailer}
                  className="text-white text-decoration-none"
                  target={"_blank"}
                >
                  <i className="fa-brands fa-youtube fa-2x float-start me-3"></i>
                  <h3 className="float-start">Watch trialer</h3>
                  <div className="clearfix"></div>
                </a>
              </div>
              <div className="col-4 text-start">
                <a
                  href={imdbUrl + movie.imdb_id}
                  className="text-white text-decoration-none"
                  target={"_blank"}
                >
                  <i className="fa-brands fa-imdb fa-2x float-start me-3"></i>
                  <h3 className="float-start">View on IMDB</h3>
                  <div className="clearfix"></div>
                </a>
              </div>
            </div>
          </div>
          <div className="media-watch-title text-center mt-5">
            <h1>Watch now</h1>
          </div>
          <div className="row col-12 media-watch vh-100 py-5">
            <iframe src={movieUrl} allowFullScreen={true}></iframe>
          </div>
        </div>
      )}
    </>
  );
}
