## RSS Reader

This mono-repo has two directories, `server` and `client`.

### Running the server

In the `server` root directory, run `npm install`, and use:

`node src/app.js`

It runs the server on port `4000`.

### Running the client

In the `client` root directory, run `npm install`, and use:

`npm start`

It serves the client on port `3000`.

### Using the app

After running both the server and the client,

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running integration tests

After running both the server and the client,
at the client directory, use:

`npm test`

It will run the tests in the browser, so you can see the results.
 
### Things worth adding in the future

- Tests for the server and client
- Handle missing (server) request params
- Auto complete for Medium user names
