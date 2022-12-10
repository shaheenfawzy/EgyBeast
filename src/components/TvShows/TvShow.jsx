import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import $ from "jquery";
import Poster from "../Poster";
import Loading from "../Loading";

export default function TvShow({ apiConf }) {
  const { apiUrl, ytUrl, imdbUrl, tvShowEmbedBaseUrl, apiKey, imageBaseUrl } =
    apiConf;
  const navigate = useNavigate();
  let { id } = useParams();
  let [tvShow, setTvShow] = useState({});
  let [trailer, setTrailer] = useState("");
  let [imdbId, setImdbId] = useState("");

  useEffect(() => {
    getTvShow(id);
  }, []);

  useEffect(() => {
    if (Object.keys(tvShow).length !== 0) {
      axios
        .get(`${apiUrl}/tv/${id}/videos?api_key=${apiKey}`)
        .then((res) => res.data)
        .then((d) => {
          getTrailer(d);
          axios
            .get(`${apiUrl}/tv/${id}/external_ids?api_key=${apiKey}`)
            .then((r) => r.data)
            .then((d) => setImdbId(d.imdb_id));
        });
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

  function getTrailer(d) {
    let results = d.results.filter(
      (r) => r.site === "YouTube" && r.type === "Trailer"
    );
    let trailerUrl = ytUrl + results[0].key;
    setTrailer(trailerUrl);
  }

  return (
    <>
      <Loading selector={"loading"} />
      {tvShow.name && (
        <div className="row align-items-center">
          <Poster
            posterUrl={imageBaseUrl + tvShow.poster_path}
            rating={tvShow.vote_average.toFixed(1)}
            classNames={["col-4"]}
          />
          <div className="col-8 row">
            <div className="col-12 text-center">
              <h1 className="media-title">{tvShow.name}</h1>
            </div>
            <div className="col-12 row align-items-center my-3">
              <div className="col-2">
                <h3>Genres:</h3>
              </div>
              <div className="col-8">
                {tvShow.genres.map((g) => g.name).join(", ")}
              </div>
            </div>
            <div className="col-12 row align-items-center my-3">
              <div className="col-2">
                <h3>Language:</h3>
              </div>
              <div className="col-8">{tvShow.original_language}</div>
            </div>
            <div className="col-12 row align-items-center my-3">
              <div className="col-2">
                <h3>Country:</h3>
              </div>
              <div className="col-8">{tvShow.production_countries[0].name}</div>
            </div>
            <div className="col-12 row align-items-center my-3">
              <div className="col-2">
                <h3>Released:</h3>
              </div>
              <div className="col-8">{tvShow.first_air_date}</div>
            </div>
            <div className="col-12 row align-items-center my-3">
              <div className="col-2">
                <h3>Overview:</h3>
              </div>
              <div className="col-8">{tvShow.overview}</div>
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
                  href={imdbUrl + imdbId}
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
          <div className="col-12">
            <div className="row my-5">
              {tvShow.seasons
                .filter((s) => s.season_number !== 0)
                .map((s, i) => (
                  <div className="col-12 text-center" key={i}>
                    <h2>Season {s.season_number}</h2>
                    <div className="row">
                      {[...Array(s.episode_count)].map((e, i) => {
                        return (
                          <Poster
                            classNames={["col-2"]}
                            title={"Episode " + (i + 1)}
                            posterUrl={imageBaseUrl + s.poster_path}
                            key={i}
                            mediaId={i + 1}
                            clickCallBack={() =>
                              navigate(`/tv/${id}/${s.season_number}/${i + 1}`)
                            }
                            hoverable={true}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
