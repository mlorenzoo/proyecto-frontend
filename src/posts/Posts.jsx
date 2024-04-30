import React, { useState } from 'react'
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PostEdit } from './PostEdit';
import { PostsAdd } from './PostsAdd';
import { PostsGrid } from './PostsGrid';
import { PostsList } from './PostsList';
import { PostsMenu } from './PostsMenu';
import { Post } from './Post';


export const Posts = () => {

    let [ afegir, setAfegir ] =  useState(false);
    let [ grid , setGrid]  = useState(false);
    let [ editar, setEditar ] =  useState(false);

    
    const navega = useNavigate()
    useEffect ( ()=> {
        navega("/posts/list")

    },[])
    //;
 
    return (
    <>
    
    
    {<PostsMenu/>}
  
    
    
    
    </>      
    
  )
}
