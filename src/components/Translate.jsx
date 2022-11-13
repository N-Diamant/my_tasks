import React,{useState,useEffect} from 'react'
import '../App.css'
import{ 
Form, 
TextArea,
Button ,
Icon
 } from 'semantic-ui-react';
 import axios from 'axios';

//  const language_options = [
//   { key: 'en', text: 'English', value: 'english' },
//   { key: 'fr', text: 'French', value: 'french' },
//   { key: 'arab', text: 'Arabic', value: 'arabic' },
//   { key: 'kinya', text: 'Kinyarwanda ', value: 'kinyarwanda' },
// ]

const Translate = () => {
  const [inputText,setInputText]=useState('');
  const[resultText,setResultText]=useState('');
  const [ languageList,setLanguageList] = useState([]);
  const[selectedLanguageKey,setSelectedLanguageKey] = useState('');
  const [detectLanguageKey,setDetectLanguageKey] = useState('');

  const getLanguageSource = ()=>{
    axios.post(`https://libretranslate.de/detect`,{
       q:inputText
    })
    .then((response)=>{
      setDetectLanguageKey(response.data[0].language);
    })
  }
  // const translateText = () =>{

  // setResultText(inputText);
  
  // getLanguageSource();
  // let data ={
  //   q:inputText,
  //   source:detectLanguageKey,
  //   target:selectedLanguageKey
  // }
  // axios.post(`https://libretranslate.de/detect`,data)
  // .then((response)=>{
  //   setResultText(response.data.translatedText);  
  // })

  // }


  const translateText = () => {
    setResultText(inputText)

    getLanguageSource();

    let data = {
        q : inputText,
        source: detectLanguageKey,
        target: selectedLanguageKey
    }
    axios.post(`https://libretranslate.de/translate`, data)
    .then((response) => {
        setResultText(response.data.translatedText)
    })
}
  const languageKey = (selectLanguage) =>{
    setSelectedLanguageKey(selectLanguage.target.value);
  }

  useEffect(() =>{

    axios.get('https://libretranslate.de/languages')
    .then((response)=>{
      console.log(response);
      setLanguageList(response.data)
    })

    getLanguageSource() 
  },[inputText]);


  return (
    <div>
      <div className="app-header">
      <h2 className="header">React Language translator</h2> 
      </div>
      <div className="app-body"> 
     <div>
      <Form>
        <p>Enter the word or sentence to translate:</p>
      <Form.Field
          control={TextArea}
          placeholder='Tell us type text to translate...'
          onChange={(e) => setInputText(e.target.value)} />
          
       
          <select className="language-select" onChange={languageKey}>
            <option>please select the language to translate to :</option>
       {languageList.map((language) => {
          return(
            <option value={language.code}>{language.name}</option>
          )
       })
      
}  
          </select>
          <p>the result after translation is:</p>
           <Form.Field
          control={TextArea}
          placeholder='your result translation...'
          value={resultText}
        />
         <Button color="orange" 
         size="large" 
         onClick = {translateText} >
          <Icon name='translate'/>Translate</Button>

      </Form>
    
     </div>
      </div>
       
    </div>
  )
}

export default Translate;  