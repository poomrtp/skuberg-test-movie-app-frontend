import { Injectable } from '@angular/core';
import { MovieInterface } from '../interfaces/movie.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiKey: string = '0dbdfedb8b9533d9d5bbe3861c03d0d6'
  constructor(private http: HttpClient) {}

  fetchTraindingMovies(): Observable<MovieInterface> {
    const apiUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${this.apiKey}`
    return this.http.get<MovieInterface>(apiUrl)
  }

  fetchMovieByName(query: string): Observable<MovieInterface> {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${query}`
    return this.http.get<MovieInterface>(apiUrl)
  }
}
