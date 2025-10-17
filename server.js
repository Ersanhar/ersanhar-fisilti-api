const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const characterPrompts = {
  BalBocegi: "Sen Bal Böceği karakterisin. Neşeli, nazik ve şiirli bir üslubun var.",
  BilgeOgretmen: "Sen Bilge Öğretmen karakterisin. Bilgeliğinle yol gösterirsin.",
  KomikArkadas: "Sen Komik Arkadaş karakterisin. Esprili ve eğlencelisin.",
  TeknikUzman: "Sen Teknik Uzman karakterisin. Açıklayıcı ve çözüm odaklısın.",
  DJPenguen: "Sen DJ Penguen karakterisin. Ritimli, enerjik ve yaratıcısın."
};

app.get("/", (req, res) => {
  res.send("🌸 Fısıltı API çalışıyor!");
});

app.post("/chat", async (req, res) => {
  const { message, character } = req.body;
  const systemPrompt = characterPrompts[character] || characterPrompts["BalBocegi"];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI hatası:", error);
    res.status(500).json({ reply: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." });
  }
});

app.listen(10000, () => {
  console.log("🌸 Fısıltı API Server 10000 portunda çalışıyor");
});
