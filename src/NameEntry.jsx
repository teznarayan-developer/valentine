import { useState } from 'react'
import '../styles/NameEntry.css'

const NameEntry = ({ onNameSubmit }) => {
  const [inputName, setInputName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputName.trim()) {
      setError('Please enter your name!')
      return
    }
    if (inputName.length > 20) {
      setError('Name is too long!')
      return
    }
    setError('')
    onNameSubmit(inputName.trim())
  }

  return (
    <div className="name-entry-container">
      <div className="hearts-background">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="heart-bg"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      
      <div className="name-entry-card">
        <div className="header">
          <h1>💘 Valentine's Day Special 💘</h1>
          <p>Let's make this Valentine's Day unforgettable!</p>
        </div>
        
        <div className="form-container">
          <div className="input-group">
            <label htmlFor="name">Enter Your Lovely Name:</label>
            <input
              type="text"
              id="name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Type your name here..."
              maxLength={20}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          
          <button 
            className="submit-btn"
            onClick={handleSubmit}
          >
            <i className="fas fa-heart"></i> Continue to Valentine's Surprise
          </button>
        </div>
        
        <div className="instructions">
          <p><i className="fas fa-info-circle"></i> Once you enter your name, a special Valentine's message awaits!</p>
        </div>
      </div>
    </div>
  )
}

export default NameEntry