import React, { useState } from 'react'
import Answer from './components/Answer'
import Celebration from './components/Celebration'

const App = () => {
  const [celebrate, setCelebrate] = useState(false)

  return (
    <div className="flex justify-center items-center bg-pink-200 min-h-screen p-4">
      {celebrate ? (
        <Celebration />
      ) : (
        <Answer onYes={() => setCelebrate(true)} />
      )}
    </div>
  )
}

export default App