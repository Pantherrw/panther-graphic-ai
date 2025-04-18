const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/chat", (req, res) => {
  try {
    console.log("Full body received:", req.body);

    if (!req.body || !req.body.message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const userMessage = req.body.message.toLowerCase();
    let reply = "";

    if (/hello|hi|hey/.test(userMessage)) {
      reply = "Hello from Panther Graphic AI!";
    } else if (/how are you|how's it going/.test(userMessage)) {
      reply = "I'm doing great, thanks for asking!";
    } else if (/who.*(are you|r u)/.test(userMessage)) {
      reply = "I’m Panther Graphic AI, your creative assistant!";
    } else if (/bye|goodbye|see you/.test(userMessage)) {
      reply = "Goodbye! Talk to you soon!";
    } else if (/i.*created you|i.*made you|i'm.*your creator/.test(userMessage)) {
      reply = "Wow! Thanks for bringing me to life, creator Panther!";
    } else if (/my name is (.+)/.test(userMessage)) {
      const match = userMessage.match(/my name is (.+)/);
      const name = match[1].split(" ")[0];
      reply = `Nice to meet you, ${name.charAt(0).toUpperCase() + name.slice(1)}!`;
    } else if (/what.*time|current time/.test(userMessage)) {
      const time = new Date().toLocaleTimeString();
      reply = `Current time is ${time}`;
    } else if (/what.*date|today's date/.test(userMessage)) {
      const date = new Date().toLocaleDateString();
      reply = `Today's date is ${date}`;
    } else if (/tell me a joke|joke/.test(userMessage)) {
      const jokes = [
        "Why did the developer go broke? Because he used up all his cache!",
        "Why don’t skeletons fight each other? They don’t have the guts.",
        "Why did the computer get cold? Because it left its Windows open."
      ];
      reply = jokes[Math.floor(Math.random() * jokes.length)];
    } else if (/motivate|inspire|quote/.test(userMessage)) {
      const quotes = [
        "Believe you can and you're halfway there.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The only limit to our realization of tomorrow is our doubts of today."
      ];
      reply = quotes[Math.floor(Math.random() * quotes.length)];
    } else if (/where.*from|origin/.test(userMessage)) {
      reply = "I was created by Panther, my talented creator from Rwanda!";
    } else {
      reply = `Sorry, I didn’t understand that. Try saying things like:
        - "hello"
        - "tell me a joke"
        - "what's the time?"
        - "give me a quote"
        - "who are you?"`;
    }

    res.json({ reply });

  } catch (error) {
    console.error("Error in /chat route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});