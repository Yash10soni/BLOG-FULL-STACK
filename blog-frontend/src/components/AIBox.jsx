import axios from "axios";
import { useState } from "react";
import "./AIBox.css";

function AIBox() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    if (!prompt.trim()) return alert("Type something!");

    try {
      const res = await axios.post("http://localhost:5000/api/ai/ask", {
        prompt,
      });

      setResponse(res.data.response);
    } catch (err) {
      setResponse("Server error.");
    }
  };

  return (
    <div className="ai-container">
      <h2 className="title">Ask Grok AI 🤖</h2>

      <input
        type="text"
        className="ai-input"
        placeholder="Ask something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button className="ai-btn" onClick={askAI}>
        Ask
      </button>

      <h3 className="response-title">AI Response:</h3>
      <pre className="ai-response">{response}</pre>
    </div>
  );
}

export default AIBox;
