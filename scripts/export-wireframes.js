#!/usr/bin/env node

/**
 * Penpot Wireframe Export Script
 *
 * Penpot API를 사용하여 .pen 파일의 프레임을 PNG로 export합니다.
 *
 * 사용법:
 *   1. .env 파일에 PENPOT_EMAIL, PENPOT_PASSWORD 설정
 *   2. node scripts/export-wireframes.js
 *
 * 필요한 패키지:
 *   npm install node-fetch@2
 */

const fs = require('fs');
const path = require('path');

// Penpot API 설정
const PENPOT_API = 'https://design.penpot.app/api/rpc/command';
const WIREFRAMES_DIR = path.join(__dirname, '../docs/wireframes');

// 환경변수에서 인증 정보 로드
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const EMAIL = process.env.PENPOT_EMAIL;
const PASSWORD = process.env.PENPOT_PASSWORD;

// Export할 프레임 목록
const FRAMES_TO_EXPORT = [
  { name: 'Landing Page - Desktop', filename: 'Landing Page - Desktop.png' },
  { name: 'Test - Intro', filename: 'Test - Intro.png' },
  { name: 'Test - Question', filename: 'Test - Question.png' },
  { name: 'Test - ISI Question', filename: 'Test - ISI Question.png' },
  { name: 'Test - Result', filename: 'Test - Result.png' },
  { name: 'Register - Form', filename: 'Register - Form.png' },
  { name: 'Register - Success + Test Part 1', filename: 'Register - Success + Test Part 1.png' },
];

async function login(fetch) {
  console.log('Penpot 로그인 중...');

  const response = await fetch(PENPOT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/transit+json' },
    body: JSON.stringify({
      '~:cmd': 'login-with-password',
      '~:params': {
        '~:email': EMAIL,
        '~:password': PASSWORD,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`로그인 실패: ${response.status}`);
  }

  // 쿠키에서 세션 토큰 추출
  const cookies = response.headers.get('set-cookie');
  console.log('로그인 성공!');
  return cookies;
}

async function getProjects(fetch, cookies) {
  const response = await fetch(PENPOT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/transit+json',
      'Cookie': cookies,
    },
    body: JSON.stringify({
      '~:cmd': 'get-all-projects',
      '~:params': {},
    }),
  });

  return response.json();
}

async function exportFrame(fetch, cookies, fileId, frameId, filename) {
  console.log(`Exporting: ${filename}...`);

  const response = await fetch(`https://design.penpot.app/api/export`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies,
    },
    body: JSON.stringify({
      file_id: fileId,
      page_id: null, // 전체 페이지
      object_ids: [frameId],
      type: 'png',
      scale: 2, // 2x 해상도
    }),
  });

  if (!response.ok) {
    throw new Error(`Export 실패: ${filename}`);
  }

  const buffer = await response.buffer();
  const outputPath = path.join(WIREFRAMES_DIR, filename);
  fs.writeFileSync(outputPath, buffer);
  console.log(`저장 완료: ${outputPath}`);
}

async function main() {
  // 동적 import (node-fetch v2 사용)
  const fetch = (await import('node-fetch')).default;

  if (!EMAIL || !PASSWORD) {
    console.error('오류: .env 파일에 PENPOT_EMAIL과 PENPOT_PASSWORD를 설정하세요.');
    console.log(`
예시 (.env 파일):
PENPOT_EMAIL=your-email@example.com
PENPOT_PASSWORD=your-password
    `);
    process.exit(1);
  }

  try {
    const cookies = await login(fetch);

    console.log('\n프로젝트 목록을 가져오는 중...');
    console.log('(Penpot 파일 ID를 찾으려면 브라우저에서 파일을 열고 URL에서 확인하세요)');
    console.log('\n예: https://design.penpot.app/#/workspace/PROJECT_ID/FILE_ID');

    // 실제 export는 파일 ID와 프레임 ID가 필요합니다.
    // Wireframe.pen 파일에서 프레임 ID를 추출할 수 있습니다.

    console.log('\n현재 스크립트는 기본 구조만 제공합니다.');
    console.log('Penpot 파일 ID와 프레임 ID를 설정하면 자동 export가 가능합니다.');

  } catch (error) {
    console.error('오류 발생:', error.message);
    process.exit(1);
  }
}

main();
