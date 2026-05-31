import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { generateAdPack } from "./src/lib/gemini.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for generating the UGC ad pack
  app.post("/api/ugc/generate", async (req, res) => {
    try {
      const body = req.body;

      if (!body.name || !body.coreProblem || !body.coreResult) {
        return res.status(400).json({ error: 'Missing required product fields' });
      }

      const adPack = await generateAdPack(body);
      res.json({ adPack });
    } catch (error) {
      console.error('UGC generation error:', error);
      res.status(500).json({ error: 'Ad content generation failed. Check inputs.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
