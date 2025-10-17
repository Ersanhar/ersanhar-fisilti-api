const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS ayarı: sadece GitHub Pages frontend’ine izin ver
const corsOptions = {
  origin: 'https://ersanhar.github.io',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

// OpenAI API anahtarı ortam değişkeninden alınır
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Ana sayfa testi
app.get('/', (req, res) => {
  res.send('🌸 Fısıltı API çalışıyor!');
});

// Sağlık kontrolü
app.get('/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});

// Chat rotası: karakterli yanıt üretir
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

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`🌸 Fısıltı API Server ${PORT} portunda çalışıyor`);
});
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
require('dotenv').config(); // .env dosyasını yükler

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
require('dotenv').config(); // .env dosyasını yükler

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


