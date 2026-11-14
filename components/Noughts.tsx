"use client";

import { useEffect, useState } from "react";

// Noughts and crosses against the page. The visitor is X; the page plays O
// by full search, so the best a visitor can get is a draw.

type Mark = "x" | "o";
type Board = (Mark | null)[];
type Tally = { you: number; page: number; drawn: number };

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const EMPTY: Board = Array(9).fill(null);
const STORAGE_KEY = "elarx:noughts";
const REPLY_MS = 450;

function winningLine(board: Board) {
  return LINES.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]) ?? null;
}

function free(board: Board) {
  return board.flatMap((cell, index) => (cell ? [] : [index]));
}

// Value of the position for O: 1 a win, 0 a draw, -1 a loss.
function value(board: Board, turn: Mark): number {
  const line = winningLine(board);
  if (line) return board[line[0]] === "o" ? 1 : -1;
  const open = free(board);
  if (open.length === 0) return 0;
  const results = open.map((index) => {
    const next = board.slice();
    next[index] = turn;
    return value(next, turn === "o" ? "x" : "o");
  });
  return turn === "o" ? Math.max(...results) : Math.min(...results);
}

function reply(board: Board): number {
  const open = free(board);
  // Every opening move draws with best play, so skip the search and vary it.
  if (open.length === 9) return open[Math.floor(Math.random() * 9)];
  const scored = open.map((index) => {
    const next = board.slice();
    next[index] = "o";
    return { index, score: value(next, "x") };
  });
  const best = Math.max(...scored.map((move) => move.score));
  const choices = scored.filter((move) => move.score === best);
  return choices[Math.floor(Math.random() * choices.length)].index;
}

function centre(index: number) {
  return { x: 50 + (index % 3) * 100, y: 50 + Math.floor(index / 3) * 100 };
}

export function Noughts() {
  const [board, setBoard] = useState<Board>(EMPTY);
  const [starter, setStarter] = useState<Mark>("x");
  const [tally, setTally] = useState<Tally | null>(null);

  const line = winningLine(board);
  const open = free(board);
  const over = Boolean(line) || open.length === 0;
  const turn: Mark = (9 - open.length) % 2 === 0 ? starter : starter === "x" ? "o" : "x";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
        if (saved && [saved.you, saved.page, saved.drawn].every((count) => typeof count === "number")) {
          setTally(saved);
        }
      } catch {
        // No storage: the score just starts again each visit.
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function place(index: number, mark: Mark) {
    const next = board.slice();
    next[index] = mark;
    setBoard(next);

    const won = winningLine(next);
    if (!won && free(next).length > 0) return;
    const current = tally ?? { you: 0, page: 0, drawn: 0 };
    const updated = won
      ? mark === "x"
        ? { ...current, you: current.you + 1 }
        : { ...current, page: current.page + 1 }
      : { ...current, drawn: current.drawn + 1 };
    setTally(updated);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }

  useEffect(() => {
    if (over || turn !== "o") return;
    const timer = window.setTimeout(() => place(reply(board), "o"), REPLY_MS);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, starter]);

  function again() {
    setBoard(EMPTY);
    setStarter((who) => (who === "x" ? "o" : "x"));
  }

  function reset() {
    setBoard(EMPTY);
    setStarter("x");
    setTally(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  const status = line
    ? board[line[0]] === "x"
      ? "You won."
      : "I won."
    : over
      ? "A draw."
      : turn === "x"
        ? "Your move."
        : "Thinking";

  const from = line ? centre(line[0]) : null;
  const to = line ? centre(line[2]) : null;

  return (
    <div className="noughts">
      <div className="noughts-board">
        <svg aria-hidden="true" viewBox="0 0 300 300">
          <path d="M100 8C98 100 103 200 100 292" />
          <path d="M200 10C203 110 198 190 201 290" />
          <path d="M8 100C100 97 200 103 292 99" />
          <path d="M10 200C110 203 190 198 290 201" />
          {board.map((mark, index) => {
            if (!mark) return null;
            const { x, y } = centre(index);
            return mark === "x" ? (
              <g className="noughts-x" key={index} transform={`translate(${x} ${y})`}>
                <path d="M-26 -24L25 26" pathLength={1} />
                <path d="M24 -26L-25 25" pathLength={1} />
              </g>
            ) : (
              <g className="noughts-o" key={index} transform={`translate(${x} ${y})`}>
                <path
                  d="M4 -30C-20 -32-32 -12-30 4c2 20 22 28 40 24 18-4 24-24 18-40C22 -28 4 -32-10 -26"
                  pathLength={1}
                />
              </g>
            );
          })}
          {from && to ? (
            <path
              className="noughts-strike"
              d={`M${from.x - (to.x - from.x) * 0.18} ${from.y - (to.y - from.y) * 0.18}L${to.x + (to.x - from.x) * 0.18} ${to.y + (to.y - from.y) * 0.18}`}
              pathLength={1}
            />
          ) : null}
        </svg>
        <div className="noughts-cells">
          {board.map((mark, index) => (
            <button
              aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}: ${mark ? (mark === "x" ? "yours" : "mine") : "empty"}`}
              className="focus-ring"
              disabled={Boolean(mark) || over || turn !== "x"}
              key={index}
              onClick={() => place(index, "x")}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className="noughts-side">
        <p aria-live="polite" className="noughts-status">
          {status}
        </p>
        {tally ? (
          <p className="label">
            You {tally.you} &middot; Me {tally.page} &middot; Drawn {tally.drawn}
          </p>
        ) : (
          <p className="label">You are X.</p>
        )}
        {over || tally || open.length < 9 ? (
          <div className="noughts-buttons">
            {over ? (
              <button className="doodle-button focus-ring" onClick={again} type="button">
                again
              </button>
            ) : null}
            <button className="doodle-button focus-ring" onClick={reset} type="button">
              reset
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
