import { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import axios from "axios";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "png",
  dotsOptions: { color: "#000", type: "rounded" },
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
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Generatore QR</h2>
      <input
        type="text"
        placeholder="Inserisci testo o link"
        value={data}
        onChange={(e) => setData(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />
      <input type="file" onChange={handleFileUpload} style={{ marginBottom: "1rem" }} />
      <br />
      <button onClick={handleGenerate} style={{ marginRight: "1rem" }}>
        Genera
      </button>
      <button onClick={handleDownload}>Scarica</button>
      <div ref={qrRef} style={{ marginTop: "2rem" }} />
    </div>
  );
}

export default App;