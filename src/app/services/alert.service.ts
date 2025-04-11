import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
} from '@angular/core';
import { AlertComponent, Button } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertComponentRef?: any;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  private showAlert(
    title: string,
    message: string,
    type: string = 'info',
    buttons: Button[]
  ): void {
    this.alertComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(AlertComponent)
      .create(this.injector);

    this.alertComponentRef.instance.title = title;
    this.alertComponentRef.instance.message = message;
    this.alertComponentRef.instance.type = type;
    this.alertComponentRef.instance.buttons = buttons;

    this.appRef.attachView(this.alertComponentRef.hostView);

    const domElem = (this.alertComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0];
    document.body.appendChild(domElem);
  }

  private removeAlert(alertComponentRef: any) {
    this.appRef.detachView(alertComponentRef.hostView);
    alertComponentRef.destroy();
  }

  info(title: string, message: string) {
    this.showAlert(title, message, 'info', [
      {
        label: 'OK',
        type: 'submit',
        onClick: () => {
          this.removeAlert(this.alertComponentRef);
        },
      },
    ]);
  }
  confirm(
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel: () => void = () => {}
  ) {
    this.showAlert(title, message, 'confirm', [
      {
        label: 'Confirm',
        type: 'submit',
        onClick: () => {
          onConfirm();
          this.removeAlert(this.alertComponentRef);
        },
      },
      {
        label: 'Cancel',
        type: 'button',
        onClick: () => {
          this.removeAlert(this.alertComponentRef);
        },
      },
    ]);
  }
}
