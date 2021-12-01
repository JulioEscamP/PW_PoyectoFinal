import React, {useState} from "react";
import { useForm } from 'react-hook-form'
import PartForm from "./PartForm/PartForm";
import { useAdminServices } from "../../Services/PW2021/Admin.services";
import { useUserContext } from "../../Contexts/UserContext";
const NewPost = () => {

    const [formComment, setFormComment] = useState(<div></div>)
    const {register, errors, handleSubmit} = useForm();
    const context = useUserContext();

    const onSubmitHandler = async (data, e) =>{
        console.log(data);
        const token = context.getToken();
        console.log(token)
            const post = { title: data.title, description: data.description, image: data.image};
            console.log(post)
            const response = await useAdminServices.createPost(post, token) 
            console.log(response)
            console.log(response.data)
        e.target.reset();
    }



    const onFocusHandler = () =>{
        
        setFormComment(<PartForm data={register}/>)
    }

    const onBlurHandler = () =>{
        
        setTimeout(() => {setFormComment(<div></div>)}, 7000);
    }

    return (
        <div onMouseLeave={onBlurHandler} onMouseEnter={onFocusHandler} className="w-full  bg-blue-700 rounded-lg mt-20  ">
            
                <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full h-full flex flex-col gap-y-7 items-center ">
                <input name="comment"  onFocus={onFocusHandler} className="w-4/5 h-12 mt-6 px-4 text-3xl rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder="Titulo" {...register("title")}  />
                
                {formComment}
                </form>  
        </div>
    );
};

export default NewPost;