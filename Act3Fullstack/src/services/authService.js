const API_GATEWAY_URL =
  import.meta.env.VITE_API_GATEWAY_URL || "http://localhost:8762";

const AUTH_LOGIN_URL = `${API_GATEWAY_URL}/users-service/api/auth/login`;

export async function loginUser(email, password) {
  const requestBody = {
    targetMethod: "POST",
    queryParams: null,
    body: {
      email,
      password,
    },
  };

  const response = await fetch(AUTH_LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.body?.message ||
        "Correo o contraseña incorrectos."
    );
  }

  return data?.body ?? data;
}