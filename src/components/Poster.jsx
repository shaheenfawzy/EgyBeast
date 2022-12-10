import React from "react";

export default function Poster({
  title,
  posterUrl,
  classNames,
  mediaId,
  clickCallBack,
  hoverable,
  rating = null,
}) {
  return (
    <div
      className={"text-center p-2 " + classNames.join(" ")}
      onClick={() => clickCallBack(mediaId)}
    >
      <div
        className={`poster-container position-relative ${
          !hoverable ? "no-hover" : ""
        }`}
      >
        <img src={posterUrl} className="poster-img w-100" />
        <div className="play-btn position-absolute  top-50 start-50 translate-middle opacity-0">
          <i className="fa fa-play-circle fa-4x"></i>
        </div>
        {rating && (
          <span className="rating-star fa-stack fa-xl">
            <i className="fa fa-star fa-stack-2x"></i>
            <span className="rating fa-stack-1x">{rating}</span>
          </span>
        )}
      </div>
      <h6 className="mt-2">{title}</h6>
    </div>
  );
}
