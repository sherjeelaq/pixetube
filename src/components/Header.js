import React, { useState, useEffect } from 'react'
import './Header.css'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import VideoCallIcon from '@material-ui/icons/VideoCall'
import AppsIcon from '@material-ui/icons/Apps'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { Avatar } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'

function Header({ searchTerm }) {
  const location = useLocation()
  console.log('location', location)
  const [inputSearch, setInputSearch] = useState('')

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      setInputSearch(searchTerm)
    }
  }, [searchTerm])

  return (
    <div className='header'>
      <div className='header__left'>
        <MenuIcon />
        <Link to='/'>
          <img
            src='https://i.imgur.com/np2SimN.png'
            alt='logo'
            className='header__logo'
          />
        </Link>
      </div>
      <div className='header__input'>
        <form action={`/search/${inputSearch}`}>
          <input
            type='text'
            value={inputSearch}
            onChange={e => setInputSearch(e.target.value)}
            placeholder='Search...'
          />
          <Link to={`/search/${inputSearch}`}>
            <SearchIcon className='header__inputButton' />
          </Link>
        </form>
      </div>
      <div className='header__icons'>
        <VideoCallIcon className='header__icon' />
        <AppsIcon className='header__icon' />
        <NotificationsIcon className='header__icon' />

        <Avatar />
      </div>
    </div>
  )
}

export default Header
