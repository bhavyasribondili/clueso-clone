import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(null);
  const [notes, setNotes] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [loadingSummarize, setLoadingSummarize] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackInput, setFeedbackInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");

    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
        if (res.data.length > 0) setActive(res.data[0]._id);

        const feedbackData = {};
        for (let p of res.data) {
          const fRes = await api.get(`/feedback/${p._id}`);
          feedbackData[p._id] = fRes.data || [];
        }
        setFeedbacks(feedbackData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [navigate]);

  const summarize = async () => {
    if (!notes[active]) return;
    setLoadingSummarize(true);
    setError(null);
    try {
      const res = await api.post("/ai/summarize", {
        text: notes[active],
      });
      setNotes({
        ...notes,
        [active]: notes[active] + "\n\nAI Summary:\n" + res.data.summary,
      });
    } catch {
      setError("Failed to summarize. Please try again.");
    } finally {
      setLoadingSummarize(false);
    }
  };

  const addFeedback = async () => {
    if (!feedbackInput.trim()) return;
    setLoadingFeedback(true);
    setError(null);
    try {
      const res = await api.post(`/feedback/${active}`, {
        text: feedbackInput.trim(),
      });

      setFeedbacks({
        ...feedbacks,
        [active]: [...(feedbacks[active] || []), res.data],
      });
      setFeedbackInput("");
    } catch {
      setError("Failed to add feedback. Please try again.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: 220, padding: 20, borderRight: "1px solid #ddd" }}>
        <h3>Products</h3>
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => setActive(p._id)}
            style={{
              padding: 10,
              marginBottom: 8,
              borderRadius: 5,
              cursor: "pointer",
              backgroundColor: active === p._id ? "#007bff" : "#f1f1f1",
              color: active === p._id ? "#fff" : "#000",
            }}
          >
            {p.name}
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: 25 }}>
        <h2>Dashboard</h2>

        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

        <textarea
          rows={10}
          placeholder="Write walkthrough notes..."
          value={notes[active] || ""}
          onChange={(e) => setNotes({ ...notes, [active]: e.target.value })}
          style={{ width: "100%", padding: 10 }}
        />

        <button
          onClick={summarize}
          disabled={loadingSummarize || !notes[active]}
          style={{ marginTop: 10 }}
        >
          {loadingSummarize ? "Summarizing..." : "Summarize with AI"}
        </button>

        {/* Feedback Section */}
        <div style={{ marginTop: 30, maxWidth: 600 }}>
          <h3>Feedback</h3>

          {feedbacks[active]?.length ? (
            feedbacks[active].map((f, i) => (
              <div
                key={i}
                style={{
                  background: "#f5f5f5",
                  padding: 10,
                  marginBottom: 8,
                  borderRadius: 4,
                }}
              >
                <div>{f.text}</div>
                {f.createdAt && (
                  <small style={{ color: "#666" }}>
                    {new Date(f.createdAt).toLocaleString()}
                  </small>
                )}
              </div>
            ))
          ) : (
            <p style={{ color: "#666" }}>No feedback yet.</p>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <input
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              placeholder="Add feedback..."
              style={{ flex: 1, padding: 8 }}
            />
            <button
              onClick={addFeedback}
              disabled={loadingFeedback || !feedbackInput.trim()}
            >
              {loadingFeedback ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
