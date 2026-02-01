import React, { useState, useEffect } from 'react'

const Celebration = () => {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selected])

  const photos = ['/Photo1.JPG', '/Photo2.PNG', '/Photo3.PNG','/Photo4.PNG']

  return (
    <div className="flex flex-col items-center text-center gap-6 w-full px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 flex flex-col items-center">
  <img src="/yes.gif" alt="celebration" className="w-64 md:w-96 lg:w-[480px] h-auto" />
        <h2 className="text-2xl md:text-3xl font-bold mt-4">Yes,I love you babe 💖</h2>

        <p className="mt-2 text-gray-600">Some of our cute moments:</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4 w-full">
          {photos.map((p) => (
            <button
              key={p}
              onClick={() => setSelected(p)}
              className="overflow-hidden rounded focus:outline-none"
              aria-label={`Open ${p}`}
            >
              <img
                src={p}
                alt={p}
                className="w-full h-40 lg:h-56 object-cover rounded transform transition-transform duration-200 hover:scale-105 "
              />
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setSelected(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg z-50"
              onClick={(e) => {
                e.stopPropagation()
                setSelected(null)
              }}
              aria-label="Close"
            >
              ✕
            </button>
            <img
              src={selected}
              alt="selected"
              className="max-w-[100vw] max-h-[100vh] lg:max-w-[80vw] lg:max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Celebration
