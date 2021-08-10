import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Create from './components/newBlog'
import Notification from './components/Notification'
import Error from './components/Error'
import './index.css'
import LoginForm from './components/Login'
const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [info, setInfo] = useState(null)
    const [createdNewBlog, setCreatedNewBlog] = useState(false)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs.sort((a,b) => a.likes - b.likes).reverse())
        )
    }, [createdNewBlog])


    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggeduser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])


    const logout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    const createNewBlog = async ({ title, author, url }) => {
        await blogService.createNew({ title: title, author: author, url: url, likes: 0 })
    }

    const testClick = () => {
        console.log('clicked')
    }

    if (user === null) {
        return (
            <div>
                <Error message={error} />
                <LoginForm setError={setError} setUser={setUser} />
            </div>
        )
    }

    return (
        <div>
            <h1>Blogs</h1>
            <Notification message={info} />
            <Error message={error} />
            <p>{user.username} is logged in<button onClick={() => logout()}>Logout</button></p>
            <Create createdNewBlog={createdNewBlog}
                setCreatedNewBlog={setCreatedNewBlog}
                user={user}
                setInfo={setInfo}
                setError={setError}
                createNewBlog={createNewBlog}
            />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={user} createdNewBlog={createdNewBlog} setCreatedNewBlog={setCreatedNewBlog} testClick={testClick} />
            )}
        </div>
    )
}

export default App