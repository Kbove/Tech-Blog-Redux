const router = require('express').Router()
const { Post, User } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attribute: [{model: User, attributes: ['name']}]
        })
        console.log('user data', userData)
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        })

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id'})
            return
        }

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
