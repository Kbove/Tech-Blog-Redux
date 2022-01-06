const router = require('express').Router()
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ]
        })
        const posts = postData.map((post) => post.get({ plain: true }))

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
                {
                    model: Comment,
                }
            ]
        })
        const post = postData.get({ plain: true })
        for (let i = 0; i < post.comments.length; i++) {
            try {
                const commenterName = await User.findByPk(post.comments[i].user_id, {
                    attributes: ['name']
                })
                const name = commenterName.get({plain: true})
                const key = 'name'
                post.comments[i][key] = name.name
            } catch (err) {
                res.status(500).json(err)
            }
        }
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attribute: { exclude: ['password'] },
            include: [{ model: Post }],
        })

        const user = userData.get({ plain: true })

        res.render('profile', {
            ...user,
            logged_in: true
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const dashboardData = await User.findByPk(req.session.user_id, {
            attribute: { exclude: ['password'] },
            include: [{ model: Post, Comment }],
        })
        console.log('dashboard data', dashboardData)

        const dashboard = dashboardData.get({ plain: true })
        console.log('dashboard data', dashboard)

        res.render('dashboard', {
            ...dashboard,
            logged_in: true
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/homepage', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ]
        })
        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile')
        return
    }
    res.render('login')
})



module.exports = router