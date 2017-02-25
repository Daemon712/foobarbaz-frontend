import {Injectable} from '@angular/core';
import {Alert, AlertType} from "../model/alert";

@Injectable()
export class AlertService {
  private listeners: ((Alert) => void)[] = [];
  private sequence: number;

  constructor() { }

  alert(newAlert: Alert){
    newAlert.id = this.sequence++;
    this.listeners.forEach(h => h(newAlert));
  }

  success(text: string){
    this.alert(new Alert(text, AlertType.success));
  }

  info(text: string){
    this.alert(new Alert(text, AlertType.info));
  }

  warning(text: string){
    this.alert(new Alert(text, AlertType.warning));
  }

  danger(text: string){
    this.alert(new Alert(text, AlertType.danger));
  }

  addListener(newListener: (Alert) => void){
    this.listeners.push(newListener);
  }
}
