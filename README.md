<div align="center">
  <a href="https://bun.sh"
    ><img width="80" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/bun_js.png" alt="Bun.js" title="Bun.js"/></a>
  <a href="https://www.typescriptlang.org"
    ><img width="80" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" alt="TypeScript" title="TypeScript"/></a>
  <a href="https://react.dev"
    ><img width="80" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" alt="react.dev" title="React"/></a>
  <a href="https://tailwindcss.com/"
    ><img width="80" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tailwind_css.png" alt="Tailwind CSS" title="Tailwind CSS"/></a>
</div>

<div align="center">
  <h1>Bun + TypeScript + React + Tailwind CSS</h1>

  <p class="flex gap-1">
    <a href="https://github.com/acfatah/bun-react/commits/main">
      <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/t/acfatah/bun-react?style=flat-square"
    ></a>
    <img alt="GitHub last commit (by committer)" src="https://img.shields.io/github/last-commit/acfatah/bun-react?display_timestamp=committer&style=flat-square">
    <img alt="GitHub forks" src="https://img.shields.io/github/forks/acfatah/bun-react?style=flat-square">
  </p>
</div>

`Bun`, `TypeScript` and `React` template with `Tailwind CSS` pre-configured.

> [!IMPORTANT]
> Work in progress!

## Starter Template

`mkdir` your project name, `cd` to it then run,

```bash
bunx --bun tiged acfatah/bun-react/templates/starter && bun update
```

### Post-install Scripts

By default, `bun` will block all post-install scripts. Current notable packages that require post-install scripts are:

- `@swc/core` React Speedy Web Compiler
- `@tailwindcss/oxide` used by Tailwind

To list them, run

```bash
bun pm untrusted
```

To execute them, run

```bash
bun pm trust --all
```

or specify the package name one by one.
