import React, { useState, useEffect } from "react";
import "./RecommendedVideos.css";
import VideoCard from "./VideoCard";
import axios from "axios";
import requests from "../requests";
import searchresults from "../searchrequests";
import millify from "millify";
import Carousel, { consts } from "react-elastic-carousel";
import { Button } from "@material-ui/core";

function RecommendedVideos() {
  const [code, setCode] = useState("");
  const [popularData, setPopularData] = useState([]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 300, itemsToShow: 3 },
    { width: 550, itemsToShow: 5, itemsToScroll: 1 },
    { width: 850, itemsToShow: 5 },
    { width: 1150, itemsToShow: 7, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 8 },
    { width: 1750, itemsToShow: 10 },
  ];
  useEffect(() => {
    // const entries = Object.entries(searchresults.items);
    // setPopularData(entries);
    async function fetchData() {
      const request = await axios.get("https://ipapi.co/json/");

      setCode(request.data.country_code);

      return request;
    }

    fetchData();

    //run this code once when the Results components load if , [] in the last if not added then avery time the code will run when the component loads
  }, [code]);

  useEffect(() => {
    const fetchPopular = async () => {
      await axios
        .get(
          "https://www.googleapis.com/youtube/v3/" + requests.fetchPopular(code)
        )
        .then((response) => {
          let data = response.data;
          setPopularData(data);
        })
        .catch((error) => {
          console.log(error);
          const entries = Object.entries(searchresults.items);
          setPopularData(entries);
        });
    };
    if (code !== "") {
      fetchPopular();
    }
  }, [code]);

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? "<" : ">";
    return (
      <Button
        className="recommendedVideos__pointers"
        onClick={onClick}
        disabled={isEdge}
      >
        {pointer}
      </Button>
    );
  };

  return (
    <div className="recommendedVideos">
      <div className="recommendedVideos__carousel">
        <Carousel
          itemsToShow={6}
          pagination={false}
          renderArrow={myArrow}
          breakPoints={breakPoints}
        >
          <h4 className="recommendedVideos__carouselItem">All</h4>
          <h4 className="recommendedVideos__carouselItem">Javascript</h4>
          <h4 className="recommendedVideos__carouselItem">Casual Games</h4>
          <h4 className="recommendedVideos__carouselItem">Mods</h4>
          <h4 className="recommendedVideos__carouselItem">Live</h4>
          <h4 className="recommendedVideos__carouselItem">GTA V</h4>
          <h4 className="recommendedVideos__carouselItem">Smartphones</h4>
          <h4 className="recommendedVideos__carouselItem">Fast Food</h4>
          <h4 className="recommendedVideos__carouselItem">Live</h4>
          <h4 className="recommendedVideos__carouselItem">Casual Games</h4>
          <h4 className="recommendedVideos__carouselItem">HTML</h4>
          <h4 className="recommendedVideos__carouselItem">NVIDIA RTX</h4>
          <h4 className="recommendedVideos__carouselItem">RPGs</h4>
          <h4 className="recommendedVideos__carouselItem">Electronic Music</h4>
        </Carousel>
      </div>

      <div className="recommendedVideos__videos">
        {popularData?.map((data) => (
          <VideoCard
            key={data[1].id}
            link={`https://www.youtube.com/watch?v=${data[1].id}`}
            title={data[1].snippet.title}
            views={`${millify(data[1].statistics.viewCount, {
              precision: 1,
              lowercase: false,
            })}`}
            timestamp={data[1].snippet.publishedAt}
            channelImage={data[1].snippet.title}
            channel={data[1].snippet.channelTitle}
            image={data[1].snippet.thumbnails.high.url}
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendedVideos;
