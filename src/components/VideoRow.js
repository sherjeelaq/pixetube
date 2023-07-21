import React from 'react'
import truncatise from 'truncatise'
import './VideoRow.css'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { Tooltip } from '@material-ui/core'
import Moment from 'react-moment'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function VideoRow({
  link,
  description,
  timestamp,
  channel,
  title,
  image,
  verified,
  loading
}) {
  return (
    <div className='videoRow'>
      {loading ? (
        <Skeleton className='videoRow__image videoRow__image--loading' />
      ) : (
        <a href={link} target='_blank' rel='noopener noreferrer'>
          <img src={image} alt={title} className='videoRow__image' />
        </a>
      )}
      <div className='videoRow__text'>
        {loading ? (
          <Skeleton count={1} width={200} />
        ) : (
          <a href={link} target='_blank' rel='noopener noreferrer'>
            <h3>{title}</h3>
          </a>
        )}

        <p className='videoRow__headline'>
          {loading ? (
            <Skeleton count={1} width={100} />
          ) : (
            <React.Fragment>
              {channel}{' '}
              {verified && (
                <Tooltip title='Verified' placement='top'>
                  <CheckCircleIcon className='videoRow__verified' />
                </Tooltip>
              )}
              {' •'}&nbsp;
              {
                <Moment interval={30000} fromNow>
                  {timestamp}
                </Moment>
              }
            </React.Fragment>
          )}
        </p>
        {loading ? (
          <Skeleton count={5} width={400} />
        ) : (
          <a href={link} target='_blank' rel='noopener noreferrer'>
            <p className='videoRow__description'>
              {truncatise(description, {
                TruncateLength: 140,
                TruncateBy: 'characters',
                Strict: false,
                StripHTML: true,
                Suffix: '...'
              })}
            </p>
          </a>
        )}
      </div>
    </div>
  )
}

export default VideoRow
