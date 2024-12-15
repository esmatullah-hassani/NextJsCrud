'use client'
import { useEffect, useState } from "react"

const getTopicById = async (id) => {
    try {
        const res = await fetch(process.env.APP_URL+ `/api/topics/${id}`,{
            method:"GET",
            cache:"no-store"
        })
        if(res.ok){
           return res.json()
        }
        else{
            console.log("error")
        }
    } catch (error) {
        console.log(error)
    }
}
export default  function editTopic({ params }){
    const {id} =  params;
    const [newTitle,setNewTitle] = useState("")
    const [newDescription,setNewDescription] = useState("")
    console.log(id)
    useEffect(() => {
        
        const fetchTopic = async () => {
            
            const topic = await getTopicById(id);
            const {title,description} = topic
            
            setNewTitle(title);
            setNewDescription(description);
        };
      fetchTopic();
   },[id])
    
    return(
        <div>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Edit topic</h1>
                <form action="#" method="POST" >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="name" name="name"  value={newTitle} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea  id="description"   value={newDescription} name="description" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600">
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}