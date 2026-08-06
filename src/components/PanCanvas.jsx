import { useCallback, useEffect, useRef, useState } from 'react'
import { clamp } from '../lib/layout'

const DRAG_THRESHOLD = 5

export default function PanCanvas({ world, children, offsetRef, onOffsetChange, lockY = false }) {
  const nodeRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const state = useRef({ down: false, moved: 0, startX: 0, startY: 0, originX: 0, originY: 0 })
  const viewport = useRef({ w: 0, h: 0 })

  const applyOffset = useCallback(
    (next) => {
      const { w, h } = viewport.current
      const x = clamp(next.x, Math.min(0, w - world.width), 0)
      const y = lockY ? 0 : clamp(next.y, Math.min(0, h - world.height), 0)
      setOffset({ x, y })
      onOffsetChange?.({ x, y })
    },
    [world.width, world.height, lockY, onOffsetChange],
  )

  useEffect(() => {
    const el = nodeRef.current
    if (!el) return
    const measure = () => {
      viewport.current = { w: el.clientWidth, h: el.clientHeight }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!offsetRef) return
    offsetRef.current = {
      centerOn: (worldX, worldY) => {
        const { w, h } = viewport.current
        applyOffset({ x: w / 2 - worldX, y: h / 2 - worldY })
      },
      panTo: (worldX) => {
        const { w } = viewport.current
        applyOffset({ x: w / 2 - worldX, y: offset.y })
      },
    }
  }, [offsetRef, applyOffset, offset.y])

  // Pointer capture would retarget the subsequent click to the canvas and stop
  // bubbles from ever receiving it, so the drag is tracked on the window instead.
  const onPointerDown = (e) => {
    if (e.button !== 0) return
    const s = state.current
    s.down = true
    s.moved = 0
    s.startX = e.clientX
    s.startY = e.clientY
    s.originX = offset.x
    s.originY = offset.y
  }

  useEffect(() => {
    const onMove = (e) => {
      const s = state.current
      if (!s.down) return
      const dx = e.clientX - s.startX
      const dy = e.clientY - s.startY
      s.moved = Math.max(s.moved, Math.hypot(dx, dy))
      if (s.moved > DRAG_THRESHOLD) {
        setDragging(true)
        applyOffset({ x: s.originX + dx, y: s.originY + dy })
      }
    }
    const onUp = () => {
      if (!state.current.down) return
      state.current.down = false
      setDragging(false)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [applyOffset])

  const onWheel = (e) => {
    const dominant = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    applyOffset({ x: offset.x - dominant, y: offset.y - e.deltaY })
  }

  const onClickCapture = (e) => {
    if (state.current.moved > DRAG_THRESHOLD) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  return (
    <div
      ref={nodeRef}
      className={`canvas${dragging ? ' dragging' : ''}`}
      onPointerDown={onPointerDown}
      onWheel={onWheel}
      onClickCapture={onClickCapture}
    >
      <div
        className="world"
        style={{
          width: world.width,
          height: world.height,
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
