import { Router } from "express"
import reviewControllers from "../reviews/controllers"
import likeControllers from "../likes/controllers"
import ratingControllers from "../ratings/controllers"
import commentControllers from "../comments/controllers"
import userControllers from "../users/controllers"
import tagControllers from "../tags/controllers"
import imageControllers from "../images/controllers"
import authControllers from "../auth/controllers"
import requireAuth from "../middleware/requireAuth"

const router = Router()

router.post('/review/get/best', reviewControllers.getBest)
router.post('/review/get/latest', reviewControllers.getLatest)
router.post('/review/get/byId', reviewControllers.getById)
router.post('/review/get/byTag', reviewControllers.getByTag)
router.post('/review/get/byUser', requireAuth, reviewControllers.getByUser)
router.post('/review/create', requireAuth, reviewControllers.create)
router.post('/review/update', requireAuth, reviewControllers.update)
router.post('/review/remove', requireAuth, reviewControllers.remove)
router.post('/like/create', requireAuth, likeControllers.createLike)
router.post('/like/remove', requireAuth, likeControllers.removeLike)
router.post('/like/get', likeControllers.removeLike)
router.post('/rating/create', requireAuth, ratingControllers.createRating)
router.post('/comment/create', requireAuth, commentControllers.createComment)
router.post('/comment/get/byReview', commentControllers.getByReview)
router.post('/user/get/all', requireAuth, userControllers.getAll)
router.post('/user/create', requireAuth, userControllers.create)
router.post('/tag/get/popular', tagControllers.getPopular)
router.post('/tag/get/byPrefix', requireAuth, tagControllers.getByPrefix)
router.post('/image/create', requireAuth, imageControllers.create)
router.post('/vk-auth', authControllers.vkAuth)

export default router