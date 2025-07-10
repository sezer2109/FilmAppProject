import React, { useState } from "react";
import api from "../services/api";

const MovieSuggest: React.FC = () => {
  const [filmName, setFilmName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/film/suggest", { filmName });
      setMessage(res.data.message);
      setFilmName("");
    } catch (err) {
      setMessage("Film önerisi gönderilemedi.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",  
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0047AB, #FFD700)",
        fontFamily: "'Segoe UI', sans-serif",
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        overflow: "auto",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: 40,
          borderRadius: 10,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          width: 400,
          textAlign: "center",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ color: "#0047AB", marginBottom: 20 }}>Film Öner</h2>
        <input
          type="text"
          placeholder="Önerdiğiniz filmi yazın..."
          value={filmName}
          onChange={(e) => setFilmName(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 5,
            border: "1px solid #ccc",
            marginBottom: 15,
            fontSize: 16,
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#0047AB",
            color: "white",
            fontWeight: "bold",
            padding: 10,
            borderRadius: 5,
            border: "none",
            cursor: "pointer",
            width: "100%",
            fontSize: 16,
          }}
        >
          Gönder
        </button>
        {message && (
          <p style={{ color: "#0047AB", marginTop: 15 }}>{message}</p>
        )}
      </form>
    </div>
  );
};

export default MovieSuggest;
