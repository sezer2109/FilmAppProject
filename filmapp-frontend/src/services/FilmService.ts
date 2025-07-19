import api from "./api";
import type { IMovie } from "../models/IMovie";
import type { IUserReview } from "../models/IUserReview";

export const getPopularMovies = async (page: number, limit: number): Promise<IMovie[]> => {
  const response = await api.get(`/film/popular?page=${page}&limit=${limit}`);
  return response.data.results || [];
};

export const searchMovies = async (query: string): Promise<IMovie[]> => {
  const response = await api.get(`/film/search?query=${encodeURIComponent(query)}&limit=100`);
  return response.data.results || [];
};

export const submitReview = async (movieId: number, rating: number, note: string): Promise<void> => {
  await api.post(`/film/${movieId}/review`, { rating, note });
};

export const getMovieById = async (id: string): Promise<{
  film: IMovie;
  averageRating: number;
  userReview: IUserReview | null;
}> => {
  const response = await api.get(`/film/${id}`);
  return response.data;
};
