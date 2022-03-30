import { Component } from '@angular/core';
import { MovieInterface, Movie } from './interfaces/movie.interface';
import { CartInterface } from './interfaces/cart.interface';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-frontend';
  movies: MovieInterface = {} as MovieInterface
  isActivateModal: boolean = false
  isActivatePaymentModal: boolean = false
  cartList: CartInterface = {} as CartInterface
  storageKey: string = 'rtp-movie-cart'
  movieData: Movie = {} as Movie

  constructor(private movieService: MovieService) { }
  
  ngOnInit() {
    this.getCart()
    this.fetchData('')
  }

  getCart() {
    this.cartList.movies = []
    const cartListString = localStorage.getItem(this.storageKey) || ''
    if (cartListString) {
      this.cartList = JSON.parse(cartListString)
    }
  }

  fetchData(search: string) {
    if (search) {
      this.fetchMovieByname(search)
    } else {
      this.fetchMovies()
    }
  }

  fetchMovies() {
    this.movieService.fetchTraindingMovies().subscribe((result: MovieInterface) => {
      result.results.forEach((item) => {
        item.poster_path = `https://image.tmdb.org/t/p/w500${item.poster_path}`
        item.price = 100
      })
      this.movies = result
    })
  }

  fetchMovieByname(search: string) {
    this.movieService.fetchMovieByName(search).subscribe((result: MovieInterface) => {
      result.results.forEach((item) => {
        item.poster_path = `https://image.tmdb.org/t/p/w500${item.poster_path}`
        item.price = 100
      })
      this.movies = result
    })
  }

  addToCart(movie: Movie) {
    this.cartList.movies.push({ ...movie })
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartList))
    this.getCart()
  }
  
  clearCart() {
    this.cartList.movies = []
    this.cartList.totalDiscount = 0,
    this.cartList.totalPrice = 0
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartList))
    this.getCart()
  }

  calculatePrice() {
    const cartListString = localStorage.getItem(this.storageKey) || ''
    if (!cartListString) {
      return
    }
    this.cartList = JSON.parse(cartListString)
    const quantity = this.cartList.movies.length
    const price = this.cartList.movies.reduce((prev, curr) => {
      if (curr.price) {
        return prev += curr.price
      }
      return prev
    }, 0)
    let discount = 0
    if (quantity >= 5) {
      discount = 20
    } else if (quantity >= 3) {
      discount = 10
    }
    this.cartList.totalDiscount = discount
    this.cartList.totalPrice = price - (price * discount / 100)
  }

  activateModal(status: boolean) {
    const cartListString = localStorage.getItem(this.storageKey) || ''
    if (cartListString) {
      this.cartList = JSON.parse(cartListString)
    }
    this.calculatePrice()
    this.isActivateModal = status
  }

  activatePaymentModal(status: boolean) {
    this.isActivatePaymentModal = status
  }

  paymentSuccess(status: boolean) {
    if (status) {
      this.cartList.movies = []
      this.cartList.totalDiscount = 0,
      this.cartList.totalPrice = 0
      localStorage.setItem(this.storageKey, JSON.stringify(this.cartList))
      this.activatePaymentModal(false)
      this.getCart()
    }
  }
}
