import React, { useState, useContext } from 'react';
import { loginAccount } from '../../api/main';
import { useNavigate } from "react-router-dom";
import AuthContext  from '../../context/AuthProvider';

const FormLogIn = () => {
    const account = useContext( AuthContext);
    const [ textInput, setTexInput ] = useState({
        username :"",
        password :""
    });
    const nav = useNavigate();
    const [res, setRes ] = useState(null);
    const handleChangeText =( evt )=>{
        setTexInput({...textInput,   [ evt.target.name ] : evt.target.value } )
    }
    
    const handleLogin =(event)=>{
        event.preventDefault()
        loginAccount(textInput,setRes);
    }
    if(res && res.status==200){
        account.setAuth(
            {...account.auth,
                ["_id"]:res.data.check._id,
                ["username"]:res.data.check.username,
                ["password"]:res.data.check.password,
                ["firstName"]:res.data.check.firstName,
                ["lastName"]:res.data.check.lastName,
                ["email"]:res.data.check.email,
                ["listIdPosted"]:res.data.check.listIdPosted,
            });
        nav("/");
    }

    return (
        <form class=" px-28 ">
            <div >
                <div>
                    <label htmlFor="username" class="text-secondary-gray text-lg font-semibold ">Tài khoản</label>
                    <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    autoComplete="off" 
                    required 
                    onChange={e=>handleChangeText(e)}
                    class="bg-amber-50 py-2 w-full mt-2 mb-4"/>
                    
                </div>
                <div>
                    <label htmlFor="password" class="text-secondary-gray text-lg font-semibold mt-6 ">Mật khẩu</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    required 
                    onChange={e=>handleChangeText(e)}
                    class="bg-amber-50 py-2 w-full mt-2"/>
                </div>
                <div class="flex text-xs underline-offset-2 mt-4 ">
                    
                    <a href='/signup'> Đăng ký tài khoản</a>
                </div>
        
                <button onClick={(event)=>handleLogin(event)}
                 class="bg-primary w-1/2  text-center mt-4 py-2 rounded-md font-bold text-lg text-white">Đăng nhập</button> 
               
            </div>  
        </form>
        
    );
};

export default FormLogIn;