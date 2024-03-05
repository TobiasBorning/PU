import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovies, Movie } from '../../utils/movieUtils/fetchAndFillDb';
import './Carousel.css';
import '../Scrolling/ScrollingComponent.css';
export {};

type Props = {
  movieLimit: number; // Antall filmer som skal vises i karusellen
}

const Carousel: React.FC<Props> = ({ movieLimit }) => {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    getMovies(movieLimit)
      .then((movies) => {
        setMovieList(movies);
      });
  }, [movieLimit]);

  const goToMovie = (number: number) => {
    navigate('/movie', { state: { number } });
  }

  const handleClickPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, movieList.length - 1));
  };

  return (
    <div className="scrolling-carousel">
      <button className="nav-button" onClick={handleClickPrevious} disabled={currentIndex === 0}>
        Previous
      </button>

      <div className="carousel-container">
        <div className="carousel-items">
          {movieList.map((movie, index) => (
            <div
              key={movie.id}
              className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToMovie(parseInt(movie.id || ''))}
            >
              <h3>{movie.title}</h3>
              <img src={movie.posterUrl || ''} alt={movie.title || ''} />
            </div>
          ))}
        </div>
      </div>

      <button className="nav-button" onClick={handleClickNext} disabled={currentIndex === movieList.length - 1}>
        Next
      </button>
    </div>
  );
}

export default Carousel;
