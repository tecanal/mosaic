# mosaic
Learn JavaScript with instaneous visual feedback while making computer-generated art and/or games.

Play with the deployed version on [TeCanal](https://tecanal.org/mosaic).

Created by [Rees Draminski](https://github.com/reesdraminski).

## Code
* [js/api.js](js/api.js): Mosaic, Tile, Player, and Color classes that constitute the Mosaic API for the user to create their art/games.
* [js/app.js](js/app.js): UI controls and functionality (CodeMirror setup, docs generation, code execution, etc).
* [js/sw.js](js/sw.js): The ServiceWorker that implements a cache-first approach to speed up load times.
* [js/jeroo.js](js/jeroo.js): An implementation of the [Jeroo learning tool](https://www.jeroo.org/) that works on top of the Mosaic API.

## Content
* [data/docs.json](data/docs.json): Documentation for the various APIs that can be used by the user.
* [data/lessons.json](data/lessons.json): Basic JavaScript instruction to get the user started with the basics of JavaScript and the Mosaic APIs.
* [data/tutorials.json](data/tutorials.json): Mosaic-specific tutorials for animation and game development.

## Dependencies
* [LZMA-JS](https://github.com/LZMA-JS/LZMA-JS): This is used to use LZMA compression on code content for the Share Code link feature.
* [Esprima](http://esprima.org/): This is used to parse the AST of user code to do code instrumentation in order to detect and protect against infinite loops.
* jQuery: This is only for jQuery-resizable, hopefully I can find a vanilla implementation or write my own in the future.
* [jQuery-resizable](https://github.com/RickStrahl/jquery-resizable): This is used to make the resizable split panel view in the application.