 import  React, { useEffect, useState } from 'react'
 import Header from "../../layout/header/header"
 import Footer from "../../layout/footer/footer"
import './newfeed.css'
import {ItemBook}  from '../ranking/itemBook';
import { getAllPost } from '../../api/main';
import IconLike from '../../assets/icon/like.svg';
import IconDisLike from '../../assets/icon/dislike.svg';



const NewFeed = () => {
    const [ dataListBook, setDataListBook ] = useState(null);

    const [ refresh, setRefresh ] = useState(true)
    useEffect(()=>{
        getAllPost(setDataListBook);
       
    },[refresh])
  
    const REFRESH ={ refresh, setRefresh };

    console.log(dataListBook)

    const [popupcontent,setpopupcontent]=useState([]);
    const [popuptogle,setpopuptogle]=useState(false);
    const changecontent=(value)=>{
        setpopupcontent([value]);
        setpopuptogle(!popuptogle);
    }

return (
    <div>
        <Header/>
        <div >
        <h1 class='hdtext'>NEWFEED</h1>
        <div className='flex flex-wrap mx-10 '>
            {
                dataListBook && dataListBook.filter((check)=>{
                    if(check.status===true){
                        return check;
                    }
                })
                .map((value,index)=>{
                    return (
                        <>
                            {
                                <div className='flex flex-col w-1/3 justify-center items-center my-10' key={index}>
                                    <ItemBook value={value} refresh = { REFRESH }></ItemBook>
                                    <button  className='bg-primary w-52 py-2 hover:bg-primary-600 cursor-pointer' onClick={()=>changecontent(value)}>
                                        <h2 className='text-center text-white font-semibold '>Xem thêm</h2>
                                    </button>
                                </div>
                              
                            } 
                        </>
                    )
                })
            }
        </div>
        
        {popuptogle&& 
            <div className='pop_up_container'  onClick={changecontent}>
                <div className='pop_up_body'>
                    <div className='pop_up_header'>
                        <button onClick={changecontent}>X</button>
                    </div>

                    <div className='pop_up_content'>
                        {popupcontent.map((pop)=>{
                            return (
                                <div class="flex ">
                                    <div class='w-4/6'>
                                        <div class='pop_up_title'>Book's name: {pop.title}</div>
                                        <div class='pop_up_author'>Author: {pop.author} </div>
                                        <div class='pop_up_author'>Category: {pop.category}</div>
                                        <div class='flex mb-4 mt-2'>
                                                <img src={IconLike} alt="React Logo" className='w-10 h-10 cursor-pointer ml-4 mr-2'/>
                                                <h4 className='text-center text-2xl text-orange-700 font-medium'>{pop.listLike.length}</h4>
                                                <img src={IconDisLike} alt="React Logo" className='w-10 h-10 cursor-pointer ml-4 mr-2' />
                                                <h4 className='text-center text-2xl text-orange-700 font-medium'>{pop.listDislike.length}</h4>
                                        </div>
                                        <div class='pop_up_desc'>{pop.content}</div>
                                    </div>
                                
                                    <div class='pop_up_img'>
                                        <img src={pop.img}></img>
                                    </div>
                                 
                                </div>

                            )
                        })}

                    </div>
                </div>
           
            </div>}
           
        </div>
       
        <Footer/>
    </div>
)
}
export default NewFeed