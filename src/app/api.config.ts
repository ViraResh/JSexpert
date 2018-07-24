import { InjectionToken } from '@angular/core';

export const apiConfig = {
  apiUrl: `https://api.themoviedb.org/3`,
  // apiKey: `0994e7679a856150aadcecf7de489bce`,
  params: `&api_key=0994e7679a856150aadcecf7de489bce&language=en-EN`,

  movieUrl: `https://api.themoviedb.org/3/movie`,
  personUrl: `https://api.themoviedb.org/3/person`,
  
  searchUrlMovie: `https://api.themoviedb.org/3/search/movie`,
  searchUrlPerson: `https://api.themoviedb.org/3/search/person`,

  imgPath: `https://image.tmdb.org/t/p`,
  midImgPath: `https://image.tmdb.org/t/p/w500`,
  smallImgPath: `https://image.tmdb.org/t/p/w185`,
  bigBackPath: `https://image.tmdb.org/t/p/w1280`,
  midBackPath: `https://image.tmdb.org/t/p/w780`,
  smallBackPath: `https://image.tmdb.org/t/p/w300`
};

  export const API_CONFIG = new InjectionToken<any>('apiConfig');