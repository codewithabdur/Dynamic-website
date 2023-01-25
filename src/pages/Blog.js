import React, { useState, useEffect } from 'react'
import client from '../lib/client'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
   client.fetch(
     `*[_type == "post"]{
       title,
       slug,
       body,
       publishedAt,
       mainImage{
         asset ->{
           _id,
           url
         },
         alt,
       },
       "name": author -> name,
     } | order(publishedAt desc)`
   ).then((data) => {
     setPosts(data);
   }).catch(console.error);
  },[])
  return(
    <>
    <div className='max-w-7xl px-5 mx-auto mt-20 mb-10'>
      <h1 className='text-4xl lg:text-6xl mb-4 text-white capitalize '>All Blog Posts</h1>
    </div>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-5 py-4 mb-10">
        {posts.map((post) =>(
          <Link to={`/blog/${post.slug.current}`}key={post.slug.current}>
        <article  className="border border-slate-400 rounded-lg overflow-hidden xtra-css transition-all duration-200 text-white">
          {post.mainImage && <img
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt} loading="lazy"
            className='md:h-64 w-full object-cover'
          />}
          <div className="p-4 ">
          <p className="text-sms">By {post.name} &middot; {format(new Date(post.publishedAt), "dd MMM yyy")}</p>
          <h2 className="text-xl my-2">{post.title}</h2>
           <p className="text-sm leading-relaxed">
            {post && <>{`${post.body[0].children[0].text.substring(0,200)}...`}</>}
              
          </p> 
          </div>
        </article></Link>
        ))}
        
      </section>

      <div className="max-w-7xl mx-auto px-5 mb-20 flex items-end justify-end">
        <Link to="/" className=" bg-white py-2 px-8 rounded shadow text-slate-800 tracking-wide hover:opacity-75 transition-all duration-200 ">
              Back To Homepage
            </Link></div>
    </>
  )
}