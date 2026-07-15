# @lchemy/api-filter-parser
TODO

[![NPM Version](https://img.shields.io/npm/v/@lchemy/api-filter-parser.svg)](https://www.npmjs.com/package/@lchemy/api-filter-parser)
[![Build Status](https://img.shields.io/travis/lchemy/api-filter-parser/master.svg)](https://travis-ci.org/lchemy/api-filter-parser)
[![Coverage Status](https://img.shields.io/coveralls/lchemy/api-filter-parser/master.svg)](https://coveralls.io/r/lchemy/api-filter-parser?branch=master)
[![GitHub Issues](https://img.shields.io/github/issues/lchemy/api-filter-parser.svg)](https://github.com/lchemy/api-filter-parser)

## Wat?
- Wat?

## Usage
TODO

## Codegen
The parser and lexer under `src/codegen/` are generated from `src/grammar/ApiFilter.g4` by [antlr4ts](https://github.com/tunnelvisionlabs/antlr4ts). The generated output is committed, so you only need to regenerate after editing the grammar:

```bash
npm run codegen
```

ANTLR is a Java tool, so this step — and therefore `npm run build` and `npm test`, which both run it — needs a JDK. See the gotcha below.

## Publishing
The package is published from the built output in `dist/`, never from the repo root. The root `package.json` is marked `private` and carries a `prepublishOnly` guard that fails on purpose; `gulp build:package` strips both, drops `devDependencies`, and sets `main` on the way into `dist/`.

```bash
npm run build
cd dist && npm publish
```

Use the Node version in `.nvmrc`. Preview the tarball first with `npm publish --dry-run` from `dist/`.

### Gotchas
- **Codegen needs a JDK.** macOS ships a `java` stub that only prints "Unable to locate a Java Runtime", so `build:codegen` fails with `antlr4ts exited with exit code 1`. Install one and put it on your `PATH`:
  ```bash
  brew install openjdk
  export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"
  ```
  Homebrew's `openjdk` is keg-only, so it is not linked into `PATH` for you. Without it, `npm run build` and `npm test` both fail before they reach TypeScript.
- **The runtime and the CLI must stay in lockstep.** `antlr4ts` and `antlr4ts-cli` are pinned to the same version on purpose. Generated code from an older CLI won't satisfy a newer runtime's abstract members — 0.4's output is missing `channelNames`, which 0.5's `Lexer` requires (TS2515). Bump both together and regenerate.
- **`@lchemy/orm` must not be exact-pinned.** An exact pin here can't dedupe against a consumer's `^` range, so downstream trees end up with two copies of orm and structurally incompatible `Orm` types. Keep it on a caret range.
- **Publishing needs a 2FA one-time password.** Pass it inline with `--otp=<code>`. Codes rotate every ~30 seconds, so use a fresh one.
- **CI does not verify releases.** travis-ci.org has been shut down, so nothing checks a release but you. Run `npm test` locally before publishing.
