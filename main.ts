// A working news-image-daily entry (Node 22, standard library only). The entry is
// the entry.png beside this file, and this program copies it to /output/entry.png.
// The image sums up the world news of Thursday 26 November 2026 after the UTC day
// closed: 42 dated stories across 5 regions, each with a named source and a
// verification badge (CONFIRMED / OFFICIAL / REPORTED / CLAIM / ONGOING), a region
// tally, a UTC timeline, an IN NUMBERS strip, a world map with numbered pins, and
// a DATE CHECK box listing tempting stories excluded as earlier news. Original
// flat-vector drawings, no photos. The gate takes one PNG of at most 1 MiB and
// exactly 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
// Before copying, the entrypoint validates the file it ships — PNG signature,
// exact 1024x1024 dimensions, and the 1,048,576-byte cap — and fails loudly
// instead of shipping a bad image.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1_048_576;
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;
// PNG file signature: 89 50 4E 47 0D 0A 1A 0A
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const source = new URL('./entry.png', import.meta.url);
const bytes = readFileSync(source);

// 1. The file must fit under the byte cap (the gate rejects anything over 1 MiB).
if (bytes.length > MAX_BYTES) {
  console.error(`entry.png failed byte-cap check: ${bytes.length} bytes > ${MAX_BYTES} bytes`);
  process.exit(1);
}

// 2. The file must start with the PNG signature.
if (bytes.length < 24 || !bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  console.error('entry.png failed PNG signature check: first 8 bytes are not the PNG magic number');
  process.exit(1);
}

// 3. The IHDR must declare exactly 1024x1024 (width/height are big-endian uint32
// at offsets 16 and 20).
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
  console.error(`entry.png failed dimension check: ${width}x${height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`);
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });
copyFileSync(source, join(outputDir, 'entry.png'));
