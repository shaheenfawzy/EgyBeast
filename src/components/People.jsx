import React, { useEffect, useState } from "react";
import $ from "jquery";
import Pagination from "./Pagination";
import Loading from "./Loading";
import avatar from "../images/male-avatar.png";

export default function People({ apiConf, getTrending }) {
  const { imageBaseUrl } = apiConf;

  let [people, setPeople] = useState([]);

  useEffect(() => {
    const loading = $("#loading");
    getTrending("person", "week", 1, false).then((d) => {
      setPeople(d);
      loading.fadeOut(1000);
    });
  }, []);

  function changePage(page) {
    const loading = $("#loading-page");
    loading.fadeIn(0);
    getTrending("person", "week", page.selected + 1, false).then((d) => {
      setPeople(d);
      loading.fadeOut();
    });
  }

  return (
    <>
      <Loading selector="loading" />
      {people.results && (
        <>
          <div className="row justify-content-center peoples position-relative">
            <Loading selector="loading-page" hidden={true} />
            {people.results.slice(0, 18).map((person, i) => {
              return (
                <div className="text-center col-2 p-2">
                  <div className="poster-container position-relative no-hover">
                    <img
                      src={
                        person.profile_path
                          ? imageBaseUrl + person.profile_path
                          : avatar
                      }
                      className="poster-img w-100"
                    />
                    <div className="play-btn position-absolute  top-50 start-50 translate-middle opacity-0">
                      <i className="fa fa-play-circle fa-4x"></i>
                    </div>
                  </div>
                  <h5 className="mt-2">{person.name}</h5>
                </div>
              );
            })}
          </div>
          <Pagination callBack={changePage} />
        </>
      )}
    </>
  );
}
