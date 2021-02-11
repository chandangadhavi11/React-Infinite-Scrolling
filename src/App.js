import {useState, useRef, useCallback} from "react"
import './App.css';
import useBookSearch from "./useBookSearch"

function App() {

  const [query, setQuery] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const {loading, error, books, hasMore} = useBookSearch(query, pageNumber)
  const observer = useRef()
  var lastElement = useCallback((node)=>{
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((ent) => {
      if (ent[0].isIntersecting && hasMore){
        // console.log("HEEEEY... HOW YOU DOIN!?");
        setPageNumber(previousPage => previousPage + 1)
      }
    })
    if (node) observer.current.observe(node)
    
    
  },[loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }


  return (

    <div className="App">
      <header className="App-header">
        <h1>Infinite Scrolling</h1>
        <input type="text" onChange={handleSearch} style={{width:"300px", height:"50px", borderRadius:"100px", paddingLeft:"20px", fontFamily:"Arial", fontWeight:"900", fontSize:"20px", outlineWidth:"0"}}/>
        <ol>
          {
            books.map((book, i) => {

              if(books.length === i + 1){
                return <li ref={lastElement} className="listOfBooks" key={i}>{book}</li>  
              }else{
                return <li className="listOfBooks" key={i}>{book}</li>  
              }              
            })
          }
        </ol>
        <div>{loading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}</div>
        <div>{error && "Error"}</div>
        
      </header>
    </div>
  );
}

export default App;
