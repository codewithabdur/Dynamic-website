import React, { useEffect, useState } from 'react'
import client from '../lib/client'
import "./NavBar.css";
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaTimes} from 'react-icons/fa'

export default function NavBar() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        client.fetch(
          `*[_type == "logo"]{
            logoImg{
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

function openmenu() {
  document.getElementById("sidemenu").style.right = "0";
}
function closemenu() {
    document.getElementById("sidemenu").style.right = "-400px";
}

return(
    <>
        {!posts ? <h2>Loading...</h2> : <>{posts[0] && <div>
            <nav className="NavBar flex j-around a-centre">
          <div>
                    <a
                        href="https://codewithabdur.netlify.app"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <img 
                        src={posts[0].logoImg.asset.url}
                            alt={posts[0].logoImg.alt}
                            className="logo heart"
                        />
                    </a>
                </div>
                <ul className="flex" id="sidemenu">
                    <li>
                        <a href="#home" className="w child">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="w">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#blog" className="w">
                            Blog
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="w">
                            Contact
                        </a>
                    </li>
                    <FaTimes className="fas" onClick={closemenu} />
                </ul>
                <GiHamburgerMenu className="fas burger" onClick={openmenu} />
            </nav>
        </div>
        }</>}

        </>
        
     
    );
    }

