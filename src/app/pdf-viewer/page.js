'use client'

import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ClipLoader from "react-spinners/ClipLoader";

export default function MyComponent({searchParams}) {

  const viewer = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState('')
  useEffect(() => {
    const getPaper = async () => {
      WebViewer(
        {
          path: 'lib',
        },
        viewer.current,
      ).then(async(instance) => {

        const { documentViewer, annotationManager } = instance.Core;
        const res = await fetch(`https://aokjapukmfknqyuqmrdg.supabase.co/storage/v1/object/public/papers/${searchParams?.name?.replace('+', ' ')}.pdf?version=${Math.random()}`)
        const blob = await res.blob()
        instance.UI.loadDocument(blob);


        // you can now call WebViewer APIs here...
        instance.UI.setHeaderItems(header => {
          header.push({
            type: 'actionButton',
            img: 'icon-save',
            onClick: async () => {
              setLoading(true)
              const doc = documentViewer.getDocument();
              const xfdfString = await annotationManager.exportAnnotations();
              const data = await doc.getFileData({
                // saves the document with annotations in it
                xfdfString
              });
              const arr = new Uint8Array(data);
              const blob = new Blob([arr], { type: 'application/pdf' });
              supabase
              .storage
              .from('papers')
              .upload(`${searchParams?.name?.replace('+', ' ')}.pdf`, blob, {
                upsert: true,
              }).then(()=> {
                setLoading(false)
              })

              // Add code for handling Blob here
            }
          })
        })
        instance.UI.setZoomStepFactors(
          [
            {
              step: 12,
              startZoom: 0
            },
          ]
        );
      });
    }
    import('@pdftron/webviewer').then(()=> {
      getPaper()
    })


  }, []);

  return (
    <>
    {loading &&
      <div className="z-10 bg-black h-screen bg-opacity-20 absolute w-screen grid place-content-center" onClick={() => { setIsOpen(false); resetInput();}}>
        <div className='bg-white p-4 flex flex-col rounded-md justify-around gap-2'>
          <p className='m-auto'>Saving changes</p>
        <ClipLoader className="m-auto"
              size={20}
              
            />
        </div>
      </div>
    }
    <div className="MyComponent">
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    </div>
    </>
  );
};