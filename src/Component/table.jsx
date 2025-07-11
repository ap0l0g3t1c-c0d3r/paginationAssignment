import { useEffect, useState } from "react";

export function Table({email, name, body, title}){
    
    return(
            <thead>
                <tr className="border-separate border-spacing-2 p-4 hover:bg-gray-100 transition-colors">
                    <th className="border-2 border-black">Email</th>
                    <th className="border-2 border-black">Name</th>
                    <th className="border-2 border-black">Body</th>
                    <th className="border-2 border-black">Post</th>
                </tr>
            </thead>
    )

}


export function TableCell({email, name, body, title, nameHandler, bodyHandler,id}){
    
    return(
        <tr className="border-2 border-slate-400 px-4 justify-center hover:bg-gray-100 transition-colors">
            <td className="border-2 border-slate-400 p-4">{email}</td>
            <td className="border-2 border-slate-400 p-4"><input type="text" value={name[0].toUpperCase()+ name.slice(1)} onChange={(e)=>nameHandler(e,id)} /></td>
            <td className="border-2 border-slate-400 p-4"><input type="text" value={body[0].toUpperCase()+ body.slice(1)} onChange={(e)=>bodyHandler(e,id)} /></td>
            <td className="border-2 border-slate-400 p-4">{title[0].toUpperCase()+ title.slice(1)}</td>
        </tr>
    )
}
