const API_GATEWAY_URL =
  import.meta.env.VITE_API_GATEWAY_URL || "http://localhost:8762";

const ORDERS_URL = `${API_GATEWAY_URL}/orders-service/api/orders`;

export async function createOrder(cart) {
  const opaqueToken = localStorage.getItem("opaqueToken");
  const savedUser = JSON.parse(localStorage.getItem("user"));

  console.log("Token opaco enviado a orders:", opaqueToken);
  console.log("Usuario guardado:", savedUser);

  if (!opaqueToken) {
    throw new Error("No hay token opaco guardado. Vuelve a iniciar sesión.");
  }

  if (!savedUser?.id) {
    throw new Error("No hay usuario guardado. Vuelve a iniciar sesión.");
  }

  const requestBody = {
    targetMethod: "POST",
    queryParams: null,
    body: {
      userId: String(savedUser.id),
      items: cart.map((item) => ({
        bookId: Number(item.id),
        quantity: item.quantity || 1,
      })),
    },
  };

  const response = await fetch(ORDERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accessToken: opaqueToken,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.body?.message ||
        `Error al crear el pedido: ${response.status}`
    );
  }

  return data?.body ?? data;
}