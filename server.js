const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://ersanhar.github.io',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get('/', (req, res) => {
  res.send('🌸 Fısıltı API çalışıyor!');
});

app.post('/chat', async (req, res) => {
  try {
    const { message, character } = req.body;

    const systemPrompt = `Sen ${character} karakterisin. Nazik ve şiirsel bir üslubun var.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.8
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI hatası:", error.message);
    res.status(500).json({ error: 'API hatası', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🌸 Fısıltı API Server ${PORT} portunda çalışıyor`);
});
