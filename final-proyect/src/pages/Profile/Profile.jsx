import React, {useState, useEffect} from "react";
import Navbar from "../Admin/Navbar/Navbar";
import { Route, Routes } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { VscAccount } from "react-icons/all";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Posts from "./ViewPost/ViewPost"
import {Link} from "react-router-dom";

const Profile = () => {

    return (
        <div className="  bg-purple-500 flex flex-col items-center ">
            <Navbar/>
            <div className=" mt-20 mb-20  w-6/12 flex flex-col  bg-green-400" >
                <div className="h-10/12 col-start-2 col-span-4 bg-yellow-400  ">
                    <div className="flex flex-row " >         
                        <VscAccount className=" text-9xl" />
                        <p>Username</p>
                    </div>
                    <div className="flex flex-row justify-evenly">
                        <Link to="/admin/profile/publicaciones" className="w-2/6 p-1.5 flex flex-row justify-center  border-t-2  hover:border-black ">  
                            <ViewCarouselIcon className="mx-4" fontSize="large"/>
                            <button>Publicaciones</button>
                        </Link>
                        <Link to="/admin/profile/like" className="w-2/6 p-1.5 flex flex-row justify-center  border-t-2  hover:border-black ">                                               
                            <FavoriteIcon className="mx-4" fontSize="large"/>
                            <button>Me gusta</button>
                            
                        </Link>
                        <Link to="/admin/profile/favoritos" className="w-2/6 p-1.5 flex flex-row justify-center  border-t-2  hover:border-black ">  
                            <BookmarkIcon className="mx-4" fontSize="large"/>
                            <button>Favoritos</button>
                        </Link>
                    </div>
                </div>
                <div >
                    <Routes>
                        <Route path="publicaciones" element ={<Posts/> }/>
                        <Route path="like" element ={ <p> Elemento B </p> }/>
                        <Route path="favoritos" element ={ <p> Elemento C </p> }/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Profile;