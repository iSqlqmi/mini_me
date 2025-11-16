import { useNavigate } from "react-router-dom";
import homeLogo from "../images/homelogo.png";
import { useState, useEffect } from "react";

export const Home = () => {
  return (
    <div>

      {/* Hero / Title Section */}
      <section id="hero" className="section hero-section">
        <img src={homeLogo} alt="Homepage Logo"/>
        <h1>Welcome to MiniMe</h1>
        <p style={{ fontSize: "30px" }}>A gentle companion that helps you take care of yourself, without adding to your busy days.</p>
            <div className="green-box">
                <div className="text-box">
                    <EditableTextBox />
                </div>
            <div className="start-section">
                <GetStartedButton />
            </div>
      </div>
        {/* <button onClick={() => scrollToSection("description")}>
          Learn More ↓
        </button> */}
      </section>

      {/* <section id="getName" className="section get-name">
        <h2>Type and save your name then click on the "Get Started!" button :) </h2>
       <EditableTextBox /> 
      </section>

      {/* Get Started Section */}
      {/* <section id="get-started" className="section start-section">
        <GetStartedButton />
      </section> */}

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

/* -------- Editable Text Box Component -------- */
function EditableTextBox() {
  const [input, setInput] = useState("");

  // Load saved data when component loads
  useEffect(() => {
    const saved = localStorage.getItem("userText");
    if (saved) setInput(saved);
  }, []);



  return (
    <div style={{ marginTop: "20px" }}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write your name!"
        style={{
          width: "300px",
          height: "35px",
          padding: "10px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black"
        }}
      />

      <br />
    </div>
  );
}

export default Home;