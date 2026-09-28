import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GROQ_API_KEY) {
  console.error("❌ ERROR: GROQ_API_KEY is not defined in your backend .env file!");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default groq;