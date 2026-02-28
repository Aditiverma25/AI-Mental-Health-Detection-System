const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

interface AuthResponse {
  user: { id: string; email: string };
  token: string;
}

async function request(path: string, options: RequestInit = {}) {
  const resp = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include",
    ...options,
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.message || "Request failed");
  return data;
}

// auth
export async function register(email: string, password: string): Promise<AuthResponse> {
  return request(`/auth/register`, { method: "POST", body: JSON.stringify({ email, password }) });
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  return request(`/auth/login`, { method: "POST", body: JSON.stringify({ email, password }) });
}

// prediction
export async function analyzeJournal(text: string) {
  return request(`/prediction`, { method: "POST", body: JSON.stringify({ type: "journal", data: text }) });
}

export async function analyzePHQ(answers: number[]) {
  return request(`/prediction`, { method: "POST", body: JSON.stringify({ type: "phq", data: answers }) });
}

// chatbot
export async function chat(message: string) {
  return request(`/chatbot`, { method: "POST", body: JSON.stringify({ message }) });
}
