

const newCommentHandler = async (event) => {
    event.preventDefault()

    const description = document.querySelector('#comment-box').value.trim()
    const post_id = event.target.getAttribute('data-id')

    if (description) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, description }),
            headers: {'Content-Type' : 'application/json',}
        })
        if (response.ok) {
            document.location.reload()
        } else {
            alert('Comment failed to post')
        }
    }
}



const comDeleteHandler = async (event) => {
    event.preventDefault()
    const id = event.target.getAttribute('data-id')
    console.log(id)
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        document.location.reload()
    } else {
        alert("Failed to delete comment")
    }
}

document
    .querySelector('#commentBtn')
    .addEventListener('click', newCommentHandler);

const elements = document.querySelectorAll('.delComBtn')

elements.forEach(element => {
    element.addEventListener('click', (event) => {
        comDeleteHandler(event)
    })
})
