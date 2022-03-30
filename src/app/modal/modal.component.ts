import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Movie } from '../interfaces/movie.interface';
import { CartInterface } from '../interfaces/cart.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() cartList: CartInterface = {} as CartInterface
  @Input() quantity: number = 0
  @Output() isActivateModal = new EventEmitter<boolean>()
  @Output() isActivatePaymentModal = new EventEmitter<boolean>()
  @Output() onClear = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  
  onClearCart() {
    this.onClear.emit()
  }

  onConfirm() {
    this.isActivatePaymentModal.emit(true)
    this.isActivateModal.emit(false)
  }

  onCloseModal(status: boolean) {
    this.isActivateModal.emit(status)
  }

  isEmpty() {
    return this.cartList.movies.length <= 0
  }

}
