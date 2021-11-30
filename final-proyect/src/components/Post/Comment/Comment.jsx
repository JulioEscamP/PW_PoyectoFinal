import React, {useState} from "react";
import { useForm } from 'react-hook-form'
import SendIcon from '@mui/icons-material/Send';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useUserContext } from "../../../Contexts/UserContext";
import { useUserServices } from "../../../Services/PW2021/User.services";

const Comment = ({comments, id}) => {
    const context = useUserContext();
    const {register, errors, handleSubmit} = useForm();
    const [send,setSend] = useState(<SendOutlinedIcon className="text-red-600" fontSize="large"/>)


    const onSubmitHandler = async (data, e) =>{
        console.log(data);
        const token = context.getToken();
        console.log(token)
        const response = await useUserServices.addComment(data.description, id ,token) 
        console.log(response)
        console.log(response.data)
        e.target.reset();
    }
    
    const onMouseEnterLikeHandler = () => {
        setSend(<SendIcon className="text-red-600" fontSize="large"/>)
    } 

    const onMouseLeaveLikeHandler = () => {
        setSend(<SendOutlinedIcon  className="text-red-600" fontSize="large"/>)
    }  

    return (
        <div>
            <div className="w-full h-20 overflow-auto p-2 pt-2  bg-red-400">{
                comments.map( comment => {
                return <p>{`${comment.user.username}: ${comment.description}`}</p>
                })
                }</div>
            <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full h-16 flex flex-row justify-between items-center ">
                <input name="comment" className="w-4/5 h-8 ml-6 px-4 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder="Tengo que decir ..."  {...register("description")}/>
                <button type="submit" onMouseEnter={onMouseEnterLikeHandler} onMouseLeave={onMouseLeaveLikeHandler} className="mr-6 " id="send">{send}</button>
            </form>
        </div>
        
    );
};

export default Comment;
