import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements AfterViewInit, OnDestroy {
  @Input() id = 'modal';
  @Input() title = 'Titre de la modal';
  @Output() closed = new EventEmitter<void>();

  private modalInstance: any;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const modalElement = this.el.nativeElement.querySelector(`#${this.id}`);
    document.body.appendChild(this.el.nativeElement);
    this.modalInstance = new bootstrap.Modal(modalElement);
    modalElement.addEventListener('hidden.bs.modal', () => this.closed.emit());
  }

  ngOnDestroy() {
    if (this.modalInstance) this.modalInstance.dispose();
    if (this.el.nativeElement.parentNode === document.body) {
      document.body.removeChild(this.el.nativeElement);
    }
  }

  open() {
    this.modalInstance.show();
  }

  close() {
    this.modalInstance.hide();
  }
}
