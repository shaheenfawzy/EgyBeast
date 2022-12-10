import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home";
import Master from "../layouts/Master";
import Movies from "./Movies";
import TvShows from "./TvShows/TvShows";
import People from "./People";
import Movie from "./Movie";
import TvShow from "./TvShows/TvShow";
import Episode from "./TvShows/Episode";
export default function App() {
  const apiConf = {
    apiKey: "85726f5cfde720843d09f98dbc248012",
    apiUrl: "https://api.themoviedb.org/3",
    ytUrl: "https://www.youtube.com/watch?v=",
    movieEmbedBaseUrl: "https://www.2embed.to/embed/tmdb/movie?id=",
    episodeEmbedBaseUrl: " https://www.2embed.to/embed/tmdb/tv",
    imdbUrl: "https://www.imdb.com/title/",
    imageBaseUrl: "https://image.tmdb.org/t/p/w500",
  };

  function getTrending(type, duration, page, results = true) {
    let url = `${apiConf.apiUrl}/trending/${type}/${duration}?page=${page}&api_key=${apiConf.apiKey}`;
    return axios.get(url).then((response) => response.data);
  }

  const router = createHashRouter([
    {
      path: "/",
      element: <Master />,
      children: [
        {
          path: "",
          element: <Home apiConf={apiConf} getTrending={getTrending} />,
        },
        {
          path: "movies",
          children: [
            {
              path: "",
              element: <Movies apiConf={apiConf} getTrending={getTrending} />,
            },
            {
              path: ":id",
              element: <Movie apiConf={apiConf} getTrending={getTrending} />,
            },
          ],
        },
        {
          path: "tv",
          children: [
            {
              path: "",
              element: <TvShows apiConf={apiConf} getTrending={getTrending} />,
            },
            {
              path: ":id",
              children: [
                {
                  path: "",
                  children: [
                    {
                      path: "",
                      element: (
                        <TvShow apiConf={apiConf} getTrending={getTrending} />
                      ),
                    },
                  ],
                },
                {
                  path: ":season/:episode",
                  children: [
                    {
                      path: "",
                      element: <Episode apiConf={apiConf} />,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: "people",
          element: <People apiConf={apiConf} getTrending={getTrending} />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
