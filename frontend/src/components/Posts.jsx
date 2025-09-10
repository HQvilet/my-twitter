import React from 'react'
import Post from './Post'

const Posts = () => {
    const user = {
      _id: "1",
      text: "Let's build a fullstack WhatsApp clone with NEXT.JS 14 😍",
      img: "/posts/post1.png",
      user: {
        username: "johndoe",
        profileImg: "/avatars/boy1.png",
        fullName: "John Doe",
      },
      comments: [
        {
          _id: "1",
          text: "Nice Tutorial",
          user: {
            username: "janedoe",
            profileImg: "/avatars/girl1.png",
            fullName: "Jane Doe",
          },
        },
      ],
      likes: ["6658s891", "6658s892", "6658s893", "6658s894"]
    }

    return (
    <div>
        <Post post={user} /><Post post={user} /><Post post={user} />
    </div>
  )
}

export default Posts;