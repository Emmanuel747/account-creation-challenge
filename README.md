## Quick Overview
![PReady Login Page with Dynamic User Feedback](https://github.com/user-attachments/assets/cb1280f1-40ab-43cb-b78e-898c05d3f789)

**Some examples of the new features:**
- Yes@gmail.com was already in the database, so I gracefully asked the user to use a different username or password.
- Checks for proper passwords on the client and API side. Informs the user of what is needed without being too specific
- Even if the user manipulates the DOM with the browser console, they won't get past the form
- The submit button remains disabled until the user has created a valid form entry to prevent unnecessary API calls.

## Tech used

You have been given a starter repository using TypeScript / React / Vite / Tailwind / Ruby on Rails. You will only need
a basic understanding of these technologies to successfully complete this coding challenge. Refer to the documentation
links below for more information.

### Development

- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [React docs](https://reactjs.org/docs/hello-world.html)
- [Tailwind docs](https://tailwindcss.com/docs/installation)
- [Vite - Getting Started](https://vitejs.dev/guide/)
- [Ruby on Rails - Getting Started](https://guides.rubyonrails.org/getting_started.html)

### Testing

- [Jest - Getting Started](https://jestjs.io/docs/getting-started)
- [Testing Rails Applications](https://guides.rubyonrails.org/testing.html)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/example-intro)

## Commands

`make -j dev` installs packages and starts the development server. The site exists at `localhost:3000`.

`make -j test` runs the tests.

## Versions

```
▶ node -v
v18.17.1

▶ npm -v
10.1.0
```

If NodeJS is not installed on your computer, we recommend using [nvm](https://github.com/nvm-sh/nvm) for version management.

```
▶ ruby -v
ruby 3.1.4p223 (2023-03-30 revision 957bb7cb81) [arm64-darwin22]
```

If Ruby is not installed on your computer, we recommend using [rbenv](https://github.com/rbenv/rbenv) for version management.

**Note:** `[arm64-darwin22]` may be different as it is dependent on your operating system.
