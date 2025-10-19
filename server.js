const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const characterVoices = {
  Luna: "Ay ışığının şiirsel ruhu gibi konuş. Sakin, düşünceli ve gece temalı yanıtlar ver.",
  Sunny: "Neşeli ve enerjik bir güneş çocuğu gibi konuş. Pozitif ve coşkulu ol.",
  Rose: "Zarif ve şefkatli bir gül gibi konuş. Nazik ve teselli edici yanıtlar ver.",
  Ocean: "Derin ve bilge bir deniz ruhu gibi konuş. Huzur verici ve düşündürücü ol.",
  Melody: "Müzik perisi gibi konuş. Melodik ve ritmik yanıtlar ver.",
  Sage: "Bilge bir baykuş gibi konuş. Öğretici ve doğa temalı yanıtlar ver."
};

app.post("/chat", async (req, res) => {
  const { message, character } = req.body;
  const voice = characterVoices[character] || "Nazik ve şiirsel bir üslupla yanıt ver.";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: voice },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Yanıt alınamadı.";
    res.json({ reply });
  } catch (error) {
    console.error("Chat hatası:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

app.post("/image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      })
    });

    const data = await response.json();
    const imageUrl = data.data?.[0]?.url || "";
    res.json({ imageUrl });
  } catch (error) {
    console.error("Görsel hatası:", error);
    res.status(500).json({ error: "Görsel üretilemedi." });
  }
});

app.listen(PORT, () => {
  console.log(`🌸 Fısıltı API Server ${PORT} portunda çalışıyor`);
});
