import axios from "axios"

function buildApiBaseUrl() {
  const raw = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api"
  const normalized = raw.replace(/\/+$/, "")

  if (normalized.endsWith("/api")) {
    return normalized
  }

  return `${normalized}/api`
}

const api = axios.create({
  baseURL: buildApiBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

export default api
