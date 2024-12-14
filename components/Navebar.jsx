import Link from "next/link";

export default function Navebar(){
    return(
        <>
            <div className="flex justify-between items-center bg-slate-800 px-8 py-3">
                <Link href={"/"} className="text-white">Home</Link>
                <Link href={"/topics/create"} className="text-white">Add List</Link>
            </div>
        </>
    )
}