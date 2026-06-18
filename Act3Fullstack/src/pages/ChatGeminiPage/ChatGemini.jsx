import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Bot, Send, UserRound, Sparkles } from "lucide-react";
import {
  connectChat,
  disconnectChat,
  sendChatMessage,
} from "../../services/chatWebSocketService";
import "./ChatGemini.css";

export default function ChatGemini() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [error, setError] = useState("");
  const messagesContainerRef = useRef(null);

  /**
   * Al entrar en la página /chat, subimos la ventana arriba.
   * Esto evita que React Router mantenga el scroll de la página anterior.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  /**
   * Conexión con el WebSocket del chat.
   */
  useEffect(() => {
    try {
      connectChat((response) => {
        setChat((prev) => [
          ...prev,
          {
            type: "agent",
            text:
              response.agentResponse ||
              response.message ||
              "No he podido generar una respuesta.",
          },
        ]);
      });
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el agente virtual.");
    }

    return () => {
      disconnectChat();
    };
  }, []);

  /**
   * Hace scroll solo dentro del contenedor de mensajes,
   * no en toda la página.
   */
  useEffect(() => {
    if (chat.length === 0) return;

    const container = messagesContainerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chat]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    setError("");

    setChat((prev) => [
      ...prev,
      {
        type: "user",
        text: cleanMessage,
      },
    ]);

    try {
      sendChatMessage(cleanMessage);
    } catch (err) {
      console.error(err);
      setError("No se pudo enviar el mensaje.");
    }

    setMessage("");
  };

  return (
    <section className="chat-page">
      <motion.div
        className="chat-page-container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="chat-page-header">
          <div className="chat-page-badge">
            <Sparkles size={16} />
            <span>Asistente inteligente</span>
          </div>

          <h1>
            Chat IA de <span>Relatos de Papel</span>
          </h1>

          <p>
            Pregunta por libros, géneros, autores o recomendaciones del catálogo.
          </p>
        </div>

        <div className="chat-card">
          <div className="chat-card-header">
            <div className="chat-agent-avatar">
              <Bot size={24} />
            </div>

            <div>
              <h2>Agente virtual</h2>
              <p>Relatos de Papel</p>
            </div>
          </div>

          <div className="chat-messages" ref={messagesContainerRef}>
            {chat.length === 0 ? (
              <div className="chat-empty">
                <Bot size={56} />
                <p>
                  Hola, soy tu asistente. Pregúntame por un libro, género o
                  recomendación.
                </p>
              </div>
            ) : (
              chat.map((item, index) => (
                <div
                  key={`${item.type}-${index}`}
                  className={`chat-message chat-message-${item.type}`}
                >
                  <div className="chat-message-avatar">
                    {item.type === "user" ? (
                      <UserRound size={16} />
                    ) : (
                      <Bot size={16} />
                    )}
                  </div>

                  <div className="chat-bubble">
                    <span>{item.type === "user" ? "Tú" : "Agente"}</span>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {error && <p className="chat-error">{error}</p>}

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              placeholder="Pregunta por un libro..."
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" disabled={!message.trim()}>
              Enviar
              <Send size={16} />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}