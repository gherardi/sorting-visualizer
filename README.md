# Sorting Visualizer

An interactive web app that animates classic sorting algorithms step by step. Pick an algorithm, an array size and a speed, then watch each comparison and swap play out as a set of vertical bars.

## Features

- **Five algorithms:** Bubble Sort, Selection Sort, Insertion Sort, Merge Sort and Quick Sort
- **Array sizes:** 25, 50 or 75 elements, with values from 5 to 100
- **Three speeds:** Slow (200 ms per step), Medium (50 ms) and Fast (10 ms). You can change the speed while a sort is running.
- **Visual feedback:** bars being compared or moved are highlighted, and the whole array changes color once it is sorted
- **Randomize** generates a new array at any time when no sort is running
- Light and dark themes, plus a collapsible sidebar that works on mobile

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) with React 19
- TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4 and [shadcn/ui](https://ui.shadcn.com) components (Base UI)
- [Zustand](https://zustand.docs.pmnd.rs) for state
- [Vitest](https://vitest.dev) for tests

## Getting started

You need Node.js 26 (see [.nvmrc](.nvmrc)).

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Start the development server        |
| `npm run build` | Build for production                |
| `npm run start` | Serve the production build          |
| `npm run lint`  | Run ESLint                          |
| `npm test`      | Run the algorithm tests with Vitest |

<!-- ## How it works

Each algorithm in [lib/sorting.ts](lib/sorting.ts) is a generator function that works on a `TrackedArray`. Every operation on that array (`compare`, `swap`, `set`) changes the data and returns a **frame**: a snapshot of the array plus the indices involved. Because the frame comes from the operation itself, an algorithm can't show a move it didn't make.

`frames(algorithm, array)` returns these frames lazily and never mutates the input. The store in [lib/store.ts](lib/store.ts) loops over them, renders each frame and waits for the current speed's delay before the next one. Since it reads the delay on every step, speed changes apply right away. -->

<!-- ### Project structure

```
app/                    Next.js layout, page and global styles
components/
  app-sidebar.tsx       Sidebar with the settings and actions
  sidebar/              Algorithm, array size and speed controls, plus Randomize/Sort buttons
  visualizer/bars.tsx   Renders the array as bars
  ui/                   shadcn/ui components
lib/
  algorithms.ts         Available algorithms, speeds and array sizes
  sorting.ts            Generator-based sorting algorithms
  sorting.test.ts       Tests for every algorithm
  store.ts              Zustand store that holds and drives the visualization
``` -->

<!-- ## Adding an algorithm

1. Add an entry `{ id, title }` to `algorithms` in [lib/algorithms.ts](lib/algorithms.ts).
2. Write a generator `function* mySort(t: TrackedArray)` in [lib/sorting.ts](lib/sorting.ts) that yields `t.compare(...)`, `t.swap(...)` or `t.set(...)` for each step.
3. Register it in the `sorters` map under the same id.

The test suite runs against every entry in `algorithms` automatically, so `npm test` covers the new algorithm with no extra work. It checks empty, single-element, sorted, reverse-sorted, duplicate and random inputs. -->
