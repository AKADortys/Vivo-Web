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

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const modalElement = this.el.nativeElement.querySelector(`#${this.id}`);
    this.modalInstance = new bootstrap.Modal(modalElement);
    modalElement.addEventListener('hidden.bs.modal', () => this.closed.emit());
  }

  ngOnDestroy() {
    if (this.modalInstance) this.modalInstance.dispose();
  }

  open() {
    this.modalInstance.show();
  }

  close() {
    this.modalInstance.hide();
  }
}
