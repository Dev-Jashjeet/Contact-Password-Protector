import React, { useEffect, useState } from 'react'
import './App.css'
import 'remixicon/fonts/remixicon.css'
import { addContact, getContacts } from './redux/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import type dispatchObject from './types/types';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from '@reduxjs/toolkit';

function App() {
  const [name, setName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [unlockPass, setUnlockPass] = useState<dispatchObject|null>(null);
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [passOpen, setPassOpen] = useState<boolean>(false);
  const [eye, setEye] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const selector: dispatchObject[] = useSelector((state: any) => state.contact.contactLists)
  const dispatch = useDispatch();

  useEffect((): void => {
    dispatch(getContacts());
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const obj: dispatchObject = {
      id: nanoid(),
      name: name,
      mobile: btoa(mobile),
      password: btoa(password),
    }
    dispatch(addContact(obj));
    setName("");
    setMobile("");
    setPassword("");
    setOpen(!open);
    return;
  }

  const handleUnlockPassword = (item: dispatchObject): void => {
    setUnlockPass(item);
    setPassOpen(!passOpen);
    return;
  }

  const unlockContact = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if(unlockContact===null) return;

    const decodePass = atob(unlockPass!.password);
    if(decodePass === checkPassword) {
      toast.success("Password matched successfully", {
        duration: 800
      });
      const id: string = unlockPass!.id;
      const tr = document.getElementById(id) as HTMLTableRowElement;
      tr.innerHTML = atob(unlockPass!.mobile);
    }
    else {
      toast.error("Invalid Password", {
        duration: 600
      })
    }
    setCheckPassword("");
    setPassOpen(!passOpen);
    return;
  }

  const handleClose = (): void => {
    setName("");
    setMobile("");
    setPassword("");
    setOpen(!open);
    return;
  }

  const handleCloseP = (): void => {
    setCheckPassword("");
    setPassOpen(!passOpen);
    return;
  }

  return(
    <div className='min-h-screen relative'>
      <div className='h-screen bg-gray-800 p-5'>
        <div className='w-full md:w-9/12 p-4 md:p-12 bg-white rounded-xl mx-auto'>
          <div className='w-full flex justify-between'>
            <h1 className='text-4xl font-bold'>Private Contact</h1>
            <button onClick={(): void => setOpen(!open)} className='bg-blue-600 text-white p-3 pl-4 pr-4 rounded-lg cursor-pointer'>Add Contact</button>
          </div>
          <table className='w-full text-white font-bold mt-10'>
            <thead className='bg-pink-600'>
              <tr>
                <td className='p-4'>SN</td>
                <td>Person</td>
                <td>Mobile</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody className='text-gray-700 font-normal text-xl'>
              {
               selector && selector.map((item: dispatchObject, index: number) => (
                  <tr key={index+1}>
                    <td className='pl-5 p-2'>{index+1}</td>
                    <td>{item.name}</td>
                    <td id={item.id}>{item.mobile}</td>
                    <td>
                      <i onClick={(): void => handleUnlockPassword(item)} className="ri-eye-line" />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      {/* Add Contact Form */}
      { 
        open && <div className='h-screen bg-gray-900/40 absolute top-0 w-full z-10 flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='bg-white p-5 rounded-lg w-2xl'>
              <div className='flex justify-between mb-5'>
                <h2 className='text-2xl font-bold'>Add new contact</h2>
                <button onClick={handleClose} className='cursor-pointer'>
                  <i className="ri-close-line text-gray-500 text-2xl"></i>
                </button>
              </div>

              <div className='text-gray-600 mb-2'><span className='text-red-600'>*</span> Person's name</div>
              <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} value={name} required className='w-full border border-gray-500 rounded-lg p-2 outline-none' type="text" placeholder='Name of the contact'/>
              
              <div className='text-gray-600 mt-7 mb-2'><span className='text-red-600'>*</span> Mobile</div>
              <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobile(e.target.value)} value={mobile} required className='w-full border border-gray-500 rounded-lg p-2 outline-none' type="number" placeholder='Name of the contact'/>

              <div className='text-gray-600 mt-7 mb-2'><span className='text-red-600'>*</span> Enter contact password</div>
              <div className='flex relative'>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} value={password} required className='w-full border border-gray-500 rounded-lg p-2 outline-none' type={eye? "text" : "password"} placeholder='Name of the contact'/>
                <span onClick={(): void => setEye(!eye)} className=' text-xl absolute top-2 right-2 cursor-pointer'>
                  {
                    eye? <i className="ri-eye-fill"></i> : <i className="ri-eye-close-fill"></i> 
                  }
                </span>
              </div>

              <button className='mt-5 p-3 pr-4 pl-4 text-white bg-pink-500 rounded-lg cursor-pointer'>Save</button>
            </form>
        </div> 
      }
      {/* Unlock Password */}
      {
        passOpen &&  
        <div className='h-screen bg-gray-900/40 absolute top-0 w-full z-10 flex justify-center items-center'>
          <form onSubmit={unlockContact} className='bg-white p-5 rounded-lg w-2xl'>
              <div className='flex justify-between mb-5'>
                <h2 className='text-2xl font-bold'>Unlock Password</h2>
                <button onClick={handleCloseP} className='cursor-pointer'>
                  <i className="ri-close-line text-gray-500 text-2xl"></i>
                </button>
              </div>

              <div className='text-gray-600 mt-7 mb-2'><span className='text-red-600'>*</span> Enter contact password</div>
                <div className='flex relative'>
                  <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckPassword(e.target.value)} value={checkPassword} required className='w-full border border-gray-500 rounded-lg p-2 outline-none' type={eye? "text" : "password"} placeholder='Name of the contact'/>
                  <span onClick={(): void => setEye(!eye)} className=' text-xl absolute top-2 right-2 cursor-pointer'>
                    {
                      eye? <i className="ri-eye-fill"></i> : <i className="ri-eye-close-fill"></i> 
                    }
                  </span>
                </div>

                <button className='mt-5 p-3 pr-4 pl-4 text-white bg-pink-500 rounded-lg cursor-pointer'>Unlock</button>
          </form>
        </div>
      }
      <Toaster />
    </div>
  )
}

export default App;
