import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Table, TableCell} from './Component/table'
import InputSearch from "./Component/Input"
import { Pagination } from './Component/PaginationScroll'


function App() {

  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])
  const [numberOfItemsinPage, setNumberOfItemsinPage] = useState(10)
  const [input, setInput] = useState("")
  const [currentPage, setCurrentPage] = useState(1) 

  useEffect(()=> {
    const commentsCheck = JSON.parse(localStorage.getItem("posts"))
    console.log("commentsCheck",commentsCheck)
    if(commentsCheck.length < 1){
      fetch("https://jsonplaceholder.typicode.com/comments")
      .then((val)=> val.json())
      .then((res)=> setComments(res))
      .catch((e)=> console.log(e))
    }
    localStorage.setItem("comments", JSON.stringify(comments))
  },[])
  
  useEffect(()=> {
    const postsCheck = JSON.parse(localStorage.getItem("comments"))
    console.log("postChecks",postsCheck)
     if(postsCheck.length < 1){
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json));
    }
    localStorage.setItem("posts", JSON.stringify(posts))
  }, [])

  
  function handleChange(e){
    setInput(e.target.value)
  }

  function findOnClick(){
    if(input === ""){
      return
    }
    // console.log(input)
    let filteredComments = comments.filter((comment) => {
       if(comment.name.toLowerCase().includes(input.toLowerCase())){
        return comment
       }
    })
    setComments(filteredComments)
  }
  
  function paginationPages(e, pageNumber){
    // console.log("this is pagination page", pageNumber)
    setCurrentPage(pageNumber)
  }

  function handleNextPage(){
        setCurrentPage(c => c + 1)
    }

  function handlePreviousPage(){
        setCurrentPage(c => c - 1)
  }

  // console.log("this is posts", posts)
  const commentsPag = comments.slice((currentPage - 1)*numberOfItemsinPage,(currentPage*numberOfItemsinPage))
  // console.log("this is comments page",commentsPag)
  const commentsArray = commentsPag.map((comment, index)=> {   
  const postTitle = posts.find((post)=> post.id === comment.id) 
  return <TableCell key={comment.id} email={comment.email} name={comment.name} body={comment.body} title={postTitle?.title || "Title not found"}/>
  })        

  return (
    <>
      <div className='w-screen flex flex-row justify-center items-center font-sans px-4 py-6'>
        <div className='flex flex-col gap-4 items-center'>
          <InputSearch onchange={handleChange} onclick={findOnClick}/>
          <table className='table-fixed w-3/5 h-1/5 border-separate border-spacing-2 border-2 border-black-400'>
            <Table/>
            <tbody>{commentsArray}</tbody>
          </table>
          <Pagination prevPageHandler={handlePreviousPage} nextPageHandler={handleNextPage} commentLength={parseInt(comments.length)} onclick={paginationPages} currentPage={currentPage} numberOfItemsPage={numberOfItemsinPage}/>
        </div>
      </div>
    </>
  )
}

export default App
