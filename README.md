A modern React + TypeScript application to search, view, and manage GitHub users. It includes authentication via GitHub tokens, protected routes, persistent login, Redux for state management, custom hooks, unit testing, and clean alias-based structure.
---

## Features
-  **Login with GitHub Token**
-  **View User Profiles**
-  **GitHub User Search**
-  **Follow / Unfollow Users**
-  **Protected Routes**
-  **Redux Toolkit for State Management**
-  **Unit Testing with Vitest + Testing Library**
-  **ESLint + Prettier for Formatting**
-  **Path Aliases (e.g., `@components`, `@screens`)**
---

## Folder Structure
```
src/
│
├── components/       # Reusable UI components
├── containers/       # Layout components
├── screens/          # Page views (Login, Profile, etc.)
├── services/         # Axios services
├── store/            # Redux slices & setup
├── routes/           # Route configuration
├── hooks/            # Custom React hooks
├── App.tsx           # Root component
├── main.tsx          # Entry point
└── setupTests.ts     # Vitest setup
```

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/github-user-explorer.git
cd github-user-explorer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

> Visit `http://localhost:5173` in your browser.
---

## Run Tests

```bash
npm run test
```

Runs unit tests with [Vitest](https://vitest.dev/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
---

## Scripts

| Script         | Purpose                    |
|----------------|----------------------------|
| `npm run dev`  | Start development server   |
| `npm run build`| Build for production       |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests             |
| `npm run lint` | Run ESLint                 |
| `npm run format` | Format code using Prettier|

---

## Aliases (tsconfig + Vite)

```ts
// tsconfig.json
"paths": {
  "@components/*": ["./src/components/*"],
  "@screens/*": ["./src/screens/*"],
  "@store/*": ["./src/store/*"]
}
```

```ts
// vite.config.ts
resolve: {
  alias: {
    '@components': path.resolve(__dirname, './src/components'),
    '@screens': path.resolve(__dirname, './src/screens'),
    '@store': path.resolve(__dirname, './src/store'),
  }
}
```
---

## GitHub Token Auth

- Token is stored in Redux for persistence.
- API requests (e.g. `GET /user`, `GET /users/:username`) use the token via headers:
  ```ts
  headers: {
    Authorization: `token ${token}`,
  }
  ```
---

## TODOs
- [ ] Add dark/light mode toggle
---

## License
This project is licensed under the MIT License.

## Author
Abhijeet Kumar 