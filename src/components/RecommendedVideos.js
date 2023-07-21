import React, { useState, useEffect, useMemo } from 'react'
import './RecommendedVideos.css'
import VideoCard from './VideoCard'
import axios from 'axios'
import requests from '../requests'
import searchresults from '../searchrequests'
import millify from 'millify'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

function RecommendedVideos() {
  const [code, setCode] = useState('')
  const [popularData, setPopularData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get('http://ip-api.com/json/')

        setCode(
          request && request.data && request.data.countryCode
            ? request.data.countryCode
            : 'US'
        )
      } catch (e) {
        setCode('US')
      }
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
        <Swiper
          spaceBetween={0}
          slidesPerView={'auto'}
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
        >
          {carouselItems.map((c, i) => (
            <SwiperSlide
              key={c + '' + i}
              className='recommendedVideos__carouselItemContainer'
            >
              <h4 className='recommendedVideos__carouselItem'>{c}</h4>
            </SwiperSlide>
          ))}
        </Swiper>
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
                <VideoCard
                  key={data[1] && data[1].id ? data[1].id : data._id}
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
              )
            })}
      </div>
    </div>
  )
}

export default RecommendedVideos
