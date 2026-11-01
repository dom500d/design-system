# Sectional design rules

Sectional is drawn from aeronautical and survey charts. Screens should feel printed and exact: flat surfaces, thin lines, and one bright mark that shows where you are.

## The route line

The magenta line with a hollow waypoint ring is the only signature in the kit. Use it for position or progress along something: the current nav item, the active tab, timelines, steps and progress.

- Solid line: behind you.
- Filled ring: where you are.
- Dashed line: still ahead.

Do not use it as decoration, a divider or a heading underline. A list with no "current" item, such as a past-jobs timeline, stays solid.

## Color

| Token | Use |
|---|---|
| `bg`, `surface`, `sunken` | Page, raised panels, wells and map backgrounds |
| `line`, `lineStrong` | Dividers, then control edges |
| `fg`, `fg2` | Text, then quieter text |
| `accent`, `fill` | Position, focus and the main action |
| `second` | Links and secondary information |
| `good`, `warn`, `bad` | State only, never branding |
| `series1` to `series4` | Chart data, used in that order |

Magenta has to stay scarce. Aim for one primary button per view, and let the route line be the only other magenta on screen where possible.

## Shape and depth

- Controls use a 5px radius. Containers use 8px. Rings and the switch are the only round shapes.
- Separate things with a line or a tint. Only overlays (dialogs and toasts) cast a shadow.
- No gradients, glows or decorative accent bars on cards.

## Type

- Barlow Condensed for headings and figures. Barlow for everything else. IBM Plex Mono for code only.
- Sentence case throughout. No all-caps labels.
- Weights are 400, 500 and 600.
- Figures use tabular numerals, with the unit smaller and quieter than the number.

## Motion

- Hover changes color. Nothing lifts, scales or slides.
- Use 120ms for hover and 220ms for overlays appearing.
- `prefers-reduced-motion` turns all of it off.

## Component choices

- Chips filter a list and can be combined. Segments choose exactly one option.
- State always has a word and a ring, never a bare dot. Tags are plain categories.
- Whole-card links respond with their border and title color.
- Skeletons hold the shape of loading content. Avoid spinners.
- Navigation has no hamburger: on narrow screens the links get their own scrolling row.
- Icons are Lucide at 1.5px stroke, in the color of the surrounding text.

## Writing

- Name actions for what they do, and keep that name through the flow: "Save route", then "Route saved".
- Errors say what happened and how to fix it.
- No emoji in UI text.
