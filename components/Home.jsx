import Link from "next/link";

const getTopics = async () => {
    try {
        const res = await fetch(process.env.APP_URL+'topics',{
            cash:"no-store",
        });
        if(!res.ok){
            throw new Error("Failed to fetch topics")
        }
        return res.json()
    } catch (error) {
        console.log("Error loading topics:",error)
    }
}
export default async function Home(){
    const {topics} = await getTopics();
    return(
        <>
            {topics.map((topic) => (
            <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start" key={topic._id}>
                <div>
                    <h2 className="font-bold text-2xl">{topic.title}</h2>
                    <div>{topic.description}</div>
                </div>
                <div className="flex gap-2">
                    <Link href={"editTopic/"}>edit</Link>
                </div>
            </div>
            ))}
        </>
    )
}