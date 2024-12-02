import React, { useState } from 'react'
import axios from 'axios'
import './Style/Query.css'
export default function Query() {
    const [example,setExample] = useState([])
    const [question,setQuestion] = useState();
    const [answer,setAnswer] = useState();

    const muplitpleEvent = async function(que){
        setAnswer('')
        setExample([])
        setQuestion(que);
        try{
        const response = await axios.post(`http://localhost:5000/example/${que}`,{})
        if(response.data.examples){
            setExample(response.data.examples);
        }}
        catch(error){
            console.log(error)
        }
    }

    const GetSingleAnswer = async function(event){
        event.preventDefault();
        const response = await axios.post('http://localhost:5000/query',{
            Question:question
        })
        if(response.data.answer){
            setAnswer(response.data.answer);
        }
    }
  return (
    <div className = 'Query-outerBox'>
        <form onSubmit={GetSingleAnswer}>
            <h2>Query </h2>
            <br/>
            <label>Question : </label>
            <input type='text' onChange={(event)=>{muplitpleEvent(event.target.value)}}></input>
            <br/><br/>
            <div >
                {example.map((ex)=>(
                    <div onClick={(event)=>{muplitpleEvent(ex.Question)}}>{ex.Question}</div>
                ))}
            </div>
            <br/>
            <div style={{color:'green'}}>
                {answer}
            </div>
            <br/>
            <div className='query-button'>
            <button type='submit'>Get</button>
            </div>
        </form>
    </div>
  )
}
