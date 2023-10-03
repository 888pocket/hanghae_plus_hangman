import { NextApiRequest, NextApiResponse } from "next/types";
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Data = {
  result: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const category = req.query.category?.toString() || "All";
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Give clear answers to all questions in one English word. You can randomly select English words related to categories delivered by users and recommend them. The category is given as input, the maximum number of characters in the English word must be 10, and must be the right word for the given category. Only print one English word and don't say anything else.",
      },
      { role: "user", content: category },
    ],
    model: "gpt-3.5-turbo",
    temperature: 2,
    max_tokens: 10,
  });
  res.status(200).json({ result: chatCompletion.choices[0].message.content });
}
