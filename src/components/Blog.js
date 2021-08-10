import React, { useState } from 'react'
import blogService from '../services/blogs'
import propTypes from 'prop-types'



const Blog = ({ blog, user, createdNewBlog, setCreatedNewBlog, testClick }) => {
    const [showDetails, setShowDetails] = useState(false)
    const show = { display: showDetails ? '' : 'none' }
    const hide = { display: showDetails ? 'none' : '' }

    const newLike = async () => {
        try {
            await blogService.updateBlog({
                id: blog.id,
                user: user.id,
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes + 1
            })
            createdNewBlog ? setCreatedNewBlog(false) : setCreatedNewBlog(true)
        } catch (exception) {
            console.log(exception.message)
        }
    }


    const deleteBlog = async () => {
        let ask = window.confirm(`Remove blog ${blog.title}?`)
        if (ask) {
            try {
                await blogService.deleteBlog({
                    id: blog.id
                })
                createdNewBlog ? setCreatedNewBlog(false) : setCreatedNewBlog(true)
            } catch (exception) {
                console.log(exception.message)
            }
        }
    }

    return (
        <div className="blog">
            <div style={hide}>
                {blog.title} {blog.author}
                <button onClick={() => setShowDetails(true)} className="view">View</button>
            </div>
            <div className="show" style={show}>
                <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid black' }}>
                    <div>
                        {blog.title}
                        <button onClick={() => setShowDetails(false)}>hide</button>
                    </div>
                    <div className="url">
                        {blog.url}
                    </div>
                    <div className="likes">
                        Likes: <span id="like">{blog.likes}</span><button onClick={() => {newLike(); testClick()}} className="like">Like</button>
                    </div>
                    <div>
                        {blog.author}
                    </div>
                    <div>
                        {blog.user.username}
                        {blog.user.username === user.username ? <button onClick={() => deleteBlog()}>Remove</button> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
    createdNewBlog: propTypes.bool.isRequired
}

export default Blog