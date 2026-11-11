/*
  What it is like in Jodhpur right now, for the line in the header.

  Read from Open-Meteo, which needs no key, and cached for fifteen minutes:
  the air does not change faster than that, and it keeps this site to at most
  four requests an hour however many people are reading it.

  If the lookup fails the answer is an empty object and the header shows the
  time on its own. A missing temperature is fine; a wrong one is not.
*/
export const revalidate = 900;

// IIT Jodhpur campus, to two decimal places.
const SOURCE =
  "https://api.open-meteo.com/v1/forecast?latitude=26.47&longitude=73.11&current=temperature_2m,weather_code";

// WMO weather codes, folded down to the handful of words worth saying.
function sky(code: number): string {
  if (code === 0) return "clear";
  if (code <= 2) return "partly cloudy";
  if (code === 3) return "overcast";
  if (code === 45 || code === 48) return "foggy";
  if (code >= 51 && code <= 57) return "drizzling";
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "raining";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snowing";
  if (code >= 95) return "thunderstorm";
  return "";
}

export async function GET() {
  try {
    const response = await fetch(SOURCE, { next: { revalidate } });
    if (!response.ok) return Response.json({});

    const data = (await response.json()) as { current?: { temperature_2m?: unknown; weather_code?: unknown } };
    const temperature = data.current?.temperature_2m;
    const code = data.current?.weather_code;
    if (typeof temperature !== "number") return Response.json({});

    return Response.json({
      temperature: Math.round(temperature),
      sky: typeof code === "number" ? sky(code) : "",
    });
  } catch {
    return Response.json({});
  }
}
