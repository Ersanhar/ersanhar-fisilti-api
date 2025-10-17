document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("sendButton");
  const messageInput = document.getElementById("messageInput");
  const characterSelect = document.getElementById("characterSelect");
  const responseBox = document.getElementById("responseBox"); // Tek yanıt kutusu

  sendButton.addEventListener("click", () => {
    const userMessage = messageInput.value.trim();
    let selectedCharacter = characterSelect?.value;

    if (!userMessage) {
      responseBox.innerText = "Lütfen bir mesaj yazın.";
      return;
    }

    // Varsayılan karakter
    if (!selectedCharacter || selectedCharacter === "default") {
      selectedCharacter = "BalBocegi"; // 🌸
    }

    // API çağrısı
    fetch("https://ersanhar-fisilti-api.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userMessage,
        character: selectedCharacter
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.reply) {
        responseBox.innerText = data.reply;
        console.log("Fısıltı cevabı:", data.reply);
      } else {
        responseBox.innerText = "Yanıt alınamadı.";
        console.warn("Yanıt boş:", data);
      }
    })
    .catch(error => {
      console.error("Hata:", error);
      responseBox.innerText = "Sunucuya bağlanılamadı.";
    });
  });
});
