import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieInterface } from '../interfaces/movie.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  search: string = ''
  oldSearch: string = ''
  timerId: number = 0
  movieSuggest: MovieInterface = {} as MovieInterface
  
  @Input() quantity: number = 0
  @Output() isActivateModal = new EventEmitter<boolean>()
  @Output() movieSearch = new EventEmitter<string>()

  constructor(private movieService: MovieService ) { }
  
  onGetSuggest(search: string) {
    this.movieSearch.emit(search)
  }

  onActivateCartModal(status: boolean) {
    this.isActivateModal.emit(status)
  }

}
