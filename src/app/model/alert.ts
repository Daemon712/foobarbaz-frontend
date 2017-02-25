export class Alert {
  id: number;
  type: AlertType;
  text: string;

  constructor(text: string, type = AlertType.info){
    this.text = text;
    this.type = type;
  }
}

export enum AlertType {
  success,
  info,
  warning,
  danger
}
