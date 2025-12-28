import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken || !session.accessTokenSecret) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const oauth = new OAuth({
      consumer: {
        key: process.env.TWITTER_CONSUMER_KEY!,
        secret: process.env.TWITTER_CONSUMER_SECRET!,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto.createHmac("sha1", key).update(base_string).digest("base64");
      },
    });

    const token = {
      key: session.accessToken,
      secret: session.accessTokenSecret,
    };

    const requestData = {
      url: "https://api.twitter.com/2/users/me/tweets?max_results=100&tweet.fields=public_metrics&start_time=2025-01-01T00:00:00Z",
      method: "GET",
    };

    const headers = oauth.toHeader(oauth.authorize(requestData, token));

    const res = await fetch(requestData.url, {
      method: requestData.method,
      headers: headers as HeadersInit,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Twitter API error: ${errorText}`);
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return Response.json({ error: "No tweets found in 2025" });
    }

    const topTweets = data.data
      .sort((a: any, b: any) => {
        const aEng = a.public_metrics.like_count + a.public_metrics.retweet_count + a.public_metrics.quote_count;
        const bEng = b.public_metrics.like_count + b.public_metrics.retweet_count + b.public_metrics.quote_count;
        return bEng - aEng;
      })
      .slice(0, 5);

    return Response.json({ tweets: topTweets });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch tweets" });
  }
}