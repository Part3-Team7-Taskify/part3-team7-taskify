## 파트3_7팀 중급 프로젝트 README

김이서
임재은
정새론
정해성
하재호

## 주제

[Taskify] 는 일정 관리와 공유 기능을 제공하는 웹 애플리케이션입니다. 사용자는 가족, 회사 등 다양한 커뮤니티를 생성하고, 멤버를 초대하여 일정과 할 일 목록을 함께 관리할 수 있습니다. 커뮤니티 내에서 작성된 일정은 카드 형태로 다른 멤버에게 공유되며, 할 일 목록의 생성, 게시, 수정, 삭제와 같은 CRUD 기능을 구현합니다. 또한, 멤버 초대, 목록 분류, 검색, 댓글 작성 기능을 더해 유기적인 커뮤니티 서비스 구축 경험을 제공합니다. TypeScript를 활용하여 프로젝트가 복잡해졌을 때도 안정적인 코드를 유지할 수 있으며, 할 일 카드, 모달, 드래그 앤 드랍과 같은 UI 개발을 위해 외부 라이브러리를 적극 활용하여 가독성과 사용성을 개선할 수 있습니다.
협업 툴이나 일정 관리 시스템에 관심 있는 학생들에게 적합합니다.

## 기술 스택

- HTML & CSS
- Typescript
- tailwind
- Next.js
- React
- OAuth
- Drag n Drop UI
- Zustand
  
## 배포 사이트

## 수행 계획서

## 디자인 시안

[🔗Figma](https://www.figma.com/design/duRdnTqTeenOrKYOX1Byk6/-BBB-Taskify?node-id=109-2344&t=Y5cFb9F8Lde5Z6u4-0)

## API

[🔗Swagger](https://sp-taskify-api.vercel.app/docs/#/)

## 폴더 구조
```
📦public
 ┣ 📂icon
 ┗ 📂images
 📦src
 ┣ 📂api
 ┣ 📂app
 ┃ ┣ 📂dashboard
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂landing
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂signup
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂assets
 ┃ ┗ 📂fonts
 ┣ 📂components
 ┣ 📂contexts
 ┣ 📂function
 ┗ 📂hooks
```
