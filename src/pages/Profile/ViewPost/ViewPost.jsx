import React, { useEffect, useState} from "react";
import { useUserContext } from "../../../Contexts/UserContext";
import { useAdminServices } from "../../../Services/PW2021/Admin.services";

const ViewPost = () => {
    const context = useUserContext();
    const [renderPosts, setRenderPosts] = useState([]);
    useEffect( () => {
        const myPost = async () => {  
            try {
            const token = context.getToken();
            console.log(token)
            const filters = { limit: 15, page: 0 };
            const response = await useAdminServices.ownedPosts(filters, token)
            console.log(response.data);
            setRenderPosts(response.data)
            
              } catch (error) {
                console.error(error);
              }
        };
        myPost();  
  }, []);
    

    return (
        <div className=" grid  grid-cols-1 md:grid-cols-3 gap-8">
            {
                  renderPosts.map( post => {
                  return <img className="w-full h-full object-contain object-center" src={post.image}/>
                })
                }
            
            
           {/*  <img className="w-full h-full object-contain object-center" src="https://picsum.photos/200/200"/> */}
        </div>
    );
};

export default ViewPost;