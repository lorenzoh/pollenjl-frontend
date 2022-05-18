# Pollen.jl frontend

This is the SvelteKit frontend for building rich documentation websites using Pollen.jl.

## Installing

Clone the repository and install the npm dependencies:

```julia
git clone https://github.com/lorenzoh/pollenjl-frontend
cd pollenjl-frontend
npm install
```

## Developing

To develop this frontend, first start the Pollen.jl dev server for your project, without serving a frontend:

```julia
using Pollen
Pollen.servedocs(@__MODULE__, MyPackage; frontend=false)
```

This will be running on localhost:8000.

Then run the Svelte dev server in this repo:

```sh
npm run dev
```

Navigate to localhost:3000 to see your page.

## Building

This frontend can be prerendered to static pages for deployment on GitHub Pages.

First we build the Pollen.jl project as JSON files to the frontend's static assets directory:

```julia
Pollen.rewritesources!(project)
Pollen.build(FileBuilder(JSONFormat(), "path/to/pollenjl-frontend/static"), project)
```

Due to a limitation in SvelteKit that prevents endpoints from accessing static assets during prerendering, we'll need to run a light HTTP server to serve those assets while we're building.



And then we can run SvelteKit's build step to prerender:


```sh
npm run dev
```