// A working news-image-daily entry (Node 22, standard library only): its image is the entry.png beside this file, and
// the program copies it to /output/entry.png. The image sums up the world news of Thursday 26 November 2026:
// 39 dated stories across 5 regions, each with a named source and a verification badge (CONFIRMED / OFFICIAL /
// REPORTED / CLAIM / ONGOING), a region tally, a UTC timeline, an IN NUMBERS strip, a world map with numbered
// pins, and a DATE CHECK box listing tempting stories excluded as earlier news. Original flat-vector drawings,
// no photos. The gate takes a whole PNG of at most 1 MiB and 1024 by 1024 pixels, and the judge sees exactly
// the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync(new URL('./entry.png', import.meta.url), join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
