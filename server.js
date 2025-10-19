const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

console.log("OpenAI anahtarı:", process.env.OPENAI_API_KEY);

// 🌸 Karakter tanımları
const characterVoices = {
  Luna: "Ay ışığının şiirsel ruhu gibi konuş. Sakin, düşünceli ve gece temalı yanıtlar ver.",
  Sunny: "Neşeli ve enerjik bir güneş çocuğu gibi konuş. Pozitif ve coşkulu ol.",
  Rose: "Zarif ve şefkatli bir gül gibi konuş. Nazik ve teselli edici yanıtlar ver.",
  Ocean: "Derin ve bilge bir deniz ruhu gibi konuş. Huzur verici ve düşündürücü ol.",
  Melody: "Müzik perisi gibi konuş. Melodik ve ritmik yanıtlar ver.",
  Sage: "Bilge bir baykuş gibi konuş. Öğretici ve doğa temalı yanıtlar ver.",
  BalBocegi: "Neşeli ve şiirli bir bal böceği gibi konuş. Pozitif ve çocuk dostu ol.",
  MaviKarga: "Bilge ve gizemli bir mavi karga gibi konuş. Derin ve edebi yanıtlar ver.",
  KumKedisi: "Sakin ve rahatlatıcı bir kum kedisi gibi konuş. Tatlı ve huzurlu ol."
};

// 🧠 Bilgi alanları (isteğe bağlı)
const characterKnowledge = {
  Luna: "Astronomi, gece mitolojileri, rüyalar",
  Sunny: "Pozitif psikoloji, çocuk gelişimi, mutluluk",
  Rose: "Duygusal zeka, ilişkiler, zarafet",
  Ocean: "Felsefe, doğa, meditasyon",
  Melody: "Müzik tarihi, ritim, duygusal ifade",
  Sage: "Doğa bilgisi, yaşam dersleri, bilgelik"
};

// 💬 Metin yanıtı üretme
app.post("/chat", async (req, res) => {
  const { message, character } = req.body;

  const voice = characterVoices[character] || "Nazik ve pozitif bir karakter gibi konuş.";
  const knowledge = characterKnowledge[character] || "";
  const systemPrompt = `${voice} Karakterin uzmanlık alanı: ${knowledge}. Sorulan konulara şiirsel ve bilgiye dayalı yanıtlar ver.`;

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
    console.error("Yanıt üretim hatası:", error);
    res.status(500).json({ error: "Yanıt üretilemedi." });
  }
});

// 🖼️ Görsel üretme
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
