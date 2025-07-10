import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [average, setAverage] = useState<number>(0);
  const [userReview, setUserReview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get(`/film/${id}`)
      .then(res => {
        setMovie(res.data.film);
        setAverage(res.data.averageRating);
        setUserReview(res.data.userReview);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Yükleniyor...</p>;
  if (!movie) return <p style={{ textAlign: "center" }}>Film bulunamadı.</p>;

  return (
    <div style={{ padding: 30, maxWidth: 800, margin: "100px auto", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center", color: "#0047AB" }}>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "100%", borderRadius: 10, marginBottom: 20 }}
      />
      <p><strong>Ortalama Puan:</strong> {average.toFixed(2)}</p>
      {userReview && (
        <>
          <p><strong>Sizin Puanınız:</strong> {userReview.rating}</p>
          <p><strong>Sizin Notunuz:</strong> {userReview.note}</p>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
