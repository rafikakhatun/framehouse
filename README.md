# Framehouse

A responsive streaming portfolio preview built with React, Vite, Tailwind CSS, React Router, and Lucide React.

## Run locally

```sh
npm ci
npm run dev
npm run build
```

Open Framehouse on `localhost`. The landing page is public. Create an account or sign in with email and password or Google to open `/browse`.

## Add artwork

Import local artwork from `src/assets` in `src/utils/content.js` and set the corresponding entry's `src`. The shared artwork component switches to the image and applies the entry's `alt` text. The featured hero and each poster can use different files.

The **After the Signal** preview uses [control-room stock footage by Media Hopper Studio](https://www.pexels.com/video/close-up-button-operation-in-dark-control-room-38958215/) under the [Pexels license](https://www.pexels.com/license/).

The **Last Coast** preview uses [rocky coastline footage by Taryn Elliott](https://www.pexels.com/video/waves-crashing-on-a-rocky-shore-7046541/) under the [Pexels license](https://www.pexels.com/license/).

The **Velvet Hours** preview uses [rainy-window footage by Gustavo Fring](https://www.pexels.com/video/woman-looking-through-the-window-6870457/) under the [Pexels license](https://www.pexels.com/license/).

The **Wild Meridian** preview uses [Alpine ibex footage by Nicky Pe](https://www.pexels.com/video/alpine-ibex-lying-on-a-mossy-rock-15015219/) under the [Pexels license](https://www.pexels.com/license/).

## Environment

Copy `.env.example` to `.env` and fill the Firebase web configuration. Enable Email/Password and Google in Firebase Authentication and authorize `localhost` for local testing. TMDB configuration is optional for the current catalog.
