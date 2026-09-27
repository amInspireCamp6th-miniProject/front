# 프로젝트 세팅 안내

> [!IMPORTANT]
> **작업 시작 전 반드시 읽어주세요**
>
> - **`main` 브랜치에는 직접 push 할 수 없습니다.** GitHub에서 차단되어 있습니다.
> - 모든 작업은 **`develop` 에서 브랜치를 새로 따서** 진행합니다.
> - 작업이 끝나면 **`develop` 으로 PR** 을 올리고, **CI 초록불을 확인한 뒤 Merge** 합니다.
> - `main` 은 배포용입니다. `develop` → `main` PR 로만 반영합니다.
>
> ```
> feat/기능이름  ──PR──▶  develop  ──PR──▶  main
>   내 작업 공간           개발 통합본        배포용 최종본
> ```
>
> 실수로 `main` 이나 `develop` 에 push하면 아래 에러가 납니다. 고장이 아니라 **의도된 차단**입니다.
>
> ```
> remote: error: GH013: Repository rule violations found
> remote: - Changes must be made through a pull request.
> ```
>
> 자세한 순서는 아래 **5. 작업 흐름** 을 참고하세요.

## 0. 처음 받는 방법

```bash
git clone https://github.com/amInspireCamp6th-miniProject/front.git
cd front
npm install
npm run dev
```

터미널에 `http://localhost:5173` 주소가 뜹니다. 브라우저로 열면 화면이 보입니다.

`npm install` 은 프로젝트에 필요한 외부 코드(라이브러리)를 내려받는 명령입니다. `node_modules` 라는 폴더가 생기는데, 용량이 크고 자동 생성되는 거라 **GitHub에는 올리지 않습니다.** 그래서 각자 한 번씩 실행해야 합니다.

> **찾아볼 키워드**: `npm install`, `node_modules`, `package.json`

## 1. 필수 사전 설치

- **Node.js 24** — https://nodejs.org 에서 설치. 터미널에 `node -v` 를 쳐서 `v24.x.x` 가 나오면 됩니다
  - 버전이 다르면 "내 컴퓨터에선 되는데 남의 컴퓨터에선 터지는" 문제가 생깁니다. 되도록 맞춰주세요
- **VSCode 확장: Prettier - Code formatter** — 확장 탭에서 `Prettier` 검색, 만든 사람이 **`Esben Petersen`** 인 것을 설치

확장을 설치하면 이 프로젝트에서는 **파일을 저장할 때 코드 모양이 자동으로 정리됩니다.** 별도 설정은 필요 없습니다. 저장소 안에 설정이 이미 들어있어서 자동으로 적용됩니다.

## 2. 기술 스택

| 라이브러리          | 하는 일                                                   |
| ------------------- | --------------------------------------------------------- |
| **React 19**        | 화면을 만드는 도구. 이 프로젝트의 본체                    |
| **Vite**            | 개발 서버 + 빌드 도구. `npm run dev` 가 이걸 실행합니다   |
| **Tailwind CSS v4** | CSS를 별도 파일에 쓰지 않고 `className` 에 직접 쓰는 방식 |
| **React Router**    | 주소(URL)에 따라 다른 화면을 보여주는 도구                |
| **Zustand**         | 여러 화면이 공유하는 데이터를 담아두는 곳                 |
| **Axios**           | 서버에 데이터를 요청하는 도구                             |
| **ESLint**          | 버그가 될 만한 코드를 찾아서 경고                         |
| **Prettier**        | 코드 모양(띄어쓰기, 줄바꿈)을 자동 정리                   |

> **찾아볼 키워드**: `React`, `Vite`, `Tailwind CSS`, `React Router`, `Zustand`, `Axios`, `ESLint`, `Prettier`

### Tailwind 쓰는 법 (CSS 파일 안 만듭니다)

```jsx
<h1 className="text-3xl font-bold text-blue-500">제목</h1>
```

`text-3xl`(글자 크게), `font-bold`(굵게), `text-blue-500`(파란색). 이런 이름들을 조합해서 스타일을 줍니다. 어떤 이름이 있는지는 공식 문서에서 검색하면 됩니다 → https://tailwindcss.com/docs

**주의**: Tailwind는 브라우저의 기본 스타일을 전부 초기화합니다. 그래서 `<h1>` 을 써도 자동으로 커지지 않습니다. 크기와 굵기를 직접 지정해야 합니다.

> **찾아볼 키워드**: `Tailwind Preflight`, `CSS reset`, `Tailwind utility class`

## 3. 자주 쓰는 명령어

| 명령어           | 하는 일                                                            |
| ---------------- | ------------------------------------------------------------------ |
| `npm run dev`    | 개발 서버 실행. 코드를 고치면 브라우저가 자동으로 새로고침됩니다   |
| `npm run build`  | 배포용으로 빌드. **에러 없이 통과하는지 확인하는 용도로도 씁니다** |
| `npm run lint`   | ESLint 검사. 문제 있는 코드를 찾아줍니다                           |
| `npm run format` | 프로젝트 전체 코드 모양을 정리합니다                               |

**PR 올리기 전에 `npm run build` 를 한 번 돌려보세요.** 여기서 터지면 CI에서도 터집니다.

## 4. 브랜치 전략

브랜치는 **작업 공간을 분리하는 기능**입니다. 각자 다른 브랜치에서 작업하면 서로의 코드를 덮어쓰지 않습니다.

```
feat/로그인  ──PR──▶  develop  ──PR──▶  main
   내 작업 공간        개발 통합본        배포용 최종본
```

