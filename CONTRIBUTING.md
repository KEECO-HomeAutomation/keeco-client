# Contributing



## Code Style

We use the [Prettier](https://prettier.io) code style as defined in _.prettierrc.json_.
```
{
	"semi": true,
	"useTabs": true,
	"singleQuote": true
}
```
Your code __MUST__ be formatted respecting these styles. You can use IDE extensions (for example _jsPrettier_ for sublime), or you can use the included script (`npm run format`), which formats every JS file.



## Naming conventions

We use __camelCasing__ for function and property names and __CamelCasing__ with capitals for React component names.

Components should be stored in files with _.jsx_ extension. They should have the name of the exported component (for example the file exporting _LoginForm_ should be named _LoginForm.jsx_) or _index.jsx_ and placed in a similarly named directory.



## Components

Each component should have it's own file. The components should be functional, use [recompose](https://github.com/acdlite/recompose/) enhancers to give them extra functionality. Try to avoid using the render props pattern, it is ugly. Whenever possible use HOCs (for example: graphql, withRouter, withStyles, etc), they produce a much more readable code.

Each component should export the base component, the enhancer function as named exports (having the _ComponentName_ for the base component (for example: _MainMenu_) and _enhancer_ for the enhancer HOC) and export the enhanced component as the default export.

You should set _propTypes_ for every component. Please set them using the standard method (ComponentName.propTypes = {...}), not using a recompose HOC, otherwise the linting will __not__ pass.



## Branches

The _master_ and _dev_ branches are protected.

The _master_ branch contains the well tested code that is ready to be released. Each release is tagged.

The _dev_ branch is used for development.

The _release/vA.B.C_ branches are used for pre-release fixes. Only these branches should be merged to _master_.

Each feature must have it's own branch prefixed with __feature/__ (for eample: feature/userMutations).

Every fix must have it's own branch prefixed with __fix/__ (for example: fix/unhandledExceptionOnLogin).

When the work is finished you have to file a Pull Request which will be reviewed by one of the code owners. During the review the reviewer __MUST__ check the results of the CI tests and the compliance of naming conventions. After merging the feature branch it will be removed from the origin repository.




## Testing

You should write tests for every unit. Every feature of the unit should be covered by tests. You can check your test coverage by running `npm run test:coverage`.

We are using [jest](https://jestjs.io/) for testing.

The tests files should be placed near the tested filed with the _.test.js_ extension (for example: _epicFeature.js_ should have a test file called _epicFeature.test.js_). For React components the tests should have _.test.jsx_ extension.

The first lines of the test should import _React_ and _shallow_ or _mount_ from Enzyme. This is followed by an empty line and after that the mocks are defined. After the mocks yet another empty line, the import of the component to be tested, empty line and finally the needed components.



## Development

During the development you must have a [keeco-hub](https://github.com/KEECO-HomeAutomation/keeco-hub) instance up and runing. See the _CONTRIBUTING.md_ for that repo to see some tips.



## Caveats

Due to limitations when modifying _.graphql_ files the application won't reload. You have to kill it with `Ctrl + C`, clear the _node_modules/.cache/babel-loader_ directory and start it back again. Or you make a small modification (for example adding a new line at the end of the file) inthe file importing it and everything will be reloaded automatically. Just make sure you revert your changes afterwards.
