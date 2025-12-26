import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const res = await fetch("https://api.twitter.com/2/users/me/tweets?max_results=100&tweet.fields=public_metrics&start_time=2025-01-01T00:00:00Z", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = await res.json();

    if (data.data) {
      const topTweets = data.data
        .sort((a: any, b: any) => {
          const aEng = a.public_metrics.like_count + a.public_metrics.retweet_count + a.public_metrics.quote_count;
          const bEng = b.public_metrics.like_count + b.public_metrics.retweet_count + b.public_metrics.quote_count;
          return bEng - aEng;
        })
        .slice(0, 5);

      return Response.json({ tweets: topTweets });
    }

    return Response.json({ error: "No tweets found" });
  } catch (error) {
    return Response.json({ error: "Failed to fetch tweets" });
  }
}