import {
  Component,
  OnChanges,
  Input,
  ViewChild,
  SimpleChanges,
  AfterViewInit,
  ElementRef
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
export class NgxQrComponent implements OnChanges, AfterViewInit {

  @Input() value = '';
  @Input() size = 128;
  @Input() level = 'L';
  @Input() bgColor = '#FFFFFF';
  @Input() fgColor = '#000000';
  @Input() includeMargin = false;

  @ViewChild('qr', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('image', {static: false}) img: ElementRef<HTMLImageElement>;

  qrcode: any = null;

  MARGIN_SIZE = 4;

  // This is *very* rough estimate of max amount of QRCode allowed to be covered.
  // It is "wrong" in a lot of ways (area is a terrible way to estimate, it
  // really should be number of modules covered), but if for some reason we don't
  // get an explicit height or width, I'd rather default to something than throw.
  DEFAULT_IMG_SCALE = 0.1;

  constructor() { }

  ngAfterViewInit() {
    this.generateQrCode();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateQrCode();
  }

  generateQrCode() {

    if (!this.canvas || !this.img) {
      return;
    }

    // We'll use type===-1 to force QRCode to automatically pick the best type
    const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[this.level]);
    qrcode.addData(this.value);
    qrcode.make();

    const ctx = this.canvas.nativeElement.getContext('2d');

    const cells = qrcode.modules;
    if (!cells) {
      return;
    }

    const margin = this.includeMargin ? this.MARGIN_SIZE : 0;
    const numCells = cells.length + margin * 2;
    const calculatedImageSettings = this.getImageSettings(cells);

    // We're going to scale this so that the number of drawable units
    // matches the number of cells. This avoids rounding issues, but does
    // result in some potentially unwanted single pixel issues between
    // blocks, only in environments that don't support Path2D.
    const pixelRatio = window.devicePixelRatio || 1;
    this.canvas.nativeElement.height = this.canvas.nativeElement.width = this.size * pixelRatio;
    const scale = (this.size / numCells) * pixelRatio;
    ctx.scale(scale, scale);

    // Draw solid background, only paint dark modules.
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, numCells, numCells);

    ctx.fillStyle = this.fgColor;

    cells.forEach((row, rdx) => {
      row.forEach((cell, cdx) => {
        if (cell) {
          ctx.fillRect(cdx, rdx, 1, 1);
        }
      });
    });

    ctx.drawImage(
      this.img.nativeElement,
      calculatedImageSettings.x,
      calculatedImageSettings.y,
      calculatedImageSettings.w,
      calculatedImageSettings.h
    );
  }

  getImageSettings(cells: Array<Array<boolean>>) {

    const margin = this.includeMargin ? this.MARGIN_SIZE : 0;
    const numCells = cells.length + margin * 2;
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
