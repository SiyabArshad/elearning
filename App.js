import React, { useEffect, useState } from 'react';
import BaseScreen from "./app/config/Basescreens"
import ProtectedScreen from "./app/config/Protectectedscreens"
import { Authcontext } from './app/config/Authcontext';
import LoadingModal from './app/components/common/LoadingModal';

export default function App() {
  const[load,setload]=useState(false)
  useEffect(()=>{
    
    setload(true)
    setTimeout(() => {
      setload(false)
    }, 2000);
  },[])
  const { user } = Authcontext();
  if(load)
  {
    return <LoadingModal></LoadingModal>
  }
  else
  {
  return user ? <ProtectedScreen /> : <BaseScreen />;
  }
}


// Happy Coding :)
