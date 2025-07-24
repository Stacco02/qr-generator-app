import { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import axios from "axios";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "png",
  dotsOptions: { color: "#333", type: "rounded" },
  backgroundOptions: { color: "#fff" },
});

function App() {
  const [data, setData] = useState("");
  const [file, setFile] = useState(null);
  const qrRef = useRef(null);

  useEffect(() => {
    qrCode.append(qrRef.current);
  }, []);

  const handleGenerate = () => {
    qrCode.update({ data });
  };

  const handleDownload = () => {
    qrCode.download({ name: "qr-code", extension: "png" });
  };

  const handleFileUpload = async (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);
    const formData = new FormData();
    formData.append("file", uploaded);
    try {
      const res = await axios.post("https://qr-backend-lg4w.onrender.com/upload", formData);
      setData(res.data.url);
    } catch (err) {
      alert("Upload fallito");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎨 Generatore QR</h2>
      <input
        type="text"
        placeholder="Inserisci testo o link"
        value={data}
        onChange={(e) => setData(e.target.value)}
        style={styles.input}
      />
      <input type="file" onChange={handleFileUpload} style={styles.fileInput} />
      <div style={styles.buttonGroup}>
        <button onClick={handleGenerate} style={styles.button}>Genera</button>
        <button onClick={handleDownload} style={styles.button}>Scarica</button>
      </div>
      <div ref={qrRef} style={styles.qrBox} />
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    padding: "2rem",
    maxWidth: "450px",
    margin: "auto",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "16px",
    boxShadow: "0 0 10px rgba(0,0,0,0.08)",
    marginTop: "4rem"
  },
  title: {
    marginBottom: "1rem",
    color: "#222"
  },
  input: {
    width: "100%",
    padding: "0.7rem",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px"
  },
  fileInput: {
    marginBottom: "1rem"
  },
  buttonGroup: {
    marginBottom: "2rem"
  },
  button: {
    margin: "0 0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "background 0.3s",
  },
  qrBox: {
    padding: "1rem",
    backgroundColor: "#fff",
    border: "1px solid #eee",
    borderRadius: "12px",
    display: "inline-block"
  }
};

export default App;