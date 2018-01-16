const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;
const postModel = require('../models/post');

router.get('/', (req, res, next) => {
    const author = req.query.author;
    postModel.getPosts(author)
        .then(function (posts) {

            res.render('index', {
                posts: posts
            })
        })
        .catch(next)

})
router.get('/create', checkLogin, (req, res, next) => {
    res.render('posts')

})
router.post('/create', checkLogin, (req, res, next) => {
    const author = req.session.user._id;
    const title = req.fields.title;
    const content = req.fields.content;
    try {
        if (!title) {
            throw new Error("标题不能为空");
        }
        if (!content) {
            throw new Error("内容不能为空");
        }
    } catch (e) {
        req.flash("error", e.message);
        res.redirect('back');
    }
    let post = {
        author: author,
        title: title,
        content: content
    }
    postModel.create(post)
        .then(function (result) {
            post = result.ops[0];
            req.flash('success', "文章上传成功");
            res.redirect(`/posts/${post._id}`)
        }).catch(next)

})
router.get('/:postId', checkLogin, (req, res, next) => {
    postModel.getPostById(req.params.postId)
        .then(function (result) {
            console.log(result);
            res.render('details', {
                post: result
            })
        })
        .catch(next)



})
router.get('/:postId/edit', checkLogin, (req, res, next) => {
    res.send('更新文章页')

})
router.post('/:postId/edit', checkLogin, (req, res, next) => {
    res.send('文章详情')

})
router.get('/:postId/remove', checkLogin, (req, res, next) => {
    res.send('删除文章')

})


module.exports = router;