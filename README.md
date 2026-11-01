# Sectional

Shared color tokens and CSS components for my projects, drawn from aeronautical and survey charts. It is plain CSS, so it works with static HTML, Vite and React alike, and it has light and dark themes.

Open `docs/index.html` to see everything, and read [DESIGN.md](DESIGN.md) for the rules. Run `npm run docs` to rebuild and open it.

## Use it

No release is tagged yet. Replace `v0.1.0` below with the latest tag once one exists.

### Static sites

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600&family=Barlow:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dom500d/design-system@v0.1.0/dist/sectional.css">
```

### Projects with npm

```sh
npm install github:dom500d/design-system#v0.1.0
```

```ts
import '@dom500d/design-system/sectional.css';
import { token, light, ds } from '@dom500d/design-system';

// Follows the active theme. A misspelled name is a type error.
const style = { color: token.fg, padding: token.space4 };

// Joins class names, and rejects any the kit does not ship.
const className = ds('ds-btn', 'ds-btn--primary', small && 'ds-btn--sm');

// Raw values, for canvas or map libraries that cannot read CSS variables.
L.polyline(points, { color: light.accent });
```

`token` holds `var(--ds-*)` references, so it updates with the theme. `light` and `dark` hold raw values, so reach for those only when CSS variables are not an option. `TokenName` and `DsClass` are exported as types.

## Theming

The kit follows the system setting. To force a theme, set `data-theme="light"` or `data-theme="dark"` on `<html>`.

## Adopting it gradually

Everything is in the `ds.*` cascade layers and uses `ds-` names, so it will not collide with existing styles. A project's own CSS always wins, which means components can be migrated one at a time.

## Development

`src/tokens.css` is the single source for tokens. `npm run build` generates `dist/sectional.css`, `dist/tokens.js` and `dist/tokens.d.ts` from `src/`, so a new token or class gets its types automatically. Commit `dist/`, because CDN and git installs use it directly.

`npm test` builds, then fails if any text and background pair drops below WCAG AA in either theme.
