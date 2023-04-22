'use client'
import { useEffect, useState } from "react"
import { supabase } from './lib/supabaseClient'
import ClipLoader from "react-spinners/ClipLoader";
import { HiPlus } from 'react-icons/hi';
import Link from "next/link";

export default function Home() {
  
  const skeleton = [1,2,3,4,5,6,7]
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [papers, setPapers] = useState([])
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState('')



  const getPapers = async () => {
    const { data, error } = await supabase
      .from('papers')
      .select('*')
      setPapers(data)
  }

  const resetInput = () => {
    setError('')
    setFile('')
    setName('')
    setUrl('')
  }


  const handleSubmit = async () => {
    let blob = null;
    setLoading(true)
    if(!url) {
      blob = file;
    } else {
      const res = await fetch(url)
      blob = await res.blob()
    }
    if (blob.type == 'application/pdf') {
      await supabase
        .storage
        .from('papers')
        .upload(`${name}.pdf`, blob)
      
      const {data, error} = await supabase
        .storage
        .from('papers')
        .getPublicUrl(`Who knows.pdf`)

      await supabase
        .from('papers')
        .insert({ name: name, url: data.publicUrl })
      setIsOpen(false)
      resetInput();

    } else {
      setError('Invalid file type')
    }
    setLoading(false)


  }




  useEffect(() => {
    getPapers();

  }, [])

  useEffect(() => {
    const paperListener = supabase
      .channel("public:papers")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "papers" },
        (payload) => {
          setPapers(papers => [...papers, payload.new])
        }
      )
      .subscribe();

    return () => paperListener.unsubscribe();
  }, []);

  return (
    <>
      {isOpen &&
        <div className="z-10 bg-black h-screen bg-opacity-20 absolute w-screen grid place-content-center" onClick={() => { setIsOpen(false); resetInput();}}>
          <div className="bg-white w-[clamp(1px,calc(100vw-2rem),600px)] min-w-full h-full grid place-content-center rounded-md" onClick={(e) => e.stopPropagation()}>
            <p className="hello m-auto pt-4 text-gray-400">New document</p>
            <div className="flex gap-2 place-items-center p-4">
              <label className="w-20">Name: </label>
              <input value={name} onChange={e => setName(e.target.value)} className="bg-gray-100 outline-none p-4 w-full rounded-md" type="text" />
            </div>
            <div className="flex gap-2 place-items-center p-4">
              <label className="w-20">URL: </label>
              <input className="bg-gray-100 outline-none p-4 w-full rounded-md" type="text" value={url} onChange={e => setUrl(e.target.value)} />
            </div>
            <div className="flex gap-2 place-items-center p-4">
              <label className="w-20">Local file: </label>
              <input className="outline-none bg-gray-100 p-4 w-full rounded-md" type="file" onChange={e => setFile(e.target.files[0])} />
            </div>
            {error && <p className="m-auto mb-4 text-red-500">{error}</p>}
            {loading && <ClipLoader className="m-auto mb-4"
              size={20}
            />}
            <button className={`w-20 m-auto p-2 rounded-md mb-4 ${((url || file) && name) ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`} onClick={handleSubmit} disabled={((!file || !url) && !name)}>Submit</button>
          </div>
        </div>
      }
      <p className="text-lg p-4 pb-0 mb-0 text-gray-400">My documents</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 p-4 gap-4'>
      
        <div className='bg-gray-200 border-2 border-gray-300 border-dashed aspect-paper shadow-sm grid place-content-center cursor-pointer hover:shadow-md hover:scale-105 hover:text-blue-400 hover:bg-gray-100 duration-300 grid place-items-center gap-4 text-gray-500' onClick={() => setIsOpen(true)}><HiPlus  size={30}/></div>
        {papers.map((item, index) => (
          <Link key={index} href={{
            pathname: "/pdf-viewer",
            query: { name: item.name }
          }}>
          <div className='bg-white aspect-paper shadow-sm hover:shadow-md grid place-content-center cursor-pointer hover:scale-105 duration-300 grid place-items-center text-gray-500 hover:text-black'><p className='text-sm line-clamp pl-4 pr-4'>{item.name}</p></div>
          </Link>
        ))}
        {/* {papers.length == 0 && skeleton.map((item, index) => (
        <div key={index} className='bg-gray-200 aspect-paper shadow-sm'></div>
      ))} */}
      </div>
    </>
  )
}
