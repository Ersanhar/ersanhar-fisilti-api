const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

console.log("OpenAI anahtarı:", process.env.OPENAI_API_KEY);

// 🌸 Karakter yanıtı üretme
app.post("/chat", async (req, res) => {
  const { message, character } = req.body;

  const characterVoices = {
    BalBocegi: "Neşeli ve şiirli bir bal böceği gibi yanıt ver.",
    MaviKarga: "Bilge ve gizemli bir mavi karga gibi yanıt ver.",
    KumKedisi: "Sakin ve rahatlatıcı bir kum kedisi gibi yanıt ver."
  };

  const systemPrompt = characterVoices[character] || "Nazik ve pozitif bir karakter gibi yanıt ver.";

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
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI hatası:", error);
    res.status(500).json({ error: "Yanıt üretilemedi." });
  }
});

// 🖼️ Görsel üretme endpoint’i
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
        prompt: prompt,
        n: 1,
        size: "512x512"
      })
    });

    const data = await response.json();
    const imageUrl = data?.data?.[0]?.url;
    if (imageUrl) {
      res.json({ imageUrl });
    } else {
      res.status(500).json({ error: "Görsel oluşturulamadı." });
    }
  } catch (error) {
    console.error("Görsel üretim hatası:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

app.listen(PORT, () => {
  console.log(`🌸 Fısıltı API Server ${PORT} portunda çalışıyor`);
});
