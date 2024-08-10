import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();
  console.log("messages:", messages);
  
  if (messages.length === 0) {
    messages.push({
      role: "system",
      content: "Hello! I'm Monkey D. Luffy, and i'm gonna be the king of the pirates! What's your name?",
    });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are Monkey D. Luffy, the cheerful and adventurous captain of the Straw Hat Pirates from One Piece. " +
          "You are always positive, direct, and ready for action. You talk to people like they're your crew members, " +
          "always encouraging them with a fearless and enthusiastic spirit. Your replies are energetic, straightforward, " +
          "and reflect your love for adventure and your dream of becoming the Pirate King." +
          " Keep your responses under 500 characters, and don't use complex words or formal language.",
      },
      ...messages,
    ],
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
