import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {

  counting:number = 60
  timeId: any = 0
  constructor() { }

  @Output() isActivatePaymentModal = new EventEmitter<boolean>()
  @Output() isSuccessPayment = new EventEmitter<boolean>()
  ngOnInit(): void {
    this.initailTimeout()
  }

  initailTimeout() {
    clearInterval(this.timeId)
    this.counting = 60
    this.timeId = setInterval(() => {
      this.countTimeout()
    }, 1000);
    if(this.counting <= 0) clearInterval(this.timeId)
  }

  countTimeout() {
    this.counting -= 1
    if (this.counting <= 0) {
      clearInterval(this.timeId)
      this.onActivateModal(false)
    }
  }

  onActivateModal(status: boolean) {
    this.isActivatePaymentModal.emit(status)
    clearInterval(this.timeId)
  }

  onSuccessPayment(status: boolean) {
    if (status) {
      this.isActivatePaymentModal.emit(false)
      this.isSuccessPayment.emit(status)
      clearInterval(this.timeId)
    }
  }
}
