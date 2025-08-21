require("dotenv").config({ debug: false });

const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Archivos estáticos (sirve index.html, css, js, projects, etc)
app.use(express.static(path.join(__dirname, "public")));

// Importar rutas
const contactRoutes = require("./src/routes/contact");
app.use("/contact", contactRoutes);

// Fallback: si no encuentra la ruta, devuelve index.html (para SPA o links directos)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
