# ai-extension

This repository contains a project made up of two main parts:

1. **API**  
   Implemented in [`api/index.js`](api/index.js), this API spins up an HTTP server that exposes the `/api/generate` endpoint for processing POST requests.  
   You can start the API with the following scripts:
   - With Node.js: `npm start` (as defined in [`api/package.json`](api/package.json))

2. **Extension**  
   The browser extension consists of:
   - [`extension/content.js`](extension/content.js): injects the script into the page.
   - [`extension/script.js`](extension/script.js): communicates with the API to handle queries.

## Project Structure

```bash
ai-extension/
├── api/
│   ├── index.js
│   └── package.json
├── extension/
│   ├── content.js
│   ├── manifest.json
│   └── script.js
├── LICENSE
└── README.md
```

## How to Run the API

1. Open a terminal in the `api` folder.

2. Start the API:

```bash
npm start
```

The API will be available at <http://127.0.0.1:11435/> to handle requests sent from the extension.

## How to Use the Extension

The extension injects the script defined in `script.js` into pages, enabling it to:

- Capture user requests.
- Send requests to the API to fetch answers.
- Update the interaction context based on the responses received.

To install the extension, open your browser’s developer tools and load the `extension` folder as an unpacked extension.

## License

This project is licensed under the MIT License.
