'use client'

import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ClipLoader from "react-spinners/ClipLoader";

export default function MyComponent({searchParams}) {

  console.log(searchParams)
  const viewer = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState('')
  

  return (
    <>

    <div className="MyComponent">
      <div>Hola hola</div>
    </div>
    </>
  );
};