import { Avatar, Tooltip } from "@material-ui/core";
import React from "react";
import "./ChannelRow.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

function ChannelRow({
  image,
  channel,
  subs,
  noOfVideos,
  description,
  verified,
  link,
}) {
  return (
    <div className="channelRow">
      <a href={link}>
        <Avatar src={image} alt={channel} className="channelRow__logo" />
      </a>

      <div className="channelRow__text">
        <a href={link}>
          <h4>
            {channel}{" "}
            {verified && (
              <Tooltip title="Verified" placement="top">
                <CheckCircleIcon className="channelRow__verified" />
              </Tooltip>
            )}
          </h4>
        </a>
        <p>
          {subs} subscribers • {noOfVideos} videos
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ChannelRow;
