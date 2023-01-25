import React, { useEffect, useState } from 'react'
import client from '../lib/client'

import './Home.css'
import {BsFacebook, BsInstagram, BsYoutube, BsTwitter} from 'react-icons/bs'

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
   client.fetch(
     `*[_type == "author"]{
       title,
       image{
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
  {!posts ? <h2>Loading...</h2> : <>{posts[0] &&<div className="Container" id='home'>
        <div className="box">
        <div className="me">
          <img src={posts[0].image.asset.url} alt="profile" className='swingimage'/>
        </div>
        <div className="info">
          <h1 className="h1 text-white font-serif">
            <span className='text'>Hi!</span><br />
            Myself CodeWithAbdur
          </h1>
          <div className="social-icons flex ">
            <a
              href="https://www.facebook.com/people/Saqib-Khan/100064823755797/"
              target="_blank"  rel="noreferrer noopener"
              ><BsFacebook className="fa-brands fa-facebook"  /></a>
            <a href="https://twitter.com/CodeWithAbdur" target="_blank"  rel="noreferrer noopener"
              ><BsTwitter className="fa-brands fa-twitter" /></a>
            <a href="https://www.instagram.com/codewithabdur" target="_blank"  rel="noreferrer noopener"
              ><BsInstagram className="fa-brands fa-square-instagram child" /></a>
            <a href="https://www.youtube.com/@codewithabdur" target="_blank"  rel="noreferrer noopener"
              ><BsYoutube className="fa-brands fa-youtube" /></a>
          </div>
        </div>
       
        </div>
        </div>
        }</>}
    
    </>
      
  )
}

