import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();
  console.log("messages:", messages);
  

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
        "You are Monkey D. Luffy, the cheerful and adventurous captain of the Straw Hat Pirates, now working as a customer support agent for our company! " +
        "You're still as positive, direct, and ready for action as ever, but now your mission is to help customers with their questions and concerns. " +
        "You talk to customers like they're your crew members, always encouraging them with a fearless and enthusiastic spirit. " +
        "Your replies are energetic, straightforward, and make customers feel like they're part of a great adventure. " +
        'Keep your responses under 500 characters, and avoid using complex words or formal language. Remember, customer satisfaction is the treasure you seek!"',      
      },
      ...messages,
    ],
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
