import React, { useState } from 'react'

const Create = ({ createdNewBlog, setCreatedNewBlog, setInfo, setError, createNewBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [createNewVisible, setCreateNewVisible] = useState(false)

    const showWhenVisible = { display: createNewVisible ? '' : 'none' }
    const hideWhenVisible = { display: createNewVisible ? 'none' : '' }

    const handleSubmit = async e => {
        e.preventDefault()
        if (title === '' || author === '' || url === '') {
            setError('Missing title, author or url')
            setTimeout(() => {
                setError(null)
            }, 3000)
            return
        }
        try {
            createNewBlog({ title: title, author: author, url: url, likes: 0 })
            setTitle('')
            setAuthor('')
            setUrl('')
            createdNewBlog ? setCreatedNewBlog(false) : setCreatedNewBlog(true)
            setCreateNewVisible(false)
            setInfo(`a new blog ${title} by ${author} added`)
            setTimeout(() => {
                setInfo(null)
            }, 3000)
        } catch (error) {
            setError('Error')
        }
    }


    return (
        <div>
            <button style={hideWhenVisible} onClick={() => setCreateNewVisible(true)}>Create new blog</button>
            <div style={showWhenVisible}>
                <form id="form" onSubmit={handleSubmit}>
                    <div>
                        <h1>Create new</h1>
                    </div>
                    <div>
                        title:
                        <input id="title" type="text" value={title} onChange={({ target }) => setTitle(target.value)}></input>
                    </div>
                    <div>
                        author:
                        <input id="author" type="text" value={author} onChange={({ target }) => setAuthor(target.value)}></input>
                    </div>
                    <div>
                        url:
                        <input id="url" type="text" value={url} onChange={({ target }) => setUrl(target.value)}></input>
                    </div>
                    <button id="create" type="submit">Create</button>
                </form>
                <button onClick={() => setCreateNewVisible(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default Create