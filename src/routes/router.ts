import { Router } from "express"
import controllers from "../controllers/controllers"
import reviewControllers from "../reviews/controllers"
import likeControllers from "../likes/controllers"
import ratingControllers from "../ratings/controllers"
const router = Router()

router.post('/review/get/best', reviewControllers.getBest)
router.post('/review/get/latest', reviewControllers.getLatest)
router.post('/review/get/byId', reviewControllers.getById)
router.post('/review/get/byTag', reviewControllers.getByTag)
router.post('/review/create', reviewControllers.create)
router.post('/review/update', reviewControllers.update)
router.post('/like/create', likeControllers.createLike)
router.post('/like/remove', likeControllers.removeLike)
router.post('/rating/create', ratingControllers.createRating)
router.post('/user/create', controllers.createUser)

export default router