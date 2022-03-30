import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MovieInterface, Movie } from '../interfaces/movie.interface';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  title = 'movie-list';
  cartList: Movie[] = []
  storageKey: string = 'movie-cart'

  @Input() movies: MovieInterface = {} as MovieInterface
  @Output() movieData = new EventEmitter<Movie>()
  constructor(private movieService: MovieService) {

  }

  ngOnInit() {
    this.getCart()
  }
  getCart() {
    const cartListString = localStorage.getItem(this.storageKey) || ''
    if (cartListString) {
      this.cartList = JSON.parse(cartListString)
    }
  }

  addToCart(movie: Movie) {
    this.movieData.emit(movie)
  }
}
