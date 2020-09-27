import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import ChannelRow from "./ChannelRow";
import VideoRow from "./VideoRow";
import { withRouter } from "react-router-dom";
import sr from "../response";
import requests from "../requests";
import millify from "millify";

function SearchPage({ match }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchQuery = async () => {
      fetch(requests.fetchSearch(match.params.searchTerm))
        .then((response) => response.json())
        .then((data) => {
          const entries = Object.entries(data.items);
          setData(entries);
        })
        .catch((error) => {
          console.error("Error:", error);
          const entries = Object.entries(sr.items);
          setData(entries);
        });
    };
    fetchQuery();
  }, [match.params.searchTerm]);

  return (
    <div className="searchPage">
      <div className="searchPage__filter">
        <TuneOutlinedIcon />
        <h2>FILTER</h2>
      </div>
      <hr />

      {data?.map((item) =>
        item[1].id.kind === "youtube#channel" ? (
          <>
            <ChannelRow
              link={`https://www.youtube.com/channel/${item[1].id.channelId}`}
              image={item[1].snippet.thumbnails.default.url}
              channel={item[1].snippet.title}
              noOfVideos={`${millify(Math.floor(Math.random() * 2000) + 150, {
                precision: 1,
                lowercase: false,
              })}`}
              subs={`${millify(Math.floor(Math.random() * 10000000) + 100000, {
                precision: 1,
                lowercase: false,
              })}`}
              verified={true}
              description={item[1].snippet.description}
            />
            <hr />
          </>
        ) : (
          <VideoRow
            key={item[1].id.videoId}
            verified={true}
            link={`https://www.youtube.com/watch?v=${item[1].id.videoId}`}
            description={item[1].snippet.description}
            timestamp={item[1].snippet.publishedAt}
            channel={item[1].snippet.channelTitle}
            title={item[1].snippet.title}
            image={item[1].snippet.thumbnails.high.url}
          />
        )
      )}

      <hr />
    </div>
  );
}

export default withRouter(SearchPage);
