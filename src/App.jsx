import { useEffect, useState } from 'react'
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
  const [filteredComments, setFilteredComments] = useState([]) 

  console.log("comments from local storage",JSON.parse(localStorage.getItem("comments")))

  useEffect(()=> {
    const commentsCheck = JSON.parse(localStorage.getItem("comments")) || []
    if(commentsCheck.length < 1){
      fetch("https://jsonplaceholder.typicode.com/comments")
      .then((val)=> val.json())
      .then((res)=> setComments(res))
      .catch((e)=> console.log(e))
      localStorage.setItem("comments", JSON.stringify(comments))
    }else{
      setComments(commentsCheck)
    }
  },[])
  
  useEffect(()=> {
    const postsCheck = JSON.parse(localStorage.getItem("posts")) || []
     if(postsCheck.length < 1){
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json));
      localStorage.setItem("posts", JSON.stringify(posts))
    }else{
      setPosts(postsCheck)
    }
  }, [])

  useEffect(() => {
  if (posts.length > 0) {
    localStorage.setItem("posts", JSON.stringify(posts));
  }
  }, [posts]);

  useEffect(()=>{
    if(comments.length > 0){
      localStorage.setItem("comments", JSON.stringify(comments))
    }
  },[comments])
  
  function handleChange(e){
    setInput(e.target.value)
  }

  function findOnClick(){
    if(input === "") filteredComments = comments
    let filteredComments = comments.filter((comment) => {
       if(comment.name.toLowerCase().includes(input.toLowerCase())){
        return comment
       }
    })
    setFilteredComments(filteredComments)
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

  function inputforName(e, id){
    const updatedName = comments.map((comment)=> {
      return comment.id === id ? {...comment, name: e.target.value} : comment 
    })
    console.log("updateName")
    setComments(updatedName)
  }

  function inputforBody(e, id){
    console.log("body change", e.target.value)
    const updatedBody = comments.map((comment)=> {
      return comment.id === id ? {...comment,body: e.target.value } : comment
    })
    setComments(updatedBody)
  }

  const dataToPaginate = filteredComments.length > 0 ? filteredComments : comments;
  const commentsPag = dataToPaginate.slice((currentPage - 1)*numberOfItemsinPage,(currentPage*numberOfItemsinPage))
  const commentsArray = commentsPag.map((comment, index)=> {   
  const postTitle = posts.find((post)=> post.id === comment.id) 
  return <TableCell key={comment.id} email={comment.email} name={comment.name} body={comment.body} 
                title={postTitle?.title || "Title not found"} id={comment.id}
                nameHandler={inputforName} bodyHandler={inputforBody}/>
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
          <Pagination prevPageHandler={handlePreviousPage} nextPageHandler={handleNextPage} commentLength={filteredComments.length > 0 ? filteredComments.length: comments.length} onclick={paginationPages} currentPage={currentPage} numberOfItemsPage={numberOfItemsinPage}/>
        </div>
      </div>
    </>
  )
}

export default App
