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
  @Input() size = 128;
  @Input() level = 'L';

  @ViewChild('qr', {static: false}) canvas;
  @ViewChild('image', {static: false}) img;

  qrcode: any = null;

  // This is *very* rough estimate of max amount of QRCode allowed to be covered.
  // It is "wrong" in a lot of ways (area is a terrible way to estimate, it
  // really should be number of modules covered), but if for some reason we don't
  // get an explicit height or width, I'd rather default to something than throw.
  DEFAULT_IMG_SCALE = 0.1;

  constructor() { }

  ngAfterViewInit() {
    const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[this.level]);
    qrcode.addData(this.value);
    qrcode.make();

    const cells = qrcode.modules;

    const numCells = cells.length;
    const calculatedImageSettings = this.getImageSettings(cells);


    const ctx = this.canvas.nativeElement.getContext('2d');

    cells.forEach((row, rdx) => {
      row.forEach((cell, cdx) => {
        if (cell) {
          ctx.fillRect(cdx, rdx, 1, 1);
        }
      });
    });

    // We're going to scale this so that the number of drawable units
    // matches the number of cells. This avoids rounding issues, but does
    // result in some potentially unwanted single pixel issues between
    // blocks, only in environments that don't support Path2D.
    const pixelRatio = window.devicePixelRatio || 1;
    console.log('pixelRatio', pixelRatio);
    this.canvas.nativeElement.height = this.canvas.nativeElement.width = pixelRatio;
    const scale = (this.size / numCells) * pixelRatio;
    ctx.scale(scale, scale);

    ctx.drawImage(
      this.img.nativeElement,
      calculatedImageSettings.x,
      calculatedImageSettings.y,
      calculatedImageSettings.w,
      calculatedImageSettings.h
    );
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getImageSettings(cells: Array<Array<boolean>>) {

    const numCells = cells.length;
    const defaultSize = Math.floor(this.size * this.DEFAULT_IMG_SCALE);
    const scale = numCells / this.size;
    const w = defaultSize * scale;
    const h = defaultSize * scale;
    const x = cells.length / 2 - w / 2;
    const y = cells.length / 2 - h / 2;

    return {
      x,
      y,
      w,
      h
    };
  }

}
