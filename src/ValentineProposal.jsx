import { useState, useEffect, useRef } from 'react'
import '../styles/ValentineProposal.css'

const ValentineProposal = ({ name, onReset }) => {
  const [noPosition, setNoPosition] = useState({ x: 50, y: 50 })
  const [yesCount, setYesCount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [hearts, setHearts] = useState([])
  const [noButtonSize, setNoButtonSize] = useState({ width: 120, height: 50 })
  const [noClicks, setNoClicks] = useState(0)
  const [isNoButtonVisible, setIsNoButtonVisible] = useState(true)
  const containerRef = useRef(null)
  const messageRef = useRef(null)

  const messages = [
    "Yay! You've made me the happiest person! 💖",
    "I knew you'd say yes! My heart is dancing! 💃",
    "This is the best Valentine's Day ever! 🥰",
    "My love for you grows stronger every day! 🌹",
    "You are my sunshine on cloudy days! ☀️",
    "Together forever, starting today! 💕",
    "My heart skipped a beat when you said yes! 💓",
    "You've just made all my dreams come true! ✨",
    "I promise to cherish you every single day! 💝",
    "This is the beginning of our forever story! 📖"
  ]

  const handleYesClick = () => {
    setYesCount(prev => prev + 1)
    setMessageIndex(Math.floor(Math.random() * messages.length))
    setShowMessage(true)

    // Create floating hearts - darker colors
    const newHearts = [...Array(8)].map(() => ({
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: 100,
      color: `hsl(${Math.random() * 20 + 330}, 100%, ${Math.random() * 20 + 50}%)`, // Darker pink/red
      size: Math.random() * 20 + 20,
      speed: Math.random() * 3 + 2
    }))
    setHearts(prev => [...prev, ...newHearts])

    // Auto-hide message after 3 seconds
    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }

  const moveNoButton = () => {
    if (!containerRef.current) return

    // Ensure button stays within container bounds
    const maxX = 85  // Max percentage from left
    const minX = 15  // Min percentage from left
    const maxY = 85  // Max percentage from top
    const minY = 15  // Min percentage from top

    const newX = Math.random() * (maxX - minX) + minX
    const newY = Math.random() * (maxY - minY) + minY

    // Make button smaller with each click
    const newWidth = Math.max(80, 120 - noClicks * 10)
    const newHeight = Math.max(40, 50 - noClicks * 5)

    setNoPosition({ x: newX, y: newY })
    setNoButtonSize({ width: newWidth, height: newHeight })
    setIsNoButtonVisible(true)
  }

  const handleNoHover = () => {
    moveNoButton()
  }

  const handleNoClick = () => {
    setNoClicks(prev => prev + 1)
    moveNoButton()

    // Occasionally hide the button for a moment
    if (noClicks > 3 && Math.random() > 0.7) {
      setIsNoButtonVisible(false)
      setTimeout(() => {
        setIsNoButtonVisible(true)
        moveNoButton()
      }, 800 + Math.random() * 1200)
    }
  }

  const handleResetClick = () => {
    onReset()
  }

  // Update hearts animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev =>
        prev
          .map(heart => ({
            ...heart,
            y: heart.y - heart.speed,
            x: heart.x + Math.sin(heart.y * 0.05) * 0.5
          }))
          .filter(heart => heart.y > -10)
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Move no button periodically to make it more challenging
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        moveNoButton()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [noClicks])

  // Close message when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setShowMessage(false)
      }
    }

    if (showMessage) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showMessage])

  const normalizedName = name.toLowerCase().trim();

  let heading = "💌 Will You Be My Valentine? 💌";
  let subMessage = `Dear ${name},`;

  if (/bug+i+/i.test(normalizedName)) {
    heading = "💖 A Special Valentine Invitation 💖";
    subMessage = `Dear ${name},  
Tejnarayan is inviting you to be his Valentine and make this day full of love, smiles, and beautiful memories together. 🌹`;
  }
  if (normalizedName === "swati") {
    heading = "💖 A Special Valentine Invitation 💖";
    subMessage = `Dear ${name},  
Tejnarayan is inviting you to be his Valentine and make this day full of love, smiles, and beautiful memories together. 🌹`;
  }
  else if (normalizedName === "poonam") {
    heading = "💘 A Heartfelt Valentine Invite 💘";
    subMessage = `Dear ${name},  
Kunal has invited you to be his Valentine and celebrate a day filled with love, joy, and sweet moments. 💐`;
  }


  return (
    <div className="proposal-container">
      {/* Floating hearts with darker colors */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            color: heart.color,
            fontSize: `${heart.size}px`,
            filter: `drop-shadow(0 0 3px ${heart.color})`,
            opacity: 0.9,
            zIndex: 1
          }}
        >
          ❤️
        </div>
      ))}

      <div className="proposal-card">
        <div className="proposal-header">
          {/* <h1>💌 Will You Be My Valentine? 💌</h1> */}
          <div className="name-display">
            <span className="heart-icon">❤️</span>
            <h1>{heading}</h1>
            <h2 style={{ whiteSpace: "pre-line" }}>{subMessage}</h2>
            <span className="heart-icon">❤️</span>
          </div>
        </div>

        <div className="proposal-content" ref={containerRef}>
          <div className="love-message">
            <p>
              My heart has been waiting for this moment to ask you the most important question...
            </p>
            <p className="question">
              Will you make me the happiest person and be my Valentine?
            </p>

          </div>

          <div className="buttons-container">
            <button
              className="yes-btn"
              onClick={handleYesClick}
            >
              <i className="fas fa-heart"></i> YES
            </button>

            {isNoButtonVisible && (
              <button
                className="no-btn"
                style={{
                  left: `${noPosition.x}%`,
                  top: `${noPosition.y}%`,
                  width: `${noButtonSize.width}px`,
                  height: `${noButtonSize.height}px`,
                  opacity: Math.max(0.7, 1 - noClicks * 0.1),
                  fontSize: `${Math.max(14, 18 - noClicks)}px`
                }}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                onClick={handleNoClick}
              >
                <i className="fas fa-times"></i> No
              </button>
            )}
          </div>

          {/* Love Messages Popup - Now properly positioned */}
          {showMessage && (
            <div className="message-popup-container" ref={messageRef}>
              <div className="message-popup">
                <div className="message-content">
                  <p>{messages[messageIndex]}</p>
                  <div className="sparkle">✨</div>
                  <div className="sparkle sparkle-2">✨</div>
                  <div className="sparkle sparkle-3">✨</div>
                </div>
                <button
                  className="close-message-btn"
                  onClick={() => setShowMessage(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}

          {!isNoButtonVisible && (
            <div className="no-button-hint">
              <i className="fas fa-search"></i>
              Where did the "No" button go? Keep looking!
            </div>
          )}
        </div>

        <div className="instructions">
          <p><i className="fas fa-mouse-pointer"></i> Tip: The "No" button runs away when you try to click it! The more you try, the smaller it gets!</p>
          <p><i className="fas fa-lightbulb"></i> Keep clicking "Yes" for more romantic messages!</p>
        </div>


      </div>
    </div>
  )
}

export default ValentineProposal