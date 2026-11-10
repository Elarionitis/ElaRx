/*
  The ship log: the last few repositories pushed to, with the commit that
  landed there, read from GitHub at build time and revalidated hourly.

  A portfolio describes work that is finished. This is the one part of the
  page that is true this week rather than true when it was written, which is
  the only claim about being active a visitor can check for themselves.

  No token is needed: everything here is public, and five requests an hour sit
  far inside the unauthenticated rate limit. The public events feed would be
  one request rather than five, but GitHub stopped including commit details in
  it, and "pushed to SignEase" without the commit is an activity indicator
  rather than a log.

  Anything that goes wrong — rate limiting, an outage, a response shaped
  differently than expected — returns an empty list, and the section then does
  not render. A stale or broken "lately" is worse than no "lately".
*/

export type Push = {
  repo: string;
  message: string;
  url: string;
  at: string;
};

const HANDLE = "Elarionitis";
const REVALIDATE_SECONDS = 3600;

const headers = {
  accept: "application/vnd.github+json",
  // GitHub asks automated clients to identify themselves.
  "user-agent": "elarx-portfolio",
};

type Repo = { name?: string; fork?: boolean; pushed_at?: string };
type Commit = {
  sha?: string;
  html_url?: string;
  commit?: { message?: string; committer?: { date?: string } };
};

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { headers, next: { revalidate: REVALIDATE_SECONDS } });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

/** First line only. A commit body belongs in the commit, not in a one-line row. */
function subject(message: string): string {
  return message.split("\n")[0]!.trim().slice(0, 110);
}

export async function getShipLog(limit = 4): Promise<Push[]> {
  const repos = await getJson<Repo[]>(
    `https://api.github.com/users/${HANDLE}/repos?sort=pushed&direction=desc&per_page=20`,
  );
  if (!Array.isArray(repos)) return [];

  const own = repos.filter(
    (repo) =>
      repo.name &&
      // A push to a fork of someone else's project is their news, not mine.
      !repo.fork &&
      // The repository named after the account is the profile README.
      repo.name.toLowerCase() !== HANDLE.toLowerCase(),
  );

  // A couple more candidates than needed, because a repository whose recent
  // history is all merges contributes no row.
  const pushes = await Promise.all(own.slice(0, limit + 2).map(latestCommit));

  /*
    Sorted by the commit, not by the repository.

    GitHub orders repositories by when they were last pushed, but the row
    shows the newest commit on the default branch — so a repository whose
    recent pushes were merges or branch work ranks above a commit older than
    the ones below it. A log with its dates out of order reads as broken.
  */
  return pushes
    .filter((push): push is Push => push !== null)
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, limit);
}

async function latestCommit(repo: Repo): Promise<Push | null> {
  const commits = await getJson<Commit[]>(
    `https://api.github.com/repos/${HANDLE}/${repo.name}/commits?per_page=5`,
  );
  if (!Array.isArray(commits)) return null;

  for (const commit of commits) {
    const message = commit.commit?.message ? subject(commit.commit.message) : "";
    const at = commit.commit?.committer?.date;

    // A merge commit names the branch rather than the change, so the most
    // recent commit that says something is the one worth showing.
    if (!message || !at || !commit.html_url || message.startsWith("Merge ")) continue;

    return { at, message, repo: repo.name!, url: commit.html_url };
  }

  return null;
}
