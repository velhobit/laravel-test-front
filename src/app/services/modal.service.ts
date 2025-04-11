import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalComponentRef?: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  show(
    component: Type<any>,
    id?: string | number,
    onClose: () => void = () => {}
  ): void {
    this.modalComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(ModalComponent)
      .create(this.injector);

    this.modalComponentRef.instance.close = () => {
      onClose();
      this.removeModal(this.modalComponentRef);
    };
    this.modalComponentRef.instance.component = component;
    if (id) {
      this.modalComponentRef.instance.id = id;
    }

    this.appRef.attachView(this.modalComponentRef.hostView);

    const domElem = (this.modalComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0];
    document.body.appendChild(domElem);
  }

  private removeModal(modalComponentRef: any) {
    this.appRef.detachView(modalComponentRef.hostView);
    modalComponentRef.destroy();
  }
}
