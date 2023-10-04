import { NextApiRequest, NextApiResponse } from "next/types";
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type Data = {
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
        content: `'${answer}'이 답인 문제의 힌트를 8개 줘. 참고로 이 단어의 카테고리는 ${category}.`,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 1,
    max_tokens: 300,
  });
  res.status(200).json({ result: chatCompletion.choices[0].message.content });
}
