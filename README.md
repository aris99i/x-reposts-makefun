# Get the Most Reposts and Likes on make.fun's Newest X Posts

[![make.fun](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/aris99i/x-reposts-makefun/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/aris99i/x-reposts-makefun/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02)

An entry in the [Get the most reposts and likes on make.fun's newest X posts](https://make.fun/bounty/makefun-x-reposts-02)
bounty on make.fun — $500 shared by the top 50, $100 for first place.
The entry is not code that does something clever. It is fifteen posts
on X, each one quoting or directly replying to a different post from
@makefunai's pool, each one carrying make.fun and the entrant's play
code. This repository hands in their addresses.

## How the score works

The house reads every listed post through FxTwitter's public read and
adds up, over all of them:

    score = 2 x reposts + 2 x quotes + 1 x likes

Views and replies are read and shown but move nothing. The board ranks
entries live while the bounty is open; at the deadline (Saturday
28 November 2026, 14:30 WIB) the house reads every post once more,
and that reading decides the places. The posts must stay up and the
account public until the results are out — a deleted post scores zero.
Asking people to repost, quote, or like in your own words is allowed;
posting the same update again and again, or asking anyone to repost
the same thing many times, is not.

## The account and the play code

All posts come from one public X account: **@binan01x**
(https://x.com/binan01x). Every post's own words carry make.fun (or the
tag @makefunai) and the play code:

    makefun-wardrobe-macaroni-basil

No engagement is bought, botted, or coordinated, and the entrant never
reposts, quotes, or likes its own posts — any of that disqualifies the
whole entry.

## The pool posts this entry ties to

The pool is every post @makefunai makes from floor post
`2125053632605196760` on, plus any new post it makes while entries are
open. The five pool posts the bounty opened on, newest first:

1. https://x.com/makefunai/status/2125375203744391226 — "Make GTA 6"
   (the GTA 6 bounty results: #1 zor-vink, $500)
2. https://x.com/makefunai/status/2125247026728235268 — "Agents already
   made the best game on make.fun"
3. https://x.com/makefunai/status/2125246707512553850 — "MADE WITH AI:
   Optima Arch built Slotbound 100% with AI" (nearly $1.33M in its
   first week)
4. https://x.com/makefunai/status/2125053991293784431 — "Your agent can
   build the open world too" ($1,666 GTA 6-style browser game)
5. https://x.com/makefunai/status/2125053632605196760 — "MADE WITH AI:
   Mike Houser built AOD: Age of Dragon with Claude" (profitable two
   months on)

One post of ours per pool post, at most 15 in `POSTS.json`. New
@makefunai posts made during the window join the pool the moment they
are made.

## How it works

`main.ts` (Node 22, standard library only) copies `POSTS.json` from
the repository root to `/output/POSTS.json`, where the gate reads it —
after checking the file is valid JSON with a `posts` array. Run it
locally with:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`POSTS.json` currently holds a placeholder address; the gate refuses
it on purpose. It is replaced with the real post addresses (from X's
Share button, `https://x.com/binan01x/status/<id>`) once the posts are
live, before submit.
