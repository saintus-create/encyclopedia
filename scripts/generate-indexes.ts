import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDir = path.join(__dirname, '..', 'content');

function extractTitle(filePath: string): string | null {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^title:\s*"([^"]+)"/m);
  return match ? match[1] : null;
}

function generateIndex(letter: string): void {
  const letterDir = path.join(contentDir, letter);
  
  if (!fs.existsSync(letterDir)) {
    console.log(`Skipping ${letter}/ - directory doesn't exist`);
    return;
  }

  const files = fs.readdirSync(letterDir)
    .filter(f => f.endsWith('.mdx') && f !== 'index.mdx')
    .sort();

  const entries = files.map(file => {
    const filePath = path.join(letterDir, file);
    const title = extractTitle(filePath);
    const slug = file.replace('.mdx', '');
    return title ? `- [${title}](/docs/${letter}/${slug})` : null;
  }).filter(Boolean) as string[];

  const indexContent = `---
title: "${letter.toUpperCase()}"
description: "Encyclopedia entries beginning with ${letter.toUpperCase()}"
---

# ${letter.toUpperCase()}

${entries.join('\n')}
`;

  const indexPath = path.join(letterDir, 'index.mdx');
  fs.writeFileSync(indexPath, indexContent);
  console.log(`Generated ${letter}/index.mdx with ${entries.length} entries`);
}

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y'];

letters.forEach(generateIndex);
console.log('\nAll index files generated successfully!');
