import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovies, Movie } from '../../utils/movieUtils/fetchAndFillDb';
import './Carousel.css';
import '../Scrolling/ScrollingComponent.css';
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { getMovieByGenreOr } from '../../utils/searchUtils/searchFunctions';
export { };

type Props = {
  movieLimit: number; // Antall filmer som skal vises i karusellen
  genre?: string; // Sjangeren filmer skal filtreres på (valgfri)
}

const Carousel: React.FC<Props> = ({ movieLimit, genre }) => {
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

  useEffect(() => {
    if (genre) {
      selectGenre(genre);
    } else {
      getMovies(movieLimit).then((movies) => {
        setMovieList(movies);
        setCurrentIndex(0);
      });
    }
  }, [movieLimit, genre]); // Legg til 'genre' i avhengighetslisten


  const goToMovie = (number: number) => {
    navigate('/movie', { state: { number } });
  }

  const selectGenre = (genre: string) => {
    if (genre) {
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
    arrows: false,
  };

  return (
    <div className="scrolling-carousel">
      <button className="nav-button prev" onClick={handleClickPrevious}>
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
      <button className="nav-button next" onClick={handleClickNext}>
        &#10095;
      </button>
    </div>
  );
}

export default Carousel;

