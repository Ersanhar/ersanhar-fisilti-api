const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// OpenAI istemcisi
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Sağlık kontrolü
app.get('/health', (req, res) => {
  res.send('OK');
});

// Basit sohbet endpoint'i
app.post('/chat', async (req, res) => {
  const { message, character } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mesaj eksik.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Sen ${character || 'nazik bir yardımcı'} gibi davranan bir asistansın.`
        },
        {
          role: 'user',
          content: message
        }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI hatası:', error);
    res.status(500).json({ error: 'Yanıt alınamadı.' });
  }
});

app.listen(port, () => {
  console.log(`Fısıltı API ${port} portunda çalışıyor`);
});
