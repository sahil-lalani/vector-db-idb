# Using IndexedDB as a Vector Database

This React application allows users to vectorize text documents and perform similarity searches using OpenAI's text embedding model.

## Features

- Text vectorization using OpenAI's text embedding model
- Similarity search on vectorized documents
- Simple user interface for input and search

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Replace `"INSERT_API_KEY"` in `App.jsx` with your actual OpenAI API key
4. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Enter text in the textarea and click "Vectorize" to process the document
2. Once vectorized, use the search bar to find similar text chunks
3. Results will be displayed below the search bar

## Dependencies

- React
- vector-storage (for vector operations and similarity search)
- OpenAI API (for text embeddings)

## Note

Ensure you have a valid OpenAI API key and sufficient credits for text embedding operations.
