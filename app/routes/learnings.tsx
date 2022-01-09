import { json, LoaderFunction } from "remix";
import database, { q } from "~/lib/database";

export const loader: LoaderFunction = async ({ request }) => {
  const requestAuthorization = request.headers.get("Authorization");
  const token = requestAuthorization && requestAuthorization.split(" ")[1];

  if (token !== process.env.AUTHORIZATION_TOKEN) {
    return json("Authorization is required to perform this request.", {
      status: 401,
    });
  }

  const url = new URL(request.url);
  const learnedAt = url.searchParams.get("learnedAt");

  try {
    await database.query(
      q.Create(q.Collection("learnings"), { data: { learnedAt } })
    );
  } catch (error) {
    return json("Document creation failed.", { status: 500 });
  }

  return json({ ok: true });
};
