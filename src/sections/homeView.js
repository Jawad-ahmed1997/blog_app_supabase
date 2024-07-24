'use client'
import CustomButton from '@/components/buttons/button'
import supabase from '@/config/supabaseClient'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const HomeView = () => {
  const router = useRouter()
  const [orderBy, setOrderBy] = useState("created_at")
  const [fetchError, setFetchError] = useState(null)
  const [blogs, setBlogs] = useState(null);
  const [reload, setRealod] = useState(false);
  useEffect(() => {
    const fetchBlogs = async () => {
      console.log("fetchBlog run")
      const { data, error } = await supabase
        .from('blogs')
        .select()
        // .order(orderBy, { ascending: true })
      console.log("fetchBlog run data and error", data, error)

      if (error) {
        console.log(error)
        setFetchError(error)
        setBlogs(null)
      }
      if (data) {
        console.log(data)
        setBlogs(data)
        setFetchError(null)
      }
    }
    fetchBlogs()
  }, [reload, orderBy])
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit', year: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  const handleCreateNew = () => {
    router.push('/form/new')
  }
  const handleDeleteBlog = async (id) => {
    const { data, error } = await supabase.from("blogs").delete().eq("id", id).select()
    if (error) {
      console.log("error on Delete", error)
    }
    if (data) {
      console.log("Date on Delete", data)
    }
    setRealod(!reload)
  }
  return (


    <div className="bg-white py-24 sm:py-32">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8">
        <div className=" mx-auto w-full lg:mx-0 relative ">

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div>
            <CustomButton text="Created By" onClick={() => setOrderBy("created_at")} />
            <CustomButton text="By Title" onClick={() => setOrderBy("title")} />
            <CustomButton text="By Author" onClick={() => setOrderBy("author")} />
            <CustomButton text="By Type" onClick={() => setOrderBy("blog_type")} />
          </div>
          <CustomButton onClick={handleCreateNew} className="bg-green-700 hover:bg-green-800 absolute right-2 top-0" text="Create New" />
        </div>
        <div className="  mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogs?.map((post) => (
            <article key={post?.id} className=" relative flex max-w-xl flex-col shadow-lg px-2 py-5 rounded-lg items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs ">
                <time dateTime={post.datetime} className="text-gray-500">
                  {formatDate(post?.created_at)}
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post?.blog_type}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post?.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post?.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                {/* <img alt="" src={post.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" /> */}
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {post?.author}
                    </a>
                  </p>
                  <p className="text-gray-600">{post?.aut_designation}</p>
                </div>

              </div>
              <Link href={`/form/${post?.id}`} >
                <Icon icon="ic:baseline-edit" className='text-3xl absolute top-5 right-12  hover:bg-gray-100 hover:rounded-2xl text-gray-900 p-1' />
              </Link>
              <Icon onClick={() => handleDeleteBlog(post?.id)} icon="material-symbols:delete-outline" className='text-red-500 text-3xl absolute top-5 right-4  hover:bg-gray-100 hover:rounded-2xl p-1' />
            </article>
          ))}
        </div>
      </div>
    </div>


  )
}

export default HomeView