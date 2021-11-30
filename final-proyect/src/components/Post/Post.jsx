import React, {useState, useEffect} from "react";
import { useForm } from 'react-hook-form'
//import { MdFavoriteBorder, MdFavorite, MdOutlineSend, MdSend} from "react-icons/md";
//import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//import { FavoriteIcon, FavoriteBorderIcon,ChatIcon ,ChatOutlinedIcon   } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Comment from "./Comment/Comment";
import { useUserContext } from "../../Contexts/UserContext";
import { useUserServices } from "../../Services/PW2021/User.services";
//import { RiChat4Line, RiChat4Fill } from "react-icons/ri";https://picsum.photos/500/500

const Post = ({post}) => {
    const context = useUserContext();
    const [iconLike, setIconLike] = useState(<FavoriteBorderIcon className=" text-red-400 hover:text-red-500" fontSize="large"/>)
    const [iconComment, setIconComment] = useState(<ChatOutlinedIcon className=" text-red-400 hover:text-red-500" fontSize="large"/>)
    const [formComment, setFormComment] = useState(<div></div>)

    useEffect(() => {
        
        post.likes.map(user => {
            if(user.username == context.user.username){
                setIconLike(<FavoriteIcon className=" text-red-500" fontSize="large"/>)
            }
        })
        
    }, []);

    const onSubmitHandler = (data, e) =>{
        console.log(data);
        e.target.reset();
    }
    const onClickLikeHandler = async () =>{
        const token = context.getToken();
        const response = await useUserServices.patchLike(post._id ,token) 
        console.log(response)
        console.log(response.data)
        iconLike.type.type.render.displayName === "FavoriteIcon"? setIconLike(<FavoriteBorderIcon className=" text-red-400 hover:text-red-500" fontSize="large"/>):setIconLike(<FavoriteIcon className=" text-red-500" fontSize="large"/>)
    }

    const onClickCommentHandler = () =>{
        if(iconComment.type.type.render.displayName === "ChatIcon"){       
            setIconComment(<ChatOutlinedIcon className=" text-red-400 hover:text-red-500" fontSize="large"/>)
            setFormComment(<div></div>)
        }else{
            setIconComment(<ChatIcon className=" text-red-500" fontSize="large"/>)
            setFormComment(<Comment comments={post.comments} id={post._id} />)
        }
    }
    



    return (
            <div className="w-full bg-purple-700  rounded-lg flex flex-col mt-3">
                <div className="w-full h-12  flex justify-center items-center hover:underline">
                    {`${post.user.username} - ${post.title} - ${post._id}`}
                </div>
                <div className="w-full h-96"><img className="w-full h-full object-contain" src={post.image}/></div>
                <div className="w-full h-20 overflow-auto p-2 pt-2  bg-purple-700 ">{post.description}</div>
                <div className="w-full h-12 flex flex-row justify-between items-center">
                    
                        <button  onClick={onClickLikeHandler} className="ml-6">{iconLike}</button>
                        <button onClick={onClickCommentHandler} className="mr-6">{iconComment}</button>
                    
                    
                </div>
                <div className="w-full h-8 flex flex-row justify-between items-center">
                        <p className="ml-6 text-red-400">{post.likes.length} Me gusta</p>
                        <p className="mr-6 text-red-400">{post.comments.length} Comentarios</p>
                    </div>
                {formComment}
            </div>
    );
};

export default Post;