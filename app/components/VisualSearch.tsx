"use client";

import { useState } from "react";
import { Camera, Search, X } from "lucide-react";

export default function VisualSearch() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [aiDescription, setAiDescription] = useState("");
  const [visualOpen, setVisualOpen] = useState(false);

  const handleSearch = async () => {
    if (!file) return;
    setLoading(true);
    setResults([]);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/visual-search", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.results);
        setAiDescription(data.aiDescription);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-12 w-full max-w-3xl mx-auto">
      {/* Primary Search Bar */}
      <div className="relative w-full group">
          <input 
              type="text" 
              placeholder="Search for a product..." 
              className="w-full bg-white/10 backdrop-blur-md text-white rounded-full py-4 pl-12 pr-16 border border-white/20 focus:border-blue-500 outline-none shadow-lg text-lg transition-all focus:bg-white/15" 
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={24} />
          <button 
             onClick={() => setVisualOpen(!visualOpen)} 
             className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${visualOpen ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
             title="Visual Search with Camera"
          >
             <Camera size={24} />
          </button>
      </div>

      {visualOpen && (
        <div className="mt-6 glass-card p-6 rounded-2xl border border-blue-500/30 bg-blue-900/10 backdrop-blur-xl animate-fade-in relative shadow-2xl">
          <button onClick={() => setVisualOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
             <X size={20} />
          </button>
          
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Camera size={20} className="text-blue-400" /> Snap & Shop
          </h3>
          <p className="text-sm text-gray-300 mb-4">Upload an image and Gemini will magically find similar items in our inventory.</p>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <label className="flex-1 w-full cursor-pointer group">
              <div className="border-2 border-dashed border-white/20 bg-black/20 rounded-xl p-4 text-center group-hover:border-blue-500 transition-colors">
                <span className="text-gray-400 group-hover:text-blue-400 text-sm">
                    {file ? file.name : "Click to select or drag & drop an image"}
                </span>
                <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                 />
              </div>
            </label>
            <button 
                onClick={handleSearch}
                disabled={!file || loading}
                className={`btn px-6 py-3 rounded-xl font-bold transition-all text-sm w-full md:w-auto ${loading ? 'opacity-50' : 'hover:scale-105 active:scale-95'}`}
            >
                {loading ? "Analyzing..." : "Search"}
            </button>
          </div>

          {aiDescription && (
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-200 text-sm italic">
                <strong>Gemini:</strong> {aiDescription}
              </div>
          )}

          {results.length > 0 && (
              <div className="mt-6">
                  <h4 className="text-sm font-semibold text-white mb-3">Found {results.length} matching products:</h4>
                  <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                      {results.map((p) => (
                          <div key={p.id} className="min-w-[140px] bg-white/10 p-2 rounded-lg border border-white/10 hover:border-blue-500 transition-colors">
                              <img src={p.imageUrl} alt={p.name} className="w-full h-24 object-cover rounded-md mb-2 shadow-md" />
                              <p className="text-xs font-bold text-white truncate">{p.name}</p>
                              <p className="text-xs text-blue-400">${p.price}</p>
                          </div>
                      ))}
                  </div>
              </div>
          )}
        </div>
      )}
    </div>
  );
}
