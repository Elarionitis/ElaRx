// The contribution calendar from the public GitHub profile, refreshed hourly.
// If GitHub changes the page or is unreachable this returns null and the
// calendar is not shown.

const HANDLE = "Elarionitis";

export type Contributions = {
  total: number;
  /** One array per week, oldest first; each day is a level from 0 to 4. */
  weeks: number[][];
};

export async function getContributions(): Promise<Contributions | null> {
  try {
    const response = await fetch(`https://github.com/users/${HANDLE}/contributions`, {
      headers: { "user-agent": "elarx-portfolio" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    const html = await response.text();

    const days: { date: string; level: number }[] = [];
    for (const [cell] of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
      const date = cell.match(/data-date="(\d{4}-\d{2}-\d{2})"/)?.[1];
      const level = cell.match(/data-level="(\d)"/)?.[1];
      if (date && level) days.push({ date, level: Number(level) });
    }
    const total = Number(html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1]?.replace(/,/g, ""));
    if (days.length < 300 || !Number.isFinite(total)) return null;

    days.sort((a, b) => a.date.localeCompare(b.date));
    const weeks: number[][] = [];
    for (let index = 0; index < days.length; index += 7) {
      weeks.push(days.slice(index, index + 7).map((day) => day.level));
    }
    return { total, weeks };
  } catch {
    return null;
  }
}
