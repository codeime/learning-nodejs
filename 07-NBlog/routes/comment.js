const express = require('express');
const router = express.Router();
const commentModel = require('../models/comment')

const checkLogin = require('../middlewares/check').checkLogin;

router.post('/', checkLogin, (req, res, next) => {
    let userId = req.session.user._id;
    let content = req.fields.content;
    let postId = req.fields.postId;
    try {
        if (!content.length) {
            throw new Error("请填写内容");
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }
    let comment = {
        author: userId,
        content: content,
        postId: postId
    }
    commentModel.addComment(comment)
        .then(() => {
            req.flash('success', '留言成功')
            res.redirect('back')
        }).catch(next)
})
router.get('/:commentId/remove', checkLogin, (req, res, next) => {
    let author = req.session.user._id;
    let id = req.params.commentId;
    commentModel
        .getComentById(id)
        .then((comment) => {
            if (!comment) {
                throw new Error('未找到')

            }
            if (comment.author.toString() !== author.toString()) {
                throw new Error('权限不够');

            }

            commentModel
                .deleteCommentById(id)
                .then(() => {
                    req.flash('success', '删除成功');
                    res.redirect('back');
                })
                .catch(next)
        })
})
module.exports = router;