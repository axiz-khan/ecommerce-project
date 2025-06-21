const express = require("express");
const commentRouter = express.Router();
const Item = require("../models/itemModels.js");
const CommentSec = require("../models/commentModels.js");
const User = require("../models/userModels.js");
const { cartAccessMiddleware } = require("../middleware/cartAccessMiddleware.js");

commentRouter.get("/:proid", async (req, res) => {
    const commentSec = await CommentSec.findOne({ productId: req.params.proid });

    res.status(200).json(commentSec);
})
commentRouter.post("/:id", cartAccessMiddleware, async (req, res) => {

    const commentSec = await CommentSec.findOne({ productId: req.params.id });
    const item=await Item.findOne({_id:req.params.id});
    let commlength = commentSec.comments.length;
    commentSec.comments.push({ userId: req.user._id, comment: req.body.comment, rating: req.body.rating ? req.body.rating : 0 });
    if (req.body.rating)
        commentSec.rate = ((commentSec.rate * commlength) + req.body.rating) / commentSec.comments.length;
        item.rate = ((commentSec.rate * commlength) + req.body.rating) / commentSec.comments.length;

     await commentSec.save();
     await item.save();
    
    res.status(200).json(commentSec);
})

commentRouter.delete("/:proid/:commid", cartAccessMiddleware, async (req, res) => {
    const commentSec = await CommentSec.findOne({ productId: req.params.proid });
    const item=await Item.findOne({_id:req.params.proid});
    const commIndex = commentSec.comments.findIndex(comment => comment._id.equals(req.params.commid));
    if (commentSec.comments[commIndex].userId == req.user._id) {
        if (commentSec.comments[commIndex].rating) {
            let commlength = commentSec.comments.length;
            commentSec.rate = ((commentSec.rate * commlength) - commentSec.comments[commIndex].rating) / (commentSec.comments.length - 1);
            item.rate = ((commentSec.rate * commlength) - commentSec.comments[commIndex].rating) / (commentSec.comments.length - 1);
        }

        commentSec.comments.splice(commIndex, 1);
        await commentSec.save();
        await item.save();

        res.status(200).json("Your Comment is successfully deleted");
    } else {
        res.status(400).json({ message: "Forbided" });
    }


})

commentRouter.put("/:proid/:commid", cartAccessMiddleware, async (req, res) => {
    const commentSec = await CommentSec.findOne({ productId: req.params.proid });
    const commIndex = commentSec.comments.findIndex(comment => comment._id.equals(req.params.commid));
    if (commentSec.comments[commIndex].userId == req.user._id) {
        commentSec.comments[commIndex].comment = req.body.comment;

        let rating = commentSec.rate * commentSec.comments.length;
        rating = rating - commentSec.comments[commIndex].rating;
        rating = (rating + req.body.rating) / commentSec.comments.length;
        commentSec.comments[commIndex].rating = req.body.rating;
        commentSec.rate = rating;
        commentSec.save();
        res.status(200).json(commentSec);
    } else {
        res.status(400).json({ message: "Forbided" });
    }

})
module.exports = { commentRouter };