'use client'
import supabase from '@/config/supabaseClient'
import CreateUpdateBlogView from '@/sections/blog/createUpdateBlogView'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditBlogById = () => {
    const { id } = useParams()
    const [currentValue, setCurrentValue] = useState(null)
    const[loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchBlogByID = async () => {
            setLoading(true)
            const { data, error } = await supabase.from("blogs").select().eq("id", id).single()
            if (error) {
                console.log("error in blog fetching", error)
                setLoading(false)
            }
            if (data) {
                setCurrentValue(data)
                console.log("data for edit ",data)
                setLoading(false)
            }
        }
        if(id){
            fetchBlogByID()
        }
    }, [])

   if(loading){
    return <h1>
        Loading ...
    </h1>
   }

    return (
            <CreateUpdateBlogView currentValue={currentValue} isEdit id={id} />
        
    )
}

export default EditBlogById