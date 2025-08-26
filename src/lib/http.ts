// src/lib/http.ts
import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  withCredentials: true, // drop if you don’t need cookies
  headers: { "Content-Type": "application/json" },
});
