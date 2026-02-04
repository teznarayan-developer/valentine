import { useState } from "react";
import "../styles/NameEntry.css";

const NameEntry = ({ onNameSubmit }) => {
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState("");

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputName.trim()) {
      setError("Please enter your name!");
      return;
    }

    if (inputName.length > 20) {
      setError("Name is too long!");
      return;
    }

    setError("");

    // 🔥 Send to Netlify
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "valentine-form",
        name: inputName.trim(),
      }),
    });

    onNameSubmit(inputName.trim());
  };


  return (
    <div className="name-entry-container">
      {/* Floating hearts */}
      <div className="hearts-background">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="heart-bg"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
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

        {/* 🔥 NETLIFY FORM START */}
        <form
          name="valentine-form"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="form-container"
        >

          {/* Required hidden input */}
          <input type="hidden" name="form-name" value="valentine-form" />

          <div className="input-group">
            <label htmlFor="name">Enter Your Lovely Name:</label>
            <input
              type="text"
              id="name"
              name="name" // 🔥 important for Netlify
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Type your name here..."
              maxLength={20}
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <button className="submit-btn" type="submit">
            ❤️ Continue to Valentine's Surprise
          </button>
        </form>
        {/* 🔥 NETLIFY FORM END */}

        <div className="instructions">
          <p>
            ℹ️ Once you enter your name, a special Valentine's message awaits!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NameEntry;
