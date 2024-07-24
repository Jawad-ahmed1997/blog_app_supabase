'use client'
import React, { useMemo } from 'react'

import * as Yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFInput from '@/components/input/input'
import CustomButton from '@/components/buttons/button';
import supabase from '@/config/supabaseClient';
import { useRouter } from 'next/navigation'

const CreateUpdateBlogView = ({ currentValue,isEdit,id }) => {
  const router = useRouter()
  const blogSchema = Yup.object().shape({
    blog_type: Yup.string().required("Bolg Category is required"),
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    author: Yup.string().required("description is required"),
    aut_designation: Yup.string().required("description is required"),
  })

  const defaultValues = useMemo(() => ({
    blog_type: currentValue?.blog_type || "",
    title: currentValue?.title || "",
    description: currentValue?.description || "",
    author: currentValue?.author || "",
    aut_designation: currentValue?.aut_designation || "",
  }), [currentValue])

  const methods = useForm({
    resolver: yupResolver(blogSchema),
    defaultValues,
  });

  const {reset, handleSubmit, formState: { isSubmitting, errors } } = methods
  console.log("errors",errors)
  const onSubmit = handleSubmit (async(formData)=>{
    if(isEdit){
      const {data,error} = await supabase
      .from("blogs").update(formData).eq("id",id)
      if(error){
        console.log("error in data base",error)
      }
      if(data){
        console.log(data)
      }
    }
    else{
      const {data,error} = await supabase
      .from("blogs").insert(formData).select()
      if(error){
        console.log("error in data base",error)
      }
      if(data){
        console.log(data)
        reset()
      }
    }
    
    router.push('/')
    console.log("data in form",formData)
  })

  return (
    <div>
      <FormProvider {...methods} >
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-center items-center h-screen w-screen flex-col '>
        <div className='flex justify-center items-center flex-col lg:w-2/4 md:3/4 sm:w-[98%] w-[98%] bg-slate-300 px-5 py-3 rounded-3xl m-4'>
        <RHFInput name="blog_type" placeholder="Blog type"/>  
        <RHFInput name="title" placeholder="Title" />
        <RHFInput name="description" placeholder="Description"/>
        <RHFInput name="author" placeholder="Author Name"/>
        <RHFInput name="aut_designation" placeholder="Author Designation"/>
        <button type="submit"   className="w-3/4 bg-green-600 hover:bg-green-700 rounded-md py-3 px-2 font-bold text-xl">
          {isEdit ? "Update" : "Create"} 
        </button>
          </div>
        </div>
       
        </form>

      </FormProvider>
    </div>
  )
}

export default CreateUpdateBlogView