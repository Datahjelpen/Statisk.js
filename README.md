# Statisk.js

An opinionated static site generator using (Nunjucks)[https://mozilla.github.io/nunjucks/]

Tired of setting up Webpack, Babel, Gulp, Grunt, Bower, Browserify and the likes when all you really want is a simple way to build HTML files with a templating system? 
Then Statisk.js is for you. 

## Setup

Statisk.js expects a certian folder stucture for Nunjucks, like so:

- /src
- - /views
- - - page-1.njk
- - - page-2.njk
- - - /templates
- - - - template-1.njk
- - - - template-2.njk

It will generate an output in /dist.

Other files (JS, CSS, Media files) are just copied over as long as they are inside /src.
So for example /src/folder-1/folder-2/style.css will generate /dist/folder-1/folder-2/style.css

## Future development

Our goal with Statisk.js is to keep it stupid simple and not let it grow too big.
We don't want to support options or alternatives for everything there is.
We want it to do one thing, and to do it well.