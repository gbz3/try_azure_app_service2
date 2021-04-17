import 'bootstrap'
import './index.scss'

const z = (n: number, start: number = -2) => ('0' + n).slice(start)
const now = (d: Date = new Date()) => `[${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}.${z(d.getMinutes(), -3)}]`
const L = (s: string) => console.log(`${now()} ${s}`)
const isMatch = (r: RegExp) => r.test(document.location.pathname)

// パス単位の初期化処理起動
;(async () => {
  if (isMatch(/^\/room\/[^\/]+$/)) await initializeInRoom()
})()

/** '/room/:roomid' の初期化処理 */
async function initializeInRoom() {
  L(`initialize for /room/:roomid`)
}
