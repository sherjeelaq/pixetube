import React from "react"
import SearchPage from "../components/SearchPage"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

function Search({ match }) {
  return (
    <React.Fragment>
      <Header searchTerm={match?.params?.searchTerm} />
      <div className="app__page">
        <Sidebar />
        <SearchPage />
      </div>
    </React.Fragment>
  )
}

export default Search
