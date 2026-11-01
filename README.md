# Sectional

Sectional is the set of colors, fonts and page parts I share across my projects, so they all look like they belong together. The look comes from the charts pilots use to find their way.

It works in plain HTML sites and in React or Vite apps. It has a light mode and a dark mode.

To see everything, open `docs/index.html` in your browser. The design rules are in [DESIGN.md](DESIGN.md).

## Add it to a project

Use the newest version from the [releases page](https://github.com/dom500d/design-system/releases). The examples below use `v0.1.0`.

### Plain HTML site

Add these lines inside `<head>`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600&family=Barlow:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dom500d/design-system@v0.1.0/dist/sectional.css">
```

Then use the classes in your page:

```html
<button class="ds-btn ds-btn--primary">Save route</button>
```

### Project that uses npm

Install it:

```sh
npm install github:dom500d/design-system#v0.1.0
```

Then import it:

```ts
import '@dom500d/design-system/sectional.css';
import { token, ds } from '@dom500d/design-system';

const style = { color: token.fg };
const className = ds('ds-btn', 'ds-btn--primary');
```

TypeScript will show an error if you misspell a color or class name.

The Google Fonts line from the HTML example is still needed, so add it to your page too.

## Light and dark mode

Sectional follows the mode set on the user's device. To force one mode, add `data-theme="light"` or `data-theme="dark"` to the `<html>` tag.

## Moving an existing project over

Sectional won't break your current styles. All of its class names start with `ds-`, and if your CSS clashes with Sectional, yours wins. You can switch over one piece at a time.

## Making changes

Colors and sizes live in `src/tokens.css`. The page parts live in `src/components/`.

After a change, run:

```sh
npm test
```

This rebuilds the files in `dist/` and checks that all text is still easy to read. Commit the `dist/` folder along with your changes.

## New versions

Every merge into `main` releases a new version on its own. A normal merge raises the last number, such as `0.1.0` to `0.1.1`. For a bigger jump, put `#minor` or `#major` in the merge message.

## License

All rights reserved. This code is public so my own projects can load it, but nobody else may use it. See [LICENSE](LICENSE).
