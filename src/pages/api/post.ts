// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const superagent = require("superagent");

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case "POST":
      const data = await superagent
        .post("https://api.supermomos-dev.com/interview/social")
        .set("Content-Type", "application/json")
        .send(JSON.parse(req.body))
        .end((error: any, response: any) => {
          if (error) res.status(500).json({ ...error });
          res.status(200).json(JSON.parse(response.text));
        });
      break;
    default:
      res.status(200).json({ name: "John Doe" });
  }
}
