import { useState, useEffect } from 'react'
import './App.css'
import NameEntry from './NameEntry'
import ValentineProposal from './ValentineProposal'

function App() {
  const [name, setName] = useState('')
  const [showProposal, setShowProposal] = useState(false)
  const [valentineName, setValentineName] = useState('')

  const handleNameSubmit = (enteredName) => {
    setValentineName(enteredName)
    setName(enteredName)
    setShowProposal(true)
  }

  const handleReset = () => {
    setName('')
    setValentineName('')
    setShowProposal(false)
  }

  return (
    <div className="App">
      {!showProposal ? (
        <NameEntry onNameSubmit={handleNameSubmit} />
      ) : (
        <ValentineProposal 
          name={valentineName} 
          onReset={handleReset}
        />
      )}
    </div>
  )
}

export default App