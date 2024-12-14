'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddList(){
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const router = useRouter();

    const fetchTopic = async(e) => {
        e.preventDefault()
        console.log(`${process.env.APP_URL}topics`);

        try {
            const res = await fetch('api/topics',{
                cash:"no-store",
                method:"POST",
                headers:{
                    "Content-type": "application/json"
                },
                body:JSON.stringify({title,description})
            });
            if(res.ok){
                router.push("/")
            }
            else{
                throw new Error("Failed to create a topic")
            }
        } catch (error) {
            
        }
    }
    return(
        <>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add topics</h1>
                <form action="#" method="POST" onSubmit={fetchTopic}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="name" name="name" onChange={(e) => setTitle(e.target.value)} value={title} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea  id="description"  onChange={(e) => setDescription(e.target.value)} value={description} name="description" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600">
                        Save
                    </button>
                </form>
            </div>
        </>
    )
}