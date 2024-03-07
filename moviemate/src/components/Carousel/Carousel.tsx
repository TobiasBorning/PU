import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovies, Movie } from '../../utils/movieUtils/fetchAndFillDb';
import './Carousel.css';
import '../Scrolling/ScrollingComponent.css';
import { getMovieByGenreOr } from '../../utils/searchUtils/searchFunctions';
import { error } from 'console';
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
export { };

type Props = {
  movieLimit: number; // Antall filmer som skal vises i karusellen
}

const Carousel: React.FC<Props> = ({ movieLimit }) => {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselRef = useRef<Slider>(null); // Opprett en ref

  useEffect(() => {
    getMovies(movieLimit)
      .then((movies) => {
        setMovieList(movies);
      });
  }, [movieLimit]);

  const goToMovie = (number: number) => {
    navigate('/movie', { state: { number } });
  }

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const handleClickPrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.slickPrev();
    }
  };

  const handleClickNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slickNext();
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    afterChange: handleSlideChange,
    arrows: false
  };

  const selectGenre = (genre: string) => {
    if (genre){
      getMovieByGenreOr([genre])
      .then((filteredMovies) => {
        const convertedMovies: Movie[] = filteredMovies.map(movie => ({
          ...movie,
          posterUrl: movie.posterUrl ? String(movie.posterUrl) : undefined,
          plot: movie.plot ? String(movie.plot) : undefined
        }));
        setMovieList(convertedMovies);
        setCurrentIndex(0);
      });
    }
    else {
      getMovies(movieLimit).then((movies) => {
        setMovieList(movies)
        setCurrentIndex(0);
      });
    }
  };

  return (
    <div className='mainPageConatiner'>
    <div className="scrolling-carousel">
      <button className="nav-button prev" onClick={handleClickPrevious} disabled={currentIndex === 0}>
        &#10094;
      </button>
  
      <Slider {...settings} ref={carouselRef}>
        {movieList.map((movie) => (
          <div key={movie.id} className="carousel-item" onClick={() => goToMovie(parseInt(movie.id || ''))}>
            <h3>{movie.title}</h3>
            <img src={movie.posterUrl || ''} alt={movie.title || ''} />
          </div>
        ))}
      </Slider>
      <button onClick={() => selectGenre("Action")}>Filter Action</button>
      <button className="nav-button next" onClick={handleClickNext} disabled={currentIndex === movieList.length - 1}>
        &#10095;
      </button>
    </div>
    </div>
  );
}

export default Carousel;
