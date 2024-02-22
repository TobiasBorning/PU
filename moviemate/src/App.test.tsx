import React from 'react';
import { render, screen } from '@testing-library/react';
import {getMovieById} from './utils/movieUtils/db-functions';
import { CollectionReference, addDoc, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import App from './App';

test('test get function for movies by id', () => {
  render(<App />);
  
  const testing = getMovieById("1");
  testing.then((querySnap)=>{
    expect(querySnap.docs.forEach((doc)=>{
      return doc.data().title;
    })).toEqual(("Beetlejuice"))
  });
});
