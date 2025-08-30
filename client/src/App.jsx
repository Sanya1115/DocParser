import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [theme, setTheme] = useState("dark");
  const [summaryLength, setSummaryLength] = useState("short");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setSummary("");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/summary?length=${summaryLength}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSummary(res.data.text);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong! Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary)
      .then(() => alert("Summarized text copied to clipboard!"))
      .catch((err) => console.error("Could not copy text: ", err));
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const fileBlob = new Blob([summary], { type: "text/plain" });
    element.href = URL.createObjectURL(fileBlob);
    element.download = "summary.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="header-content">
          <h1 className="app-title">
           
            <svg className="app-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            DocParser
          </h1>
          <br />
         
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          
        </div>
        
      </header>
      <div><h2>Get quick summaries of your documents....</h2></div>
      

      <main className="main-content">
        <section className="input-section">
          <h2>Upload Document</h2>
          <div
            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="drop-zone-text">Drag & Drop your file here</p>
            <p className="or-text">or</p>
            <label htmlFor="file-upload" className="file-upload-label">
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="file-input"
            />
            <span className="file-name">{file ? file.name : "No file chosen"}</span>
          </div>

          <div className="form-group">
            <label htmlFor="summary-length"><b>Summary Length</b></label>
            <div className="select-container">
              <select
                id="summary-length"
                value={summaryLength}
                onChange={(e) => setSummaryLength(e.target.value)}
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
              <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </div>
          </div>
          
          <button type="submit" className="submit-button" onClick={handleUpload} disabled={!file || loading}>
            {loading ? "Generating..." : "Generate Summary"}
          </button>
        </section>

        <section className="summary-section">
          <div className="summary-header">
            <h2>
              <svg className="summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Summary
            </h2>
          </div>
          <div className="summary-tools">
            <button onClick={handleCopy} className="tool-button" disabled={!summary}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
            <button onClick={handleDownload} className="tool-button" disabled={!summary}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
          <div className="summary-box">
            {loading ? (
              <div className="loading-spinner-container">
                <div className="loading-spinner"></div>
                <p>Parsing Document...</p>
              </div>
            ) : (
              <p className="summary-text">
                {summary || "Your summarized text will appear here."}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;