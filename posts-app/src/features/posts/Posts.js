import React from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client'

import { Spinner } from '../../atoms'
import { Formik, Form } from 'formik'
import Input from '../../atoms/input'
import Button from '../../atoms/button'
import * as schemas from "./schemas"
import { ReactComponent as AddIcon } from "../../icons/add.svg"



export function Posts() {
  const { loading, data: posts, refetch } = useQuery(schemas.GET_POSTS)
  const [addPost, { addingPost }] = useMutation(schemas.Add_POST, {
    onError: error => {
      console.log(error)
    },
    onCompleted: (data) => {
      console.log("Saved Successfully")
    }
  })

  const { subLoad } = useSubscription(schemas.POST_SUB, {
    variables: {}, onSubscriptionData: () => refetch()
  })

  return (
    <>
      {(loading || subLoad) && <Spinner />}
      <div className="container mx-auto max-w-sm flex flex-col space-y-4 justify-center items-center">
        <div className="bg-gray-50 w-full flex items-center p-2 rounded-xl shadow border">
          <div className="flex items-center space-x-4">
            <img src="./assets/logo.png" alt="profile" className="w-16 h-16 rounded-full object-none object-top" />
          </div>
          <div className="flex-grow p-3">
            <div className="font-semibold text-gray-700">
              <Formik
                initialValues={{
                  title: '',
                }}
                onSubmit={async (values) => {
                  await addPost({ variables: values })
                }}
              >
                <Form>
                  <Input name="title" label="Title" type="text" required={true} />
                  <Button type="submit" classes="p-0 w-10 h-10 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 rounded-full active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none float-right"  >
                    <AddIcon />
                  </Button>
                  {addingPost && <Spinner />}
                </Form>
              </Formik>
            </div>
          </div>
        </div>
        {posts?.allPosts && posts.allPosts.map(post => (
          <div key={post.id} className="bg-white w-full flex items-center p-2 rounded-xl shadow border">
            <div className="flex items-center space-x-4">
              <img src={`https://ui-avatars.com/api/?name=${post.user.name}&&background=random`} alt="profile" className="w-16 h-16 rounded-full" />
            </div>
            <div className="flex-grow p-3">
              <div className="font-semibold text-gray-700">
                {post.title}
              </div>
              <div className="text-sm text-gray-500">
                {post.user.name} . {new Date(Number(post.createdAt)).toDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
