# projectsunflower

The website for Project Sunflower MMO, where players download the launcher for Windows or Linux.

It is plain HTML, CSS and JavaScript with no build step. The download buttons, version and news are read live from the
game server's `/release`, `/download` and `/news`, set in `assets/server.js`.

## Preview

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Then open http://127.0.0.1:8080. On this address the page asks the local game server on port 5174, so start it first
with `npm run dev` in the game's server project.

## Publish

Cloudflare Pages builds from this repo's `main` branch. Leave the build command empty and set the output folder to `/`.
