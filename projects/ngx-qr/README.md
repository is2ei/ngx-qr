# NgxQr

An Angular component to generate [QR codes](https://en.wikipedia.org/wiki/QR_code).

[![CircleCI](https://circleci.com/gh/is2ei/ngx-qr.svg?style=svg)](https://circleci.com/gh/is2ei/ngx-qr)
[![codecov](https://codecov.io/gh/is2ei/ngx-qr/branch/master/graph/badge.svg)](https://codecov.io/gh/is2ei/ngx-qr)

## Pre installation

Add Github Packages settings.
See for more detail [here](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages#installing-a-package)


## Installation

```
$ npm install @is2ei/ngx-qr
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
