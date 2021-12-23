import React from "react"
import truncatise from "truncatise"
import "./VideoRow.css"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { Tooltip } from "@material-ui/core"
import Moment from "react-moment"

function VideoRow({
  link,
  description,
  timestamp,
  channel,
  title,
  image,
  verified
}) {
  return (
    <div className="videoRow">
      <a href={link}>
        <img src={image} alt={title} />
      </a>
      <div className="videoRow__text">
        <a href={link}>
          <h3>{title}</h3>
        </a>

        <p className="videoRow__headline">
          {channel}{" "}
          {verified && (
            <Tooltip title="Verified" placement="top">
              <CheckCircleIcon className="videoRow__verified" />
            </Tooltip>
          )}
          {" •"}&nbsp;
          {
            <Moment interval={30000} fromNow>
              {timestamp}
            </Moment>
          }
        </p>
        <a href={link}>
          <p className="videoRow__description">
            {truncatise(description, {
              TruncateLength: 140,
              TruncateBy: "characters",
              Strict: false,
              StripHTML: true,
              Suffix: "..."
            })}
          </p>
        </a>
      </div>
    </div>
  )
}

export default VideoRow
