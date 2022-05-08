import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, options: Partial<AlertifyOptions>){
    const msj = alertify[options.messageType](message);
    if(options.dismissOthers)
      msj.dismissOthers();
    alertify.set('notifier','position', options.position);
    alertify.set('notifier','delay', options.delay)
  }

  dismissAll(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomRight;
  delay : number = 5;
  dismissOthers: Boolean = false;
}

export enum MessageType{
  Error = "error",
  Message = "message",
  Notify =  "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position{
  TopRight = "top-right",
  TopCenter = "top-center",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}


