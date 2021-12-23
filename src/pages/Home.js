import React from "react"
import RecommendedVideos from "../components/RecommendedVideos"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

function Home() {
  return (
    <React.Fragment>
      <Header />
      <div className="app__page">
        <Sidebar />
        <RecommendedVideos />
      </div>
    </React.Fragment>
  )
}

export default Home
