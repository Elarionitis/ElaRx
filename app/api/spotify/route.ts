type SpotifyTokenResponse = {
  access_token?: string;
};

type SpotifyTrack = {
  name: string;
  artists: Array<{ name: string }>;
  album: {
    images: Array<{ url: string }>;
  };
  external_urls: {
    spotify?: string;
  };
};

type SpotifyPlaybackResponse = {
  is_playing?: boolean;
  item?: SpotifyTrack | null;
};

export const dynamic = "force-dynamic";

function noContent() {
  return new Response(null, {
    status: 204,
    headers: { "Cache-Control": "private, no-store" },
  });
}

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return noContent();

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) return noContent();

    const { access_token: accessToken } = (await tokenResponse.json()) as SpotifyTokenResponse;
    if (!accessToken) return noContent();

    const playbackResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (playbackResponse.status === 204 || !playbackResponse.ok) return noContent();

    const playback = (await playbackResponse.json()) as SpotifyPlaybackResponse;
    const track = playback.item;

    if (!playback.is_playing || !track) return noContent();

    return Response.json(
      {
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(", "),
        albumArtUrl: track.album.images[0]?.url ?? null,
        trackUrl: track.external_urls.spotify ?? null,
      },
      {
        headers: { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=40" },
      },
    );
  } catch {
    return noContent();
  }
}
