import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: 'confirmation-popup.component.html',
})
export class ConfirmationPopupComponent {
  @Input()
  title: string;

  @Input()
  body: string;

  @Output()
  onConfirm = new EventEmitter<void>();

  @ViewChild("modal")
  modal: ModalDirective;

  //noinspection JSUnusedGlobalSymbols
  open(){
    this.modal.show();
  }
}
