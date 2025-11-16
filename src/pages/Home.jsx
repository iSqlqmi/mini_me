import { useNavigate } from "react-router-dom";
import homepageLogo from "../images/Homepage_logo.png";
import React, { useState } from 'react';

export const Home = () => {
  return (
    <div>

      {/* Hero / Title Section */}
      <section id="hero" className="section hero-section">
        <h1>Welcome to MiniMe!</h1>
        <img src={homepageLogo} alt="Homepage Logo" />

        <button onClick={() => scrollToSection("description")}>
          Learn More ↓
        </button>
      </section>

      {/* Description Section */}
      <section id="description" className="section description-section">
        <p>Hi welcome to MiniMe! MiniMe can help you keep track of your daily needs </p>
        <p>sending you basic reminders to eat, sleep, and take a break! To get started </p>
        <p>click on the "Get Started" button below to try MiniMe today!</p>

      </section>

      <section id="getName" className="section get-name">
        <EditableTextBox />
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="section start-section">
        <GetStartedButton />
      </section>

    </div>
  );
};

// Smooth scrolling function
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function GetStartedButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/dashboard")}>Get Started!</button>;
}

function EditableTextBox() {
  const [text, setText] = useState('');

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}

export default Home;