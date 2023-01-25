import NavBar from '../components/NavBar'
import Home from './Home'
import './Home.css'
import Profile from '../components/Profile'
import Footer from '../components/Footer'
import Contact from '../pages/contact'
import About from './About'
import React, { useState, useEffect } from 'react'
import client from '../lib/client'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

export default function Homepage() {
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
    setPosts(data.slice(0,3));
  }).catch(console.error);
 },[])

 useEffect(() => {
   document.title = "Abdur Rahman Khan Blog Website"
 },[])
  
  return(
    <>
     <NavBar />
      <Home />
      <About />
        {!posts ? <h2>Loading...</h2> : <>{posts[0] && <Link to={`/blog/${posts[0].slug.current}`}>
      <section className="max-w-7xl mx-auto px-5 py-2" id="blog">
        <article className=" relative">{posts[0].mainImage &&
          <img src={posts[0].mainImage.asset.url} alt={posts[0].mainImage.alt}
            
            className="h-80 w-full object-cover rounded-2xl"
          />}
          <div className="absolute bottom-8 left-8">
            <h1 className=" text-4xl lg:text-5xl mb-4 text-white capitalize">
             {posts[0].title}
            </h1>
         <p className=" text-slate-100 mb-2 md:w-1/2  pb-2">
              {`${posts[0].body[0].children[0].text.substring(0,200)}...`}
        </p>
            <Link to={`/blog/${posts[0].slug.current}`} className=" bg-white py-2 px-8 rounded shadow text-slate-800 tracking-wide hover:opacity-75 transition-all duration-200 ">
              Read More
            </Link>
          </div>
        </article>
      </section></Link>
}</>}


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
              {`${post.body[0].children[0].text.substring(0, 200)}...`}
          </p> </div> 
        </article></Link>
        ))}
        
      </section>

      <div className="max-w-7xl mx-auto px-5 mb-20 flex items-end justify-end">
        <Link to="/blog" className=" bg-white py-2 px-8 rounded shadow text-slate-800 tracking-wide hover:opacity-75 transition-all duration-200 ">
              Read All Blog Posts
            </Link></div>

     

        <Contact />
        
        <Profile />

        <Footer/>
 
      
    </>
  )
}

