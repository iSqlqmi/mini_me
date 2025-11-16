import React from "react";

export default function Alert({ message, onClose }) {
  return (
    <div style={overlay}>
      <div style={box}>
        <p style={text}>{message}</p>
        <button style={button} onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

/* ---------- Inline Styles ---------- */
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const box = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  minWidth: "240px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
};

const text = {
  marginBottom: "15px",
  fontSize: "18px",
};

const button = {
  padding: "8px 16px",
  fontSize: "16px",
  background: "#F1BBE0",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
