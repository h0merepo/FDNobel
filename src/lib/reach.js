// The atlas on a wall.
//
// On a 55-inch panel the plane of circles wants the whole glass, but a person
// standing at it can only work the part they can reach — roughly the middle 32
// inches, low enough to touch. So the two are separated: the field and the
// circles fill the panel, and everything you operate — the title, the dock,
// the trail, the content box, the scrubber, the search — is laid out at a
// fixed size and set down in that reach.
//
// Which is the point of a fixed size. The chrome is not asked to be responsive
// to 55 inches; it is one composition, drawn once at the size below, and put
// where the hands are. Only the content answers to the glass.
export const STAGE = { w: 1440, h: 810 }

// Screens are measured corner to corner, so 32 of 55 is 32/55 of the diagonal
// — and on a panel of any shape, that is the same fraction of its width and of
// its height. The smaller of the two governs, so the stage keeps its shape on a
// panel that is not 16:9.
const REACH = 32 / 55

// No browser can measure a real inch — a 55-inch panel and a 24-inch monitor
// running the same 1920 pixels are the same page to CSS — so the fraction is
// applied to whatever it is given and floored here. Without the floor a laptop
// would shrink the chrome to 58 per cent of the size it was drawn at, which on
// a screen you sit two feet from is unreadable. At 1920 wide and up the floor
// is not reached and the reach is within two points of 32/55; below that the
// stage simply takes most of the window, as it always did.
const FLOOR = 0.8

export function fitReach() {
  const fit = Math.min(innerWidth / STAGE.w, innerHeight / STAGE.h) * REACH
  document.documentElement.style.setProperty('--reach-k', Math.max(FLOOR, fit).toFixed(4))
}

export function watchReach() {
  fitReach()
  addEventListener('resize', fitReach)
}