- **`main`** — 최종본. 항상 정상 동작해야 합니다. **직접 건드리지 않습니다**
- **`develop`** — 개발 중인 내용이 모이는 곳. 여기서 브랜치를 따서 작업합니다
- **`feat/...`, `fix/...`** — 각자의 작업 브랜치. 자유롭게 커밋하고 push해도 됩니다

**`main` 과 `develop` 은 직접 push가 차단되어 있습니다.** 반드시 PR을 통해야 합니다. 실수로 push하면 이런 에러가 납니다.

```
remote: error: GH013: Repository rule violations found
remote: - Changes must be made through a pull request.
```

에러가 아니라 **의도된 동작**입니다. 아래 순서대로 다시 하시면 됩니다.

> **찾아볼 키워드**: `Git branch`, `Git Flow`, `GitHub branch protection`

## 5. 작업 흐름 — 이 순서를 지켜주세요

### 1) develop 최신 상태로 맞추기

```bash
git switch develop
git pull
```

작업 시작 전에 항상 하세요. 이걸 안 하면 다른 사람이 올린 내용이 없는 상태로 작업하게 되어, 나중에 충돌이 납니다.

### 2) 작업 브랜치 만들기

```bash
git switch -c feat/login
```

`-c` 는 브랜치를 새로 만들면서 이동한다는 뜻입니다. 이름은 `feat/기능이름`, `fix/버그이름` 처럼 지어주세요.

### 3) 작업하고 커밋

```bash
git add .
git commit -m "feat: 로그인 화면 추가"
```

`add` 는 "이 파일들을 저장할 거야"라고 고르는 단계, `commit` 은 실제로 기록하는 단계입니다. 두 단계인 게 처음엔 헷갈리는데, 원래 그렇습니다.

### 4) 올리기

```bash
git push -u origin feat/login
```

`-u origin 브랜치이름` 은 **그 브랜치에서 처음 push할 때만** 씁니다. 두 번째부터는 `git push` 만 치면 됩니다.

### 5) PR 만들기

push하면 터미널에 링크가 출력됩니다. 클릭하면 PR 만드는 화면으로 갑니다.

- **목적지가 `develop` 인지 확인**하세요. `main` 으로 잘못 가는 경우가 많습니다
- 제목과 내용을 적고 Create

### 6) 초록불 확인 후 병합

PR 화면 아래에 검사 결과가 뜹니다. **초록 체크가 떠야 Merge 버튼이 눌립니다.**

### 7) 정리

```bash
git switch develop
git pull
```

병합이 끝나면 develop으로 돌아와서 최신화합니다. 다음 작업은 여기서 다시 1)번부터.

> **찾아볼 키워드**: `git switch`, `git add`, `git commit`, `git push`, `Pull Request`

## 6. CI가 뭔가요

PR을 올리면 **GitHub이 자동으로 코드를 검사**합니다. 이걸 CI라고 부릅니다. 세 가지를 검사합니다.

1. **포맷 검사** — 코드 모양이 규칙에 맞는지 (Prettier)
2. **린트** — 버그가 될 만한 코드가 있는지 (ESLint)
3. **빌드** — 실제로 빌드가 되는지. **여기서 대부분의 "터지는 코드"가 잡힙니다**

셋 중 하나라도 실패하면 빨간 X가 뜨고 **병합이 막힙니다.**

### 빨간 X가 떴을 때

PR 화면의 `Details` 를 클릭하면 어느 단계에서 실패했는지 로그가 나옵니다.

| 실패한 단계 | 해결 방법                                         |
| ----------- | ------------------------------------------------- |
| 포맷 검사   | 로컬에서 `npm run format` 실행 후 다시 커밋·push  |
| 린트        | `npm run lint` 실행하고 나오는 에러를 고침        |
| 빌드        | `npm run build` 실행해서 에러 메시지 확인 후 수정 |

고쳐서 같은 브랜치에 다시 push하면 **PR을 새로 만들 필요 없이 검사가 자동으로 다시 돕니다.**

> **찾아볼 키워드**: `CI/CD`, `GitHub Actions`

## 7. 자주 나는 문제

**`npm run dev` 가 안 돼요**
`npm install` 을 먼저 했는지 확인하세요. 그래도 안 되면 `node_modules` 폴더를 지우고 `npm install` 을 다시 하세요.

**`git push` 가 거부돼요 (`no upstream branch`)**
새로 만든 브랜치라 목적지가 등록되지 않은 겁니다. `git push -u origin 브랜치이름` 으로 한 번 올리세요.

**`git push` 가 거부돼요 (`Repository rule violations`)**
`main` 이나 `develop` 에 직접 push하려고 한 겁니다. 브랜치를 새로 만들어서 PR로 올려주세요.

**저장해도 코드 정리가 안 돼요**
VSCode Prettier 확장이 설치되어 있는지 확인하세요. 설치 후에는 `Ctrl+Shift+P` → `Developer: Reload Window` 를 한 번 실행하세요.

**PR에 충돌(conflict)이 났어요**
내 브랜치와 develop이 같은 줄을 서로 다르게 고친 상황입니다. 혼자 해결하려다 꼬이기 쉬우니 **채널에 물어봐 주세요.**

> **찾아볼 키워드**: `merge conflict`, `git pull`

## 8. 규칙 요약

- `main`, `develop` 에 **직접 push 금지**. PR만 사용
- 작업 브랜치는 **`develop` 에서** 파생
- PR 목적지는 **`develop`** (배포할 때만 `main`)
- CI **초록불** 확인 후 병합
- PR 올리기 전 로컬에서 `npm run build` 한 번

커밋 메시지 규칙은 별도로 공지 예정입니다.
