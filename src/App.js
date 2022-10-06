import {useEffect,useState} from 'react'
import axios from 'axios'
import {Badge} from 'react-bootstrap';


import './bootstrap.min.css';
import './style.css';

import {Alert} from 'react-bootstrap';

function App() {
    const [historywords,setHistorywords] = useState([])
    const [searchword,setSearchword] = useState("")
    const[foundresult,setFoundResult] = useState(true)
    const [meaning,setMeaning] = useState("")
    const [phonetic,setPhonetic] = useState("")


    

  const  fetchWord = (word) =>{
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      const data = response.data[0]

      console.log(data)
      // changing phonetic
      const {phonetic} = data
      setPhonetic(phonetic)


      const meanings = data.meanings
      const {definitions} =meanings[0]
      setMeaning(definitions[0].definition)

      console.log(foundresult)

      setFoundResult(true)
     
      if (!historywords.includes(searchword)) {
        setHistorywords(current => [...current, searchword]);
      }

      if (historywords.length > 10) {
        historywords.shift()
      }

      


     
    })
    .catch((error)=>{
      console.log(`error is ${error} `)
      setFoundResult(false)
    })
    
  }
  console.log("how is histor wotd",historywords);

  // console.log(searchwordresult);



  useEffect(() => {
    fetchWord(searchword)
  }, [searchword])
  

  return (
    <> 
<div className="wrapper">
      <header>My Dictionary &#128218;</header>
      <div className="search">
        <input 
        type="text" 
        placeholder="Search a word" 
        required 
        spellCheck="false"
        // value={searchword}
        onKeyUp={(e)=>setSearchword(e.target.value)}
        />
        <i className="fas fa-search"></i>
        <span className="material-icons">close</span>
      </div>
      <p className="info-text">
        {searchword.length > 0 ? (
          <>
   {
      foundresult ? (
        <Alert key='success' variant='success'>
          Result found
        </Alert>
   ):(
    <Alert key='danger' variant='danger'>
       No Result found
  </Alert>    
      )}
          </>
        ):(
          <Alert key='danger' variant='danger'>
          Type in for search &#9757;&#65039;
        </Alert>

        )}
     
      </p>
      <ul>
        <li className="word">
          <div className="details">
            <p>{searchword}</p>
            <span>{phonetic}</span>
          </div>
       
        </li>
        {
          foundresult ? (

            <div className="content">
            <li className="meaning">
              <div className="details">
                <p>Meaning</p>
                <span>{meaning}</span>
              </div>
            </li>
           
          </div>
          ): (
            <> 
            
            </>
          )
        }

      </ul>
    </div>

    <div className="footer">
  {historywords.length > 0 && historywords.map((word)=>(
   
    <Badge
    onClick={()=>setSearchword(word)}
    className="mx-2" bg="dark">{word}</Badge>
  ))}
</div>
    </>
  );
}

export default App;
