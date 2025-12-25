import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Bot } from "lucide-react";

export default function FollowUpChat({ contextText }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // 🧠 Here we would call an endpoint like /api/chat
    // Sending both the new question AND the contextText
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, context: contextText }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
    } catch (error) {
      console.error("Chat failed", error);
    }
  };

  return (
    <div className='max-w-2xl mx-auto border-2 border-black bg-white mt-12 mb-20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
      <div className='bg-black text-white p-3 text-xs font-black uppercase tracking-widest flex items-center gap-2'>
        <Bot size={14} /> Tutor Chat
      </div>

      <div className='h-64 overflow-y-auto p-4 space-y-4'>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 text-sm ${
                msg.role === "user"
                  ? "bg-slate-100 italic"
                  : "border-2 border-black font-medium"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className='border-t-2 border-black p-2 flex gap-2'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ask a follow-up question...'
          className='flex-1 px-3 py-2 text-sm outline-none'
        />
        <button
          onClick={sendMessage}
          className='bg-black text-white p-2 hover:invert transition-all'
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
