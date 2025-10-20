# sendbird

샌드버드의 uikit를 가지고 AI Agent ui 구현하기(큐봇과 비슷한 형태)

# 🧠 AI Agent

React + TypeScript 기반의 **AI Agent** 웹 애플리케이션입니다.  
이 프로젝트는 **Create React App (CRA)** 환경 위에 **Tailwind CSS**와 **Storybook**을 통합하여, 컴포넌트 단위 개발과 스타일 시스템 구축을 손쉽게 할 수 있도록 구성되어 있습니다.

---

## 🚀 실행 가이드

### 0️⃣ 프로젝트로 이동

cd aiagent

### 1️⃣ 프로젝트 설치

```bash
# yarn 사용 시
yarn install

# 또는 npm 사용 시
npm install
```

---

### 2️⃣ 개발 서버 실행

```bash
# CRA 개발 서버 실행
yarn start
```

> 기본 포트: **[http://localhost:3000](http://localhost:3000)**

소스 코드 수정 시 자동으로 페이지가 새로고침됩니다 (Hot Reload).

---

### 3️⃣ 빌드

```bash
# 프로덕션 빌드
yarn build
```

> 결과물은 `/build` 폴더에 생성됩니다.  
> 정적 호스팅(Vercel, Netlify 등)에 바로 배포할 수 있습니다.

---

### 4️⃣ 테스트

```bash
# Jest + Testing Library 테스트 실행
yarn test
```

> `@testing-library/react` 기반으로 UI 컴포넌트 테스트를 수행합니다.

---

### 5️⃣ Storybook 실행

```bash
# Storybook 개발 서버 실행
yarn storybook
```

> 기본 포트: **[http://localhost:6006](http://localhost:6006)**

> 컴포넌트를 문서화하고, 독립적으로 테스트할 수 있는 환경을 제공합니다.

---

### 6️⃣ Storybook 정적 빌드

```bash
# Storybook 정적 파일 생성
yarn build-storybook
```

> 결과물은 `/storybook-static` 폴더에 생성됩니다.  
> 배포 시 정적 서버(Nginx, Vercel 등)로 서빙 가능합니다.

---

## 📁 폴더 구조

```
aiagent/
├── public/               # 정적 파일 (index.html, favicon 등)
├── src/
│   ├── components/       # UI 컴포넌트
│   ├── pages/            # 페이지 단위 컴포넌트
│   ├── styles/           # Tailwind 및 글로벌 스타일
│   ├── App.tsx           # 루트 컴포넌트
│   └── index.tsx         # 엔트리 포인트
├── .eslintrc             # ESLint 설정
├── tailwind.config.js    # Tailwind 설정
├── postcss.config.js     # PostCSS 설정
├── package.json
└── README.md
```

---

## 🎨 스타일 시스템 (Tailwind CSS)

Tailwind CSS를 기반으로 **Utility-First** 스타일링을 적용합니다.  
예시:

```tsx
<button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
  버튼
</button>
```

> Tailwind 설정은 `tailwind.config.js`에서 커스터마이징할 수 있습니다.

---

## ⚙️ 사용된 기술 스택

| 구분          | 기술                         |
| ------------- | ---------------------------- |
| Framework     | React (CRA 5.0.1)            |
| Language      | TypeScript                   |
| CSS Framework | Tailwind CSS                 |
| UI Docs       | Storybook 9.x                |
| Build Tool    | Webpack 5                    |
| Test          | Jest + React Testing Library |
| Lint          | ESLint + Storybook Plugin    |

---

## 📜 스크립트 명령어 정리

| 명령어                 | 설명                       |
| ---------------------- | -------------------------- |
| `yarn start`           | React 개발 서버 실행       |
| `yarn build`           | 프로덕션 빌드              |
| `yarn test`            | 테스트 실행                |
| `yarn eject`           | CRA 구성 파일 추출 (주의!) |
| `yarn storybook`       | Storybook 개발 서버 실행   |
| `yarn build-storybook` | Storybook 정적 파일 빌드   |

---

## 🧩 개발 환경 권장 버전

| 항목       | 권장 버전 |
| ---------- | --------- |
| Node.js    | 16.x 이상 |
| Yarn       | 1.x 이상  |
| npm        | 8.x 이상  |
| React      | ^19.2.0   |
| TypeScript | ^4.9.5    |

---

## 🪄 ESLint 설정

이 프로젝트는 Storybook 환경에서도 린트를 통합 관리합니다.

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:storybook/recommended"
  ]
}
```

---

## 🛠️ 빌드 타깃 브라우저

`browserslist` 설정에 따라 자동으로 최적화됩니다.

- **프로덕션 빌드 대상**
  ```
  >0.2%, not dead, not op_mini all
  ```
- **개발 환경**
  ```
  last 1 chrome version, last 1 firefox version, last 1 safari version
  ```

---

## 🧠 라이선스

이 프로젝트는 **MIT License** 하에 배포됩니다.
