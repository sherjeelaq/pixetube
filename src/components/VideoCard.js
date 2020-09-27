import { Avatar } from "@material-ui/core";
import React from "react";
import "./VideoCard.css";
import truncatise from "truncatise";
import Moment from "react-moment";

function VideoCard({
  link,
  image,
  title,
  channel,
  views,
  timestamp,
  channelImage,
}) {
  return (
    <div className="videoCard">
      <div className="videoCard__thumbnail"></div>
      <a href={link}>
        <img src={image} alt={title} className="videoCard__thumbnail" />
      </a>
      <div className="videoCard__info">
        <Avatar
          className="videoCard__avatar"
          alt={channel}
          src={channelImage}
        />
        <a href={link}>
          <div className="videoCard__text">
            <h4>
              {truncatise(title, {
                TruncateLength: 50,
                TruncateBy: "characters",
                Strict: false,
                StripHTML: true,
                Suffix: "...",
              })}
            </h4>
            <p>{channel}</p>
            <p>
              {views} • <Moment interval={30000} fromNow value={timestamp} />
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default VideoCard;
