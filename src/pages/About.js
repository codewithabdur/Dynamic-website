import './About.css'
import React, { useEffect, useState } from 'react'
import client from '../lib/client'

export default function About() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
   client.fetch(
    `*[_type == "about"]{
      title,
      slug,
      body,
      aboutImg{
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
       {!posts ? <h2>Loading...</h2> : <>{posts[0] && <section className="bg-black w-full h-screen " id="about">
        <div className="xl-w-3/5 md:w-4/5 w-11/12 h-full m-auto flex flex-col sm:flex-row items-center sm:justify-between justify-center ">
          <div className="pic  sm:w-5/12 h-[400px] border-8 border-white im rounded">
            <img className="img w-full h-full object-cover cursor-pointer rounded"
              src={posts[0].aboutImg.asset.url}
              alt=""
            />
          </div>
          <div className="sm:w-1/2 space-y-10 text-white">
            <h4 className="text-xl font-bold text-cyan-600">{posts[0].title}</h4>
            <p className="text-sm capitalize">{posts[0].body[0].children[0].text.substring(0,400)}
            </p>
            <div className="text-sm">
              <a href="https://codewithabdur.github.io/CodeWithAbdur-About" target="_blank" rel="noreferrer noopener" className="underline text-white xtra-css-t">Read More</a>
            </div>
          </div>
        </div>
      </section>
      }</>}
    </>
  );
};

