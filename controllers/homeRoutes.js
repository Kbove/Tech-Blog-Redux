const router = require('express').Router()
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    console.log('break point 3')
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ]
        })
        const posts = postData.map((post) => post.get({plain: true}))

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ]
        })

        const post = postData.get({ plain: true})
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/profile', withAuth, async (req, res) => {
    console.log('get profile break point')
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attribute: { exclude: ['password']},
            include: [{model: Post}],
        })

        const user = userData.get({plain:true})

        res.render('profile', {
            ...user,
            logged_in: true
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    console.log("break point")
    if (req.session.logged_in) {
        res.redirect('/profile')
        console.log('break point 2')
        return
    }
    console.log('break point 3')
    res.render('login')
})

module.exports = router