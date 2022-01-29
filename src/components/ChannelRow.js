import { Avatar, Tooltip } from '@material-ui/core'
import React from 'react'
import './ChannelRow.css'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ChannelRow({
  image,
  channel,
  subs,
  noOfVideos,
  description,
  verified,
  link,
  loading
}) {
  return (
    <div className='channelRow'>
      {loading ? (
        <Skeleton circle className='channelRow__logo' />
      ) : (
        <a href={link} target='_blank' rel='noopener noreferrer'>
          <Avatar
            src={image}
            alt={channel}
            className='channelRow__logo'
          />
        </a>
      )}
      <div className='channelRow__text'>
        {loading ? (
          <Skeleton count={1} width={200} />
        ) : (
          <a href={link} target='_blank' rel='noopener noreferrer'>
            <h4>
              {channel}{' '}
              {verified && (
                <Tooltip title='Verified' placement='top'>
                  <CheckCircleIcon className='channelRow__verified' />
                </Tooltip>
              )}
            </h4>
          </a>
        )}

        <p>
          {loading ? (
            <Skeleton count={1} width={100} />
          ) : (
            `${subs} subscribers • ${noOfVideos} videos`
          )}
        </p>
        <p>{description || <Skeleton count={3} width={300} />}</p>
      </div>
    </div>
  )
}

export default ChannelRow
