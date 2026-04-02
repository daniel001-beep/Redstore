"use client";

import { useState } from "react";
import { Sparkles, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";

export default function ReviewSummarizer({ productId }: { productId: number }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSummary = async () => {
    setLoading(true);
    setError(null);
    setSummary("");

    try {
      const response = await fetch("/api/summarize-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to generate summary");
      }

      if (!response.body) {
        const text = await response.text();
        if (text && text.trim()) {
          setSummary(text);
        } else {
          setError("No reviews available to summarize.");
        }
        return;
      }

      // toTextStreamResponse sends plain text chunks - just append them
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setSummary(fullText);
      }

      if (!fullText) {
        setError("Could not generate a summary. This product may not have enough reviews.");
      }
    } catch (err: any) {
      console.error("Summary Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-summarizer">
      {/* Decorative Gradient Glow */}
      <div className="review-summarizer-glow"></div>
      
      <div className="flex flex-col gap-6">
        <div className="review-summarizer-header">
          <div className="flex items-center gap-3">
            <div className="review-summarizer-icon">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white leading-none mb-1">Quick Take AI</h3>
              <p className="text-xs text-blue-400/70 font-medium">Gemini-powered review synthesis</p>
            </div>
          </div>
          
          <button
            onClick={getSummary}
            disabled={loading}
            className={`review-summarizer-btn ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              <>
                Summarize Reviews
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="review-summarizer-error">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {summary && (
          <div className="review-summarizer-result">
            <div className="review-summarizer-result-header">
              <CheckCircle2 className="w-4 h-4" />
              Analysis Result
            </div>
            <div className="review-summarizer-result-text">
              {summary}
            </div>
            
            {!loading && (
              <div className="review-summarizer-footer">
                <span>Generated in real-time</span>
                <div className="flex gap-2">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "75ms" }}></div>
                   <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: "150ms" }}></div>
                </div>
              </div>
            )}
          </div>
        )}

        {!summary && !loading && !error && (
          <div className="review-summarizer-empty">
            <p>Need a second opinion? Let our AI assistant summarize the customer sentiment for you instantly.</p>
          </div>
        )}
      </div>
    </div>
  );
}