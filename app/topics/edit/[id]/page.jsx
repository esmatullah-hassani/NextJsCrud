"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const getTopicById = async (id) => {
    try {
        const res = await fetch(`/api/topics/${id}`, {
            method: "GET",
            cache: "no-store",
        });
        if (res.ok) {
            return res.json();
        } else {
            console.error("Error fetching topic");
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

export default function EditTopic({ params }) {
    const router =  useRouter()
    const { id } =  React.use(params);;
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const updateTopic = async (e) =>{
        e.preventDefault()
        const res = await fetch(`/api/topics/${id}`,{
            method:"PUT",
            headers:{
                "Content-type" : 'application/json'
            },
            body:JSON.stringify({"title":newTitle,"description":newDescription})
        })
        if(res.ok){
            router.push("/")
        }
    }
    useEffect(() => {
        async function fetchTopic() {
            const topic = await getTopicById(id);
            if (topic) {
                setNewTitle(topic.title);
                setNewDescription(topic.description);
            }
        }
        fetchTopic();
    }, [id]);

    return (
        <div>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Edit Topic</h1>
                <form action="#" method="POST" onSubmit={updateTopic}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}
