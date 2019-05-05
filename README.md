# keeco-client



[![ci](https://ci.systemtest.tk/badge/5)](https://ci.systemtest.tk/repo/5)
[![bucket](https://img.shields.io/badge/-Build%20Bucket-yellow.svg)](https://f001.backblazeb2.com/file/keeco-client/filelist.json)
[![trello](https://img.shields.io/badge/-Trello-brightgreen.svg)](https://trello.com/b/pJbFnbiH/keeco)

Web based client created using React to access and manage the nodes connected to the keeco-hub.



## NPM Scripts

- _npm start_: Start the webpack-dev-server on port _8080_ and host the application there
- _npm run build_: Compile the code using webpack (output directory: _build_)
- _npm test_: Run Jest in watch mode
- _npm run test:coverage_: Run all tests and generate coverage report
- _npm run lint_: Lint the source code with eslint
- _npm run format_: Format the code using Prettier
- _npm run graphql:generate_: Generate the fragment types (_src/data/fragmentTypes.json_) using a keeco-hub instance on _http://localhost:5000/graphql_



## Usage

__The client must be run on a webserver, because we are using routing.__

When opening the client it will open the dashboard. If the server connection params aren't available, it will redirect to the _/setServer_ path, where you can type in the server address manually (or when wrappers available, autocomplete will be available). If the login token isn't available, it will redirect to the _/login_ path, where you can log in.

On the dashboard you can find everything needed.
