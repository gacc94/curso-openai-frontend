# Angular OpenAI Frontend

This project was generated with [Angular CLI](https://angular.io/cli) version 16.x.x.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [pnpm](https://pnpm.io/) package manager

## Installation

First, install pnpm if you haven't already:

```bash
npm install -g pnpm
```

Then install project dependencies:

```bash
pnpm install
```

ngx-markdown

```bash
pnpm add ngx-markdown
```


## Development server

Run the development server:

```bash
pnpm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Build the project:

```bash
pnpm build
```

The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Execute unit tests via [Karma](https://karma-runner.github.io):

```bash
pnpm test
```

## Running end-to-end tests

Execute end-to-end tests via [Cypress](https://www.cypress.io/):

```bash
pnpm e2e
```

## Additional Commands

- `pnpm lint`: Run linting
- `pnpm watch`: Build in watch mode
- `pnpm serve:prod`: Serve production build locally

## Further help

To get more help on the Angular CLI use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd angular-openai-frontend
```

2. Create a `.env` file in the project root:
```bash
OPENAI_API_KEY=your_api_key_here
API_BASE_URL=http://localhost:3000
```

3. Set up environment variables:
- Copy `.env.template` to `.env`
- Fill in your OpenAI API key and other required variables

## Configuration

The application uses environment files located in `src/environments/`:
- `environment.ts` for development
- `environment.prod.ts` for production
