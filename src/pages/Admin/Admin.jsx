import React, {useEffect, useState, useRef} from "react";
import Post from "../../Components/Post/Post"
import NewPost from "../../Components/NewPost/NewPost"
import Navbar from "./Navbar/Navbar";
import { useUserContext } from "../../Contexts/UserContext";
import { useUserServices } from "../../Services/PW2021/User.services";
import { set } from "react-hook-form";

var page = 0;
var posts = [];
const Admin = () => {
  const context = useUserContext();
  const [renderPosts, setRenderPosts] = useState([]);
  const observer = useRef(
    new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          
          
          console.log("En el ref "+page)
          loadingPosts();
          page++;
        }
      },
      { threshold: 1 }
    )
  );

  const [element, setElement] = useState(null);

      useEffect(() => {
        
        const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

      const loadingPosts = async () => {
            const token = context.getToken();
            console.log(token)
            console.log("En el loading post "+page)
            const filters = { limit: 5, page: page };
            const response = await useUserServices.getAll(filters, token)
            console.log(response.data);
            posts = posts.concat( response.data)
            
            console.log(posts)
            setRenderPosts(posts)
            console.log(posts.length)
      }

    return (
        <div className="min-h-screen  h-full bg-scroll bg-repeat bg-gradient-to-r from-yellow-300 to-blue-500 grid grid-cols-6">
            <Navbar/>
            <div className="col-start-1 col-span-6 sm:col-start-2 sm:col-span-4 xl:col-start-3 xl:col-span-2">
                <NewPost /> 
                <div>
                {
                  renderPosts.map( post => {
                  return <Post
                  post={post}
                  key={post.id}
                    />
                })
                }
                </div>
                
                <div class="border border-green-300 shadow rounded-md p-4  w-full mx-auto mt-3">
                  <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-indigo-700 h-12 w-12"></div>
                    <div class="flex-1 space-y-4 py-1">
                      <div class="h-4 bg-indigo-700 rounded w-3/4"></div>
                      <div class="space-y-2">
                        <div class="h-4 bg-pindigo-700 rounded"></div>
                        <div class="h-4 bg-indigo-700 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div ref={setElement} class="border  border-blue-300 shadow rounded-md p-4  w-full mx-auto mt-3">
                  <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-indigo-700 h-12 w-12"></div>
                    <div class="flex-1 space-y-4 py-1">
                      <div class="h-4 bg-purple-700 rounded w-3/4"></div>
                      <div class="space-y-2">
                        <div class="h-4 bg-green-700 rounded"></div>
                        <div class="h-4 bg-green-700 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>


            </div>
        </div>
    );
};

export default Admin;