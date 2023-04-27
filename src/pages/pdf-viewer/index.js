'use client'

import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ClipLoader from "react-spinners/ClipLoader";
import { useSearchParams } from "next/navigation"
import Loading from '@/components/Loading';

export default function MyComponent() {
  const searchParams = useSearchParams();
  const pdfname = searchParams.get('id');

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
        const res = await fetch(`https://aokjapukmfknqyuqmrdg.supabase.co/storage/v1/object/public/papers/${pdfname}.pdf?version=${Math.random()}`)
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
              .upload(`${pdfname}.pdf`, blob, {
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
 <Loading text='Saving Changes'/>
    }
    <div className="MyComponent">
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    </div>
    </>
  );
};