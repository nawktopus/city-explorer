import React from "react";
import Movies from "./Movies";

class Movie extends React.Component {
  render() {
    let moviesInfo = this.props.movieData.map((element, idx) => {
      return <Movies
        title={element.title}
        overview={element.overview}
        key={idx}
      />
    })

    return (
      <>
        <main>
          {moviesInfo}
        </main>
      </>
    )
  }

}

export default Movie;