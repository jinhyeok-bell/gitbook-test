# 와이어프레임 라벨링

원본 PNG에 라벨을 자동 추가하고 체크리스트를 생성합니다.

## 실행

```bash
node scripts/label-wireframes.js
```

## 결과

1. **체크리스트**: `docs/wireframes/LABEL_CHECKLIST.md`
2. **라벨 이미지**: `docs/wireframes/*-labeled.png`

## 라벨 위치 수정

`scripts/label-positions.json`에서 x, y 좌표 조정 후 다시 실행

## 색상

- 🔵 섹션: #3B82F6
- 🔴 컴포넌트: #EF4444
