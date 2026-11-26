// Two Days of Quiet Dread — entry writer.
// Writes one code-review comment (approving, with quiet existential dread)
// to /output/entry.txt, falling back to a local entry.txt when /output
// is not writable.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "Approved. This will outlive every one of us, which is either the code's best feature or its quietest threat.";

// The gate accepts a single line of 1–140 characters; refuse to write
// anything that would be scored invalid.
function checkEntry(text: string): void {
  if (text.includes("\n") || text.length < 1 || text.length > 140) {
    throw new Error(`entry must be one line of 1-140 chars, got ${text.length}`);
  }
}

function writeEntry(): void {
  checkEntry(ENTRY);
  const target = "/output/entry.txt";
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, ENTRY, "utf8");
    console.log(`wrote ${target}`);
  } catch {
    const fallback = "entry.txt";
    writeFileSync(fallback, ENTRY, "utf8");
    console.log(`wrote ${fallback} (fallback)`);
  }
}

writeEntry();
