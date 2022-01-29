import { Avatar } from '@material-ui/core'
import React from 'react'
import './VideoCard.css'
import truncatise from 'truncatise'
import Moment from 'react-moment'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function VideoCard({
  link,
  image,
  title,
  channel,
  views,
  timestamp,
  channelImage,
  loading
}) {
  return (
    <div className='videoCard'>
      <div className='videoCard__thumbnail'></div>
      {loading ? (
        <Skeleton className='videoCard__thumbnail videoCard__thumbnail--loading' />
      ) : (
        <a href={link} target='_blank' rel='noopener noreferrer'>
          <img
            src={image}
            alt={title}
            className='videoCard__thumbnail'
          />
        </a>
      )}
      <div className='videoCard__info'>
        {loading ? (
          <Skeleton circle className='videoCard__avatar' />
        ) : (
          <Avatar
            className='videoCard__avatar'
            alt={channel}
            src={channelImage}
          />
        )}
        {loading ? (
          <div className='videoCard__text'>
            <Skeleton count={1} />
            <Skeleton count={1} width={100} />
            <Skeleton count={4} width={300} />
          </div>
        ) : (
          <a href={link} target='_blank' rel='noopener noreferrer'>
            <div className='videoCard__text'>
              <h4>
                {truncatise(title, {
                  TruncateLength: 50,
                  TruncateBy: 'characters',
                  Strict: false,
                  StripHTML: true,
                  Suffix: '...'
                })}
              </h4>
              <p>{channel}</p>
              <p>
                {views} •{' '}
                <Moment interval={30000} fromNow value={timestamp} />
              </p>
            </div>
          </a>
        )}
      </div>
    </div>
  )
}

export default VideoCard
