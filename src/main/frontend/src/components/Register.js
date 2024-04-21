import React, { useState } from 'react'
import UserService from '../services/UserService';

const Register = () => {
    const [user, setUser] = useState({
        userName:"",
        email:"",
        password:""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({...user, [e.target.name]:value});
    }

    const registerUser = (e) => {
        // prevent page reload
        e.preventDefault();
        UserService.registerUser(user).then((response) => {
            if (response.status === 200) {
                window.location = "/song" 
            }
        }).catch((error) => {
            console.log(error);
        })
    }

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
            <div>
                <label for="userName" class="block text-sm font-medium leading-6 text-gray-900">User name</label>
                <div class="mt-2">
                <input 
                    id="userName" 
                    name="userName" 
                    value={user.userName}
                    onChange={(e)=> handleChange(e)}
                    type="userName" 
                    autocomplete="user namame" 
                    required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                </input>
                </div>
            </div>

            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                <input 
                    id="email" 
                    name="email" 
                    value={user.email}
                    onChange={(e)=> handleChange(e)}
                    type="email" 
                    autocomplete="email" 
                    required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                </input>
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div class="mt-2">
                <input 
                    id="password" 
                    name="password" 
                    value={user.password}
                    onChange={(e)=> handleChange(e)}
                    type="password" 
                    autocomplete="current-password" 
                    required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                </input>
                </div>
            </div>

            <div>
                <button 
                    type="submit" 
                    onClick={registerUser}
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign up
                </button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Register