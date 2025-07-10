import React, { useEffect, useState } from "react";
import api from "../services/api";

const PopularActors: React.FC = () => {
  const [actors, setActors] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const fetchActors = async (pageNumber: number, searchQuery = "") => {
    setLoading(true);
    try {
      const endpoint = searchQuery
        ? `/actor/search?query=${searchQuery}&page=${pageNumber}`
        : `/actor/popular?page=${pageNumber}`;

      const response = await api.get(endpoint);
      const newActors = (response.data.results || []).filter(
        (actor: any) => actor.name !== "Kanako Ueda" && actor.profile_path
      );

      if (pageNumber === 1) {
        setActors(newActors);
      } else {
        setActors((prev) => [...prev, ...newActors]);
      }
    } catch (err) {
      console.error("Oyuncular alınamadı", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActors(1);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchActors(1, query.trim());
  };

  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchActors(nextPage, query.trim());
  };

  return (
    <div
      style={{
        paddingTop: 100,
        paddingBottom: 60,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0047AB, #FFD700)",
        width: "100vw",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: 20,
          fontSize: 28,
        }}
      >
        Popüler Oyuncular
      </h2>

      <form
        onSubmit={handleSearchSubmit}
        style={{
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        <input
          type="text"
          placeholder="Oyuncu Adı"
          value={query}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: 10,
            padding: "10px 20px",
            fontSize: 16,
            backgroundColor: "#0047AB",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Ara
        </button>
      </form>

      { }
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
          padding: "0 20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {actors.map((actor) => (
          <div
            key={actor.id}
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              overflow: "hidden",
              textAlign: "center",
              width: "100%", 
              height: 350,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              style={{
                width: "100%",
                height: 280,
                objectFit: "cover",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <div style={{ padding: 10 }}>
              <h4
                style={{
                  margin: "10px 0",
                  color: "#0047AB",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {actor.name}
              </h4>
              
              
            </div>
          </div>
        ))}
      </div>

      {actors.length > 0 && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button
            onClick={handleNext}
            disabled={loading}
            style={{
              padding: "10px 20px",
              fontSize: 16,
              backgroundColor: "#0047AB",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {loading ? "Yükleniyor..." : "Daha Fazla Göster"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PopularActors;
