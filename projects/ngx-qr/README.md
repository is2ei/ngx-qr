# NgxQr

An Angular component to generate [QR codes](https://en.wikipedia.org/wiki/QR_code).

## Installation

```
$ npm i ngx-qr
```

## Usage

```typescript
// app.component.ts
import { NgxQrModule } from 'ngx-qr'
```

```html
<!-- app.component.html -->
<qr-code value="https://angular.io/"></qr-code>
```

## Properties

property  | type                 | default value
----------|----------------------|--------------
`value`   | `string`             |
`renderAs`| `string` (`'canvas' 'svg'`) | `'canvas'`
`size`    | `number`             | `128`
`bgColor` | `string` (CSS color) | `"#FFFFFF"`
`fgColor` | `string` (CSS color) | `"#000000"`
`level`   | `string` (`'L' 'M' 'Q' 'H'`)            | `'L'`
`includeMargin` | `boolean`      | `false`
`imageSettings` | `object` (see below) |

### `imageSettings`

field      | type                 | default value
-----------|----------------------|--------------
`src`      | `string`             |
`x`        | `number`             | none, will center
`y`        | `number`             | none, will center
`height`   | `number`             | 10% of `size`
`width`    | `number`             | 10% of `size`
`excavate` | `boolean`            | `false`
