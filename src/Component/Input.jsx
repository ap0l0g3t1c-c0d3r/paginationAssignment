function InputSearch({onchange, onclick}){
    return(
        <div className='border-black w-150 h-10 mx-auto flex flex-row gap-1'>
            <input type="text" onChange={(e)=>onchange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required />
            <button type="submit" onClick={()=>onclick()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
        </div>
    )
}


export default InputSearch