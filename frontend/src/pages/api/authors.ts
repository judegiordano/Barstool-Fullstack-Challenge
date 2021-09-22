import { NextApiRequest, NextApiResponse } from "next";

import { BarstoolRest } from "@Services/RestService";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const { data } = await BarstoolRest.client.get("authors");
	res.status(200).json(data);
};
