import { useState } from 'react'
import './App.css'
import { VectorStorage } from 'vector-storage'

function App() {

  const [documents, setDocuments] = useState('')
  const [searchText, setSearchText] = useState('')
  const [isVectorized, setIsVectorized] = useState(false)
  const [results, setResults] = useState([])

  const vectorStorage = new VectorStorage({ openAIApiKey: "INSERT_API_KEY", openaiModel: 'text-embedding-3-small' })

  const handleVectorize = async () => {
    console.log('need to handle vectorize: ', documents)
    const chunks = chunkText(documents)
    const timestamps = chunks.map(() => new Date().toISOString())
    const vectors = await vectorStorage.addTexts(chunks, timestamps )
    console.log('vectors: ', vectors)
    setIsVectorized(true)
  }

  const chunkText = (text, chunkSize = 1000, overlap = 200) => {
    const chunks = [];
    let start = 0;
    while (start < text.length) {
      const end = start + chunkSize;
      const chunk = text.slice(start, end);
      chunks.push(chunk);
      start = end - overlap;
    }
    return chunks;
  }

  const handleSearch = async () => {
    try {
      console.log('Attempting to search with:', searchText);
      const vectors = await vectorStorage.similaritySearch({ query: searchText, k: 6 });
      console.log("Search results:", vectors);
      setResults(vectors.similarItems.map(item => item.text));
    } catch (error) {
      console.error("Error during search:", error);
      setResults([`Error: ${error.message}`]);
    }
  }

  return (
    <>
      {isVectorized ? (
        <div className="container">
          <h1>Search for vectors</h1>
          <input type="text" placeholder="Search for vectors" onChange={(e) => setSearchText(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
          <div>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>Enter some text here to vectorize in IndexedDB:</h1>
          <textarea type="text" placeholder="Enter your text here" onChange={(e) => setDocuments(e.target.value)}></textarea>
          <button onClick={handleVectorize}>Vectorize</button>
        </div>
      )}
    </>
  )
}

export default App
