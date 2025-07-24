// backend/index.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = 5000;

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Nessun file" });
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

app.listen(PORT, () => console.log(`Backend attivo su http://localhost:${PORT}`));