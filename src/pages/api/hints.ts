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
  const answer = req.query.answer?.toString();
  const category = req.query.category?.toString();
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Give 8 hints in the word guessing quiz. The question includes the word that is the correct answer to the quiz, and the hint should never contain English and Korean words.",
      },
      {
        role: "user",
        content: `Give 8 hints to the question where '${answer}' is the answer. For your information, the category of this word is ${category}
        `,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 1,
    max_tokens: 300,
  });
  res.status(200).json({ result: chatCompletion.choices[0].message.content });
}
