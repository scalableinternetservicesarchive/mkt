/**
 * A linear interpolator for hexadecimal colors
 * https://gist.github.com/rosszurowski/67f04465c424a9bc0dae
 * @param {String} a
 * @param {String} b
 * @param {Number} amount
 * @example
 * // returns #7F7F7F
 * lerpColor('#000000', '#ffffff', 0.5)
 * @returns {String}
 */
export function lerpColor(a: string, b: string, amount: number) {
  const ah = parseInt(a.replace(/#/g, ''), 16),
    ar = ah >> 16,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = parseInt(b.replace(/#/g, ''), 16),
    br = bh >> 16,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab)

  return '#' + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
}

//**blob to dataURL**
export function blobToDataURL(blob: Blob, callback: (result: string) => void) {
  const a = new FileReader()
  a.onload = function (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    callback(e.target.result)
  }
  a.readAsDataURL(blob)
}
