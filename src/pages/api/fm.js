import { AppFm } from "./appfm";

export default async function handler(req, res) {
  try {
    const content = await AppFm();
    res.status(200).json({ content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
