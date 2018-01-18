const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;
const postModel = require('../models/post');
const commentModel = require('../models/comment');

router.get('/', (req, res, next) => {
    const author = req.query.author;
    postModel.getPosts(author)
        .then(function (posts) {

            res.render('index', {
                posts: posts
            })
        })
        .catch(next)

});

router.get('/create', checkLogin, (req, res, next) => {
    res.render('create')

});

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
    const id = req.params.postId;
    Promise.all([
            postModel.getPostById(id),
            commentModel.getCommentByPostId(id),
            postModel.incPv(id)
        ])
        .then(function (result) {
            let post = result[0];
            let comments = result[1];
            if (!result) {
                throw new Error("未找到");
            }
            res.render('details', {
                post: post,
                comments: comments
            })
        })
        .catch(next)



})
router.get('/:postId/edit', checkLogin, (req, res, next) => {
    let userId = req.session.user._id;
    postModel.getRawPostById(req.params.postId)
        .then(function (result) {
            if (!result) {
                throw new Error('未找到');
            }
            if (result.author._id.toString() !== userId.toString()) {
                throw new Error('权限不够');
            }
            res.render('edit', {
                post: result
            });
        })
        .catch(next)


})
router.post('/:postId/edit', checkLogin, (req, res, next) => {
    let userId = req.session.user._id;
    let title = req.fields.title;
    let content = req.fields.content;
    let id = req.params.postId;
    postModel.getPostById(id)
        .then(function (post) {
            if (!post) {
                throw new Error('不存在');
            }
            if (post.author._id.toString() != userId.toString()) {
                throw new Error("权限不够")
            }
            postModel.updatePostById(id, {
                    title: title,
                    content: content
                })
                .then(function () {
                    req.flash('success', "文章编辑成功");
                    res.redirect('/user/')
                }).catch(next)

        })


})
router.get('/:postId/remove', checkLogin, (req, res, next) => {
    let userId = req.session.user._id;
    let id = req.params.postId;
    postModel.getPostById(id)
        .then(post => {
            if (!post) {
                throw new Error("未找到");
            }
            if (post.author._id.toString() !== userId.toString()) {
                throw new Error("权限不够")
            }
            postModel.deletePostById(id)
                .then(function () {
                    req.flash('success', "文章删除成功");
                    res.redirect("/user/");
                }).catch(next)
        })



})


module.exports = router;