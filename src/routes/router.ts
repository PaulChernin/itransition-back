import { Router } from "express"
import controllers from "../controllers/controllers"
const router = Router()

router.post('/review/top', controllers.getTopReviews)
router.post('/user/create', controllers.createUser)
router.post('/review/create', controllers.createReview)

export default router