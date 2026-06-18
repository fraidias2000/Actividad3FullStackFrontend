import { Client } from "@stomp/stompjs";

let stompClient = null;

export function connectChat(onMessageReceived) {
  stompClient = new Client({
    brokerURL: "ws://localhost:8762/comms-service/ws",
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("Conectado al chat WebSocket");

      stompClient.subscribe("/topic/chat", (message) => {
        const body = JSON.parse(message.body);
        onMessageReceived(body);
      });
    },

    onStompError: (frame) => {
      console.error("Error STOMP", frame);
    },

    onWebSocketError: (error) => {
      console.error("Error WebSocket", error);
    },
  });

  stompClient.activate();
}

export function sendChatMessage(message, userId = null) {
  if (!stompClient || !stompClient.connected) {
    console.error("WebSocket no conectado");
    return;
  }

  stompClient.publish({
    destination: "/app/chat",
    body: JSON.stringify({
      message,
      userId,
    }),
  });
}

export function disconnectChat() {
  if (stompClient) {
    stompClient.deactivate();
  }
}