# node-advanced

# 환경변수

- `.env.example` 파일의 이름을 `.env`로 변경하고 아래 내용을 채움

```sh
SERVER_PORT=서버 포트
DATABASE_URL=mysql://계정이름:비밀번호@주소:포트/DB명
ACCESS_TOKEN_SECRET=JWT 생성을 위한 비밀키
```

# 실행 방법 (with yarn)

- 필요한 패키지 설치

```sh
yarn
```

- DB 테이블 생성

```sh
yarn prisma db push
```

- 서버 실행 (배포용)

```sh
yarn start
```

- 서버 실행 (개발용)

```sh
yarn dev
```

# API 명세서

https://modolee.notion.site/78aef426bed046338ee76802132e847c

# ERD

https://drawsql.app/teams/team-modolee/diagrams/sparta-node-advanced

## 📬 문의

- 문의는 Issues로 남겨주세요.

---

### commit 규칙

| 작업 타입   | 작업내용                       |
| ----------- | ------------------------------ |
| ✨ update   | 해당 파일에 새로운 기능이 생김 |
| 🎉 add      | 없던 파일을 생성함, 초기 세팅  |
| 🐛 bugfix   | 버그 수정                      |
| ♻️ refactor | 코드 리팩토링                  |
| 🩹 fix      | 코드 수정                      |
| 🚚 move     | 파일 옮김/정리                 |
| 🔥 del      | 기능/파일을 삭제               |
| 🍻 test     | 테스트 코드를 작성             |
| 💄 style    | CSS 스타일 변경                |
| 🙈 gitfix   | .gitignore 수정                |
| 🔨 function | function.js 변경(기능추가 등)  |

```
ex)
🩹 fix/파일명.뭐고침
```
