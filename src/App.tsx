import React, {  FC, useEffect, useState } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import './style/app.css'
import {dialog} from 'electron'


const App:FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [fileData, setFileData] = useState<string | null>(null)
  useEffect(() => {
    const dropEvent = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      const reader = new FileReader();
      reader.onload= () => {
        setFileData(reader.result.toString())
      }
      for (const f of e.dataTransfer.files) {
        reader.readAsText(f)
      }
    }
    const dragEventOver = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
    }
    document.addEventListener('drop', dropEvent);
    document.addEventListener('dragover', dragEventOver);

    return () => {
      document.removeEventListener('drop', dropEvent);
      document.removeEventListener('dragover', dragEventOver);
    }
  }, [setInputValue, inputValue]);
 
  useEffect(() => {
    const windowKeyhandler = (e: KeyboardEvent) => {
      if(e.ctrlKey && e.keyCode === 83){
        dialog.showSaveDialog({
          title: 'Markdown Saver',
          buttonLabel: 'Save',
        
          filters: [
            {
                name: 'Text Files',
                extensions: ['txt', 'docx']
            }, 
          ],
        })
        .then(file => {
              
        })      
      }
    }
    document.addEventListener('keydown', windowKeyhandler)
  })

  return (
    <div className='app'>
      <section className='input-section'>
        {<Editor
          initialDoc={''}
          newStartValue={fileData}
          onChange={setInputValue}
        />}
      </section>
      <section style={{color: '#fff'}} className="result-section">
        <Preview
          text={inputValue}
          />       
      </section>
    </div>
  )
}

export default App
