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

