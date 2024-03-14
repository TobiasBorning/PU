export interface Movie{
    // string of movie ID in database, this is unique to the movie. Functions searching by this should return a Movie interface
    id: string ;
    // Movie title, there may be duplicates. Functions searching by this should return a list
    title: string;
    // list of movie genres. Searches by this should return a list
    genres: [];
    // List of actors in the movie. Searches by actor should return an array.
    actors: [];
    // List of movie directors. Searches by directors shoul return an array.
    director: [];

    // Plot and posterURL is not used in searches, but shoul be required for return values as they are needed for app functionality.
    posterUrl?: string;
    plot?: string;

    // average score to be used when sorting movies
    avrgScore?: number|null
}