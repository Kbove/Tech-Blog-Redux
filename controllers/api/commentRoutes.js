const router = require('express').Router()
const { Comment } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
    console.log('comment posting route breakpoint')
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        console.log("new comment", newComment)
        res.status(200).json(newComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json()
    } catch (err) {
        res.status(404).json({ message: 'Failed to delete comment'})
    }
})

module.exports = router