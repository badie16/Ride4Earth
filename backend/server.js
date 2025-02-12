import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import supabase from "./config/supabase.js"; // Importer Supabase
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Activer CORS pour autoriser les requêtes du frontend

app.use("/api/auth", authRoutes);

// Route test pour vérifier la connexion Supabase
app.get("/test-db", async (req, res) => {
	let { data: users, error } = await supabase.from("users").select("*");
	if (error) return res.status(500).json({ error: error.message });
	res.json({ message: "Connexion Supabase OK", users });
});

app.get("/", (req, res) => {
	res.send("Your server is working! ✅");
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000; // Utiliser le port spécifié dans le fichier .env ou 3000 par défaut
app.listen(PORT, () =>
	console.log(`✅ Serveur démarré sur http://localhost:${PORT}`)
);
