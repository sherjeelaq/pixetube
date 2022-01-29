import React, { useState, useEffect, useMemo } from 'react'
import './RecommendedVideos.css'
import VideoCard from './VideoCard'
import axios from 'axios'
import requests from '../requests'
import searchresults from '../searchrequests'
import millify from 'millify'
import Carousel, { consts } from 'react-elastic-carousel'
import { Button } from '@material-ui/core'

function RecommendedVideos() {
  const [code, setCode] = useState('')
  const [popularData, setPopularData] = useState([])
  const [loading, setLoading] = useState(false)

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 300, itemsToShow: 3 },
    { width: 550, itemsToShow: 5, itemsToScroll: 1 },
    { width: 850, itemsToShow: 5 },
    { width: 1150, itemsToShow: 7, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 8 },
    { width: 1750, itemsToShow: 10 }
  ]
  useEffect(() => {
    // const entries = Object.entries(searchresults.items);
    // setPopularData(entries);
    async function fetchData() {
      const request = await axios.get(
        'https://api.db-ip.com/v2/free/self'
      )
      setCode(
        request && request.data && request.data.countryCode
          ? request.data.countryCode
          : 'US'
      )
      return request
    }

    fetchData()
  }, [code])

  useEffect(() => {
    const fetchPopular = async () => {
      await axios
        .get(requests.fetchPopular(code))
        .then(response => {
          let data =
            response && response.data && response.data.items
              ? response.data.items
              : Object.entries(searchresults.items)
          setPopularData(data)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
          const entries = Object.entries(searchresults.items)
          setPopularData(entries)
          setLoading(false)
        })
    }
    if (code !== '') {
      setLoading(true)
      fetchPopular()
    }
  }, [code])

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? '<' : '>'
    return (
      <Button
        className='recommendedVideos__pointers'
        onClick={onClick}
        disabled={isEdge}
      >
        {pointer}
      </Button>
    )
  }

  const carouselItems = useMemo(() => {
    return [
      'All',
      'Javascript',
      'Casual Games',
      'Mods',
      'Live',
      'GTA V',
      'Smartphones',
      'Fast Food',
      'Live',
      'Casual Games',
      'HTML',
      'NVIDIA',
      'RPG',
      'Lofi'
    ]
  }, [])
  return (
    <div className='recommendedVideos'>
      <div className='recommendedVideos__carousel'>
        <Carousel
          itemsToShow={6}
          pagination={false}
          renderArrow={myArrow}
          breakPoints={breakPoints}
        >
          {carouselItems.map(c => (
            <h4 className='recommendedVideos__carouselItem'>{c}</h4>
          ))}
        </Carousel>
      </div>

      <div className='recommendedVideos__videos'>
        {loading
          ? Array(12)
              .fill('_')
              .map(() => <VideoCard loading={true} />)
          : popularData &&
            popularData.length > 0 &&
            popularData.map(data => {
              return (
                <>
                  <VideoCard
                    key={
                      data[1] && data[1].id ? data[1].id : data._id
                    }
                    link={`https://www.youtube.com/watch?v=${
                      data.id
                        ? data.id
                        : data[1] && data[1].id
                        ? data[1].id
                        : ''
                    }`}
                    title={
                      data[1] && data[1].snippet.title
                        ? data[1].snippet.title
                        : data.snippet.title
                    }
                    views={`${millify(
                      data[1] && data[1].statistics.viewCount
                        ? data[1].statistics.viewCount
                        : data.statistics.viewCount,
                      {
                        precision: 1,
                        lowercase: false
                      }
                    )}`}
                    timestamp={
                      data[1] && data[1].snippet.publishedAt
                        ? data[1].snippet.publishedAt
                        : data.snippet.publishedAt
                    }
                    channelImage={
                      data[1] && data[1].snippet.title
                        ? data[1].snippet.title
                        : data.snippet.title
                    }
                    channel={
                      data[1] && data[1].snippet.channelTitle
                        ? data[1].snippet.channelTitle
                        : data.snippet.channelTitle
                    }
                    image={
                      data[1] && data[1].snippet.thumbnails.high.url
                        ? data[1].snippet.thumbnails.high.url
                        : data.snippet.thumbnails.high.url
                    }
                  />
                </>
              )
            })}
      </div>
    </div>
  )
}

export default RecommendedVideos
