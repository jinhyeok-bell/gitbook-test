#!/usr/bin/env node

/**
 * 와이어프레임 라벨링 통합 스크립트
 *
 * 사용법: node scripts/label-wireframes.js
 *
 * 기능:
 * 1. 스펙 문서에서 ID 추출 → 체크리스트 생성
 * 2. original/ PNG 위에 라벨 오버레이 → labeled/ 에 저장
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DOCS_DIR = path.join(__dirname, '../docs/pages');
const WIREFRAMES_DIR = path.join(__dirname, '../docs/wireframes');
const ORIGINAL_DIR = path.join(WIREFRAMES_DIR, 'original');
const LABELED_DIR = path.join(WIREFRAMES_DIR, 'labeled');
const POSITIONS_FILE = path.join(__dirname, 'label-positions.json');

// ============================================================
// 1. 체크리스트 생성
// ============================================================

const WIREFRAME_MAPPING = {
  'Landing Page - Desktop': { doc: 'landing.md', prefix: 'LAND', sections: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '011'] },
  'Test - Intro': { doc: 'test.md', prefix: 'TEST', sections: ['001', '002'] },
  'Test - Question': { doc: 'test.md', prefix: 'TEST', sections: ['003', '004'] },
  'Test - ISI Question': { doc: 'test.md', prefix: 'TEST', sections: ['003', '005'] },
  'Test - Result': { doc: 'test.md', prefix: 'TEST', sections: ['008', '009'] },
  'Register - Form': { doc: 'register.md', prefix: 'REG', sections: ['001', '002', '003'] },
  'Register - Success + Test Part 1': { doc: 'register.md', prefix: 'REG', sections: ['004'], extra: { doc: 'test.md', prefix: 'TEST', sections: ['004'] } }
};

function extractIdsFromDoc(docPath) {
  const content = fs.readFileSync(docPath, 'utf-8');
  const lines = content.split('\n');
  const ids = new Map();

  for (const line of lines) {
    const sectionMatch = line.match(/^###\s+(LAND|TEST|REG)-(\d{3})\s+(.+)/);
    if (sectionMatch) {
      const id = `${sectionMatch[1]}-${sectionMatch[2]}`;
      ids.set(id, { id, name: sectionMatch[3].trim(), type: 'section' });
    }

    const tableMatch = line.match(/\|\s*(LAND|TEST|REG)-(\d{3})-([a-z])\s*\|([^|]+)\|/);
    if (tableMatch) {
      const id = `${tableMatch[1]}-${tableMatch[2]}-${tableMatch[3]}`;
      ids.set(id, { id, name: tableMatch[4].trim(), type: 'component' });
    }
  }
  return ids;
}

function generateChecklist() {
  const output = ['# 와이어프레임 라벨링 체크리스트\n', '> 자동 생성: `node scripts/label-wireframes.js`\n', '---\n'];

  const wireframes = fs.readdirSync(ORIGINAL_DIR)
    .filter(f => f.endsWith('.png'))
    .sort();

  for (const wireframe of wireframes) {
    const name = wireframe.replace('.png', '');
    const mapping = WIREFRAME_MAPPING[name];
    if (!mapping) continue;

    output.push(`## ${name}\n`);

    const docPath = path.join(DOCS_DIR, mapping.doc);
    const ids = extractIdsFromDoc(docPath);

    if (mapping.extra) {
      const extraIds = extractIdsFromDoc(path.join(DOCS_DIR, mapping.extra.doc));
      extraIds.forEach((v, k) => ids.set(k, v));
    }

    const relevantSections = mapping.sections.map(s => `${mapping.prefix}-${s}`);
    if (mapping.extra) mapping.extra.sections.forEach(s => relevantSections.push(`${mapping.extra.prefix}-${s}`));

    const sectionLabels = [], componentLabels = [];
    ids.forEach((value, key) => {
      if (value.type === 'section' && relevantSections.includes(key)) sectionLabels.push(value);
      else if (value.type === 'component') {
        const parent = `${key.split('-')[0]}-${key.split('-')[1]}`;
        if (relevantSections.includes(parent)) componentLabels.push(value);
      }
    });

    output.push('### 🔵 섹션 (#3B82F6)\n');
    sectionLabels.sort((a, b) => a.id.localeCompare(b.id)).forEach(l => output.push(`- [ ] **${l.id}**: ${l.name}`));
    output.push('\n### 🔴 컴포넌트 (#EF4444)\n');
    componentLabels.sort((a, b) => a.id.localeCompare(b.id)).forEach(l => output.push(`- [ ] **${l.id}**: ${l.name}`));
    output.push('\n---\n');
  }

  return output.join('\n');
}

// ============================================================
// 2. 라벨 이미지 생성
// ============================================================

const LABEL_STYLES = {
  section: { bgColor: '#3B82F6', textColor: '#FFFFFF', fontSize: 12, padding: 4, borderRadius: 3 },
  component: { bgColor: '#EF4444', textColor: '#FFFFFF', fontSize: 10, padding: 3, borderRadius: 2 }
};

function createLabelSvg(labels, width, height) {
  const svgLabels = labels.map(label => {
    const style = label.type === 'section' ? LABEL_STYLES.section : LABEL_STYLES.component;
    const charWidth = style.fontSize * 0.6;
    const textWidth = label.id.length * charWidth + style.padding * 2;
    const textHeight = style.fontSize + style.padding * 2;

    return `
      <g transform="translate(${label.x}, ${label.y})">
        <rect x="0" y="0" width="${textWidth}" height="${textHeight}" rx="${style.borderRadius}" fill="${style.bgColor}" opacity="0.95"/>
        <text x="${style.padding}" y="${style.fontSize + style.padding - 2}" font-family="Arial, sans-serif" font-size="${style.fontSize}" font-weight="bold" fill="${style.textColor}">${label.id}</text>
      </g>`;
  }).join('');

  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${svgLabels}</svg>`);
}

async function addLabelsToImages() {
  // labeled 폴더 생성
  if (!fs.existsSync(LABELED_DIR)) {
    fs.mkdirSync(LABELED_DIR, { recursive: true });
  }

  const positions = JSON.parse(fs.readFileSync(POSITIONS_FILE, 'utf-8'));
  const pngFiles = fs.readdirSync(ORIGINAL_DIR).filter(f => f.endsWith('.png'));

  for (const pngFile of pngFiles) {
    const baseName = pngFile.replace('.png', '');
    const inputPath = path.join(ORIGINAL_DIR, pngFile);
    const outputPath = path.join(LABELED_DIR, `${baseName}-labeled.png`);
    const labels = positions[baseName]?.labels || [];

    if (labels.length === 0) {
      console.log(`  ⚠️  ${baseName}: 라벨 위치 없음`);
      continue;
    }

    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const svgOverlay = createLabelSvg(labels, metadata.width, metadata.height);

    await image.composite([{ input: svgOverlay, top: 0, left: 0 }]).toFile(outputPath);
    console.log(`  ✅ ${baseName}: 라벨 ${labels.length}개`);
  }
}

// ============================================================
// 메인
// ============================================================

async function main() {
  console.log('🏷️  와이어프레임 라벨링\n');

  // 1. 체크리스트 생성
  console.log('📝 체크리스트 생성...');
  const checklist = generateChecklist();
  const checklistPath = path.join(WIREFRAMES_DIR, 'LABEL_CHECKLIST.md');
  fs.writeFileSync(checklistPath, checklist);
  console.log(`   → ${checklistPath}\n`);

  // 2. 라벨 이미지 생성
  console.log('🖼️  라벨 이미지 생성...');
  await addLabelsToImages();

  console.log('\n✅ 완료!');
  console.log('   - 체크리스트: docs/wireframes/LABEL_CHECKLIST.md');
  console.log('   - 이미지: docs/wireframes/labeled/*-labeled.png');
  console.log('   - 위치 수정: scripts/label-positions.json');
}

main().catch(console.error);
