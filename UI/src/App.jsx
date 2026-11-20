import { useState } from "react";

const sample = {
  claim: "Reduces wrinkles by 20% in 4 weeks",
  formula: "Face cream formula",
  evidence: "Fictional study: 40 adults used the cream for 4 weeks. Wrinkle depth fell by 12% on average. No control group was used.",
};

function App() {
  const [input, setInput] = useState({ claim: "", formula: "", evidence: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function assess(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/claims/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Assessment failed");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function update(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  return (
    <main>
      <h1>Claims Intelligence Engine</h1>
      <p>Check if study evidence supports a product claim.</p>

      <form onSubmit={assess}>
        <label>Claim<input name="claim" value={input.claim} onChange={update} required maxLength="500" /></label>
        <label>Product formula<textarea name="formula" value={input.formula} onChange={update} required maxLength="5000" rows="3" /></label>
        <label>Study evidence<textarea name="evidence" value={input.evidence} onChange={update} required maxLength="20000" rows="6" /></label>
        <div className="actions">
          <button type="submit" disabled={loading}>{loading ? "Assessing..." : "Assess claim"}</button>
          <button type="button" className="secondary" onClick={() => setInput(sample)}>Load fictional sample</button>
        </div>
      </form>

      {error && <p className="error" role="alert">{error}</p>}
      {result && <section aria-live="polite">
        <h2>Assessment</h2>
        <p><strong>Justified:</strong> {result.justified ? "Yes" : "No"}</p>
        <p><strong>Confidence score:</strong> {result.confidence}/100</p>
        <p><strong>Reasoning:</strong> {result.reasoning}</p>
        <small>Saved assessment ID: {result.id}</small>
      </section>}
    </main>
  );
}

export default App;
