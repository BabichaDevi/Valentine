import React, { useRef, useState } from 'react'

const Answer = ({ onYes }) => {
  const containerRef = useRef(null)
  const [noPos, setNoPos] = useState(null)
  const yesRef = useRef(null)

  const handleNoHover = (e) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    let clientX = 0
    let clientY = 0
    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else if (e.clientX !== undefined) {
      clientX = e.clientX
      clientY = e.clientY
    }

    const btnW = 96 
    const btnH = 40 
    const padding = 8

    const maxLeft = Math.max(rect.width - btnW - padding, padding)
    const maxTop = Math.max(rect.height - btnH - padding, padding)

    let attempts = 0
    let left, top, dist
    const yesRectAbs = yesRef.current ? yesRef.current.getBoundingClientRect() : null
    const yesLeftRel = yesRectAbs ? yesRectAbs.left - rect.left : null
    const yesTopRel = yesRectAbs ? yesRectAbs.top - rect.top : null
    const yesW = yesRectAbs ? yesRectAbs.width : 0
    const yesH = yesRectAbs ? yesRectAbs.height : 0

    const overlapsYes = (l, t) => {
      if (!yesRectAbs) return false
      const noLeft = l
      const noTop = t
      const noRight = l + btnW
      const noBottom = t + btnH
      const yesRight = yesLeftRel + yesW
      const yesBottom = yesTopRel + yesH
      return !(noRight < yesLeftRel || noLeft > yesRight || noBottom < yesTopRel || noTop > yesBottom)
    }

    do {
      left = Math.floor(padding + Math.random() * (maxLeft - padding))
      top = Math.floor(padding + Math.random() * (maxTop - padding))

      const btnCenterX = rect.left + left + btnW / 2
      const btnCenterY = rect.top + top + btnH / 2

      const dx = btnCenterX - clientX
      const dy = btnCenterY - clientY
      dist = Math.sqrt(dx * dx + dy * dy)
      if (overlapsYes(left, top)) dist = 0
      attempts++
    } while (dist < 120 && attempts < 30)

    setNoPos({ left, top })
  }

  return (
    <div className="flex flex-col items-center text-center gap-4 w-full px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-4 sm:p-6 flex flex-col items-center">
        <img src="/proposal.gif" alt="proposal" className="w-56 sm:w-80 md:w-96 h-auto" />
        <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold mt-4">Will you be my Valentine, Kenela Ngangom? 💖</h1>

          <div
            ref={containerRef}
            className="relative p-4 rounded w-full max-w-md h-36 mt-6"
          >
            <button
              ref={yesRef}
              className="absolute left-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
              onClick={() => {
                setNoPos(null)
                if (typeof onYes === 'function') onYes()
              }}
            >
              Yes
            </button>

            <button
              className="absolute px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
              style={
                noPos
                  ? { left: `${noPos.left}px`, top: `${noPos.top}px` }
                  : { right: '12px', top: '50%', transform: 'translateY(-50%)' }
              }
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              onTouchMove={handleNoHover}
              onClick={() => alert('Oh no! You clicked No')}
            >
              No
            </button>
          </div>
      </div>
    </div>
  )
}

export default Answer