# Statisk.js

An opinionated static site generator using [Nunjucks](https://mozilla.github.io/nunjucks/)

Tired of setting up Webpack, Babel, Gulp, Grunt, Bower, Browserify and the likes when all you really want is a simple way to build HTML files with a templating system? 
Then Statisk.js is for you. 

## Usage

server.js
```js
const statisk = require("@datahjelpen/statisk");
statisk.startDevEnv();
```
node server.js

## API

- `startDevEnv()` starts a dev server.
- `build()` renders all nunjuck files and copies all other files.

## Setup

Statisk.js expects a certian folder stucture. Consider the following example:

```
📦 src
└─ 📂 views
│  │  📜 page-1.njk
│  │  📜 page-2.njk
│  │
│  └─ 📂 templates
│     │  📜 template-1.njk
│     │  📜 template-2.njk
│
└─ 📂 css
│  │  📜 style.css
│
└─ 📂 js
│  │  📜 script.js
│
└─ 📂 images
│  │  📜 image-1.png
│  │  📜 image-2.jpg
│
```

It will generate the following output in /dist:

```
📦 dist
│  📜 page-1.njk
│  📜 page-2.njk
│
└─ 📂 css
│  │  📜 style.css
│
└─ 📂 js
│  │  📜 script.js
│
└─ 📂 images
│  │  📜 image-1.png
│  │  📜 image-2.jpg
│
```

Everything that is not a `.njk` file is just copied over as long as they it's inside `/src`; The files don't need to be in a specifically folder named like `css` or `images`.
For example `/src/folder-1/folder-2/style.css` will generate `/dist/folder-1/folder-2/style.css`.

## Future development

Our goal with Statisk.js is to keep it stupid simple and not let it grow too big.
We don't want to support options or alternatives for everything there is.
We want it to do one thing, and to do it well.