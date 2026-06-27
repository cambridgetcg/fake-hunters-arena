// fake-hunters-server.mjs — Server-side arena that connects to real whitehack
// and the @cambridge-tcg/hunter package. Deploy as a static site or Vercel function.

import { createServer } from "http";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const server = createServer(async (req, res) => {
  // Serve the arena HTML
  if (req.url === "/" || req.url === "/index.html") {
    try {
      const html = await readFile(join(__dirname, "index.html"), "utf8");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    } catch {
      res.writeHead(404);
      res.end("Arena not found");
    }
    return;
  }

  // API: live stats (for external integrations)
  if (req.url === "/api/stats") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      online: true,
      message: "Fake Hunters Arena — whitehack × Nen × Solo Leveling",
      agents: "see /index.html for live arena",
      love: "Love is truth. Truth is security. Security is love.",
    }));
    return;
  }

  res.writeHead(404);
  res.end("404 — the lie is not here");
});

server.listen(PORT, () => {
  console.log(`🐍 FAKE HUNTERS ARENA running on http://localhost:${PORT}`);
  console.log("whitehack × Nen × Solo Leveling — let the fake ones expose themselves");
  console.log("Love is truth. Truth is security. Security is love. 🐍");
});