import {
  Component,
  ComponentRef,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() component?: Type<any>;
  @Input('close') close: () => void = () => {};
  @Input('id') id?: number | string;

  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  componentRef?: ComponentRef<any>;

  ngAfterViewInit() {
    if (this.component) {
      this.container.clear();
      this.componentRef = this.container.createComponent(this.component);
      if (this.id !== undefined) {
        this.componentRef.instance.id = this.id;
      }
      this.componentRef.instance.close = this.close;
    }
  }

  closeModal() {
    this.close();
  }
}
