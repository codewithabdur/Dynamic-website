import React, { useEffect, useState } from 'react'
import client from '../lib/client'
import '../pages/contact.css'
import '../pages/About.css'
import { FaInstagram, FaYoutube} from 'react-icons/fa'

export default function Profile() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
   client.fetch(
     `*[_type == "profile"]{
       title,
       slug,
       body,
       profile{
         asset ->{
           _id,
           url
         },
         alt,
       },
     }`
   ).then((data) => {
     setPosts(data);
   }).catch(console.error);
  },[])

  return (
    <>
       {!posts ? <h2>Loading...</h2> : <>{posts[0] && <div className='max-w-2xl mx-auto my-20 grid grid-cols-1 md:gap-8 bg-white md:grid-cols-2 rounded-lg shadow-lg  md:place-items-center mar overflow-hidden'>
      <article className='md:pr-8'>
        <img  src={posts[0].profile.asset.url} alt={posts[0].profile.alt} className='md:h-64 md:object-cover xtra-for-img'/>
      </article>
      <article className='p-8 md:p-0 md:pr-8'>
        <h3 className='text-2xl text-blue-900 mb-4 mar'>{posts[0].title}</h3>
        <p className='mar text-blue-800 capitalize'>{posts[0].body[0].children[0].text.substring(0,100)}</p>

        <ul className='flex items-center  justify-start gap-4 mt-8 mar ali'>
          <li><a href="https://www.instagram.com/codewithabdur" target="_blank"  rel="noreferrer noopener"><FaInstagram className='text-2xl text-cyan-800 xtra-css-t'/></a></li>
          <li><a href="https://www.youtube.com/@codewithabdur" target="_blank"  rel="noreferrer noopener"><FaYoutube className='text-2xl text-cyan-800 xtra-css-t'/></a></li>
        </ul>
      </article>
    </div>
       }</>}
    </>
  )
}

