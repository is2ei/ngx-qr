import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ViewChild,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';

import QRCodeImpl from 'qr.js/lib/QRCode';
import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel';

@Component({
  // tslint:disable-next-line
  selector: 'qr-code',
  template: `
    <canvas #qr></canvas>
    <img
      #image
      src="https://is2ei.github.io/ngx-qr/favicon.ico"
      style="display:none"
    />
  `,
  styles: []
})
export class NgxQrComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() value = '';
  @Input() level = 'L';

  @ViewChild('qr', {static: false}) canvas;
  @ViewChild('image', {static: false}) img;

  qrcode: any = null;

  constructor() { }

  ngAfterViewInit() {
    const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[this.level]);
    qrcode.addData(this.value);
    qrcode.make();

    const cells = qrcode.modules;

    const ctx = this.canvas.nativeElement.getContext('2d');

    cells.forEach((row, rdx) => {
      row.forEach((cell, cdx) => {
        if (cell) {
          ctx.fillRect(cdx, rdx, 1, 1);
        }
      });
    });

    ctx.drawImage(
      this.img.nativeElement,
      100,
      100
    );
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}
