import { RequestHandler, Router } from "express"
import reviewControllers from "../reviews/controllers"
import likeControllers from "../likes/controllers"
import ratingControllers from "../ratings/controllers"
import commentControllers from "../comments/controllers"
import userControllers from "../users/controllers"
import tagControllers from "../tags/controllers"
import imageControllers from "../images/controllers"
import authControllers from "../auth/controllers"
import validateJwt from "../middleware/validateJwt"
import { validate } from "../middleware/validate"
import { schemas as reviewSchemas } from "../reviews/validation"

const router = Router()

const routes = [
    {
        path: '/review/get/best',
        requireAuth: false,
        validationSchema: reviewSchemas.getBest,
        controller: reviewControllers.getBest
    },
    {
        path: '/review/get/latest',
        requireAuth: false,
        validationSchema: reviewSchemas.getLatest,
        controller: reviewControllers.getLatest
    },
    {
        path: '/review/get/byId',
        requireAuth: false,
        validationSchema: reviewSchemas.getById,
        controller: reviewControllers.getById
    },
    {
        path: '/review/get/byTag',
        requireAuth: false,
        validationSchema: reviewSchemas.getByTag,
        controller: reviewControllers.getByTag
    },
    {
        path: '/review/get/byUser',
        requireAuth: true,
        validationSchema: reviewSchemas.getByUser,
        controller: reviewControllers.getByUser
    },
    {
        path: '/review/create',
        requireAuth: true,
        validationSchema: reviewSchemas.create,
        controller: reviewControllers.create
    },
    {
        path: '/review/update',
        requireAuth: true,
        validationSchema: reviewSchemas.update,
        controller: reviewControllers.update
    },
    {
        path: '/review/remove',
        requireAuth: true,
        validationSchema: reviewSchemas.remove,
        controller: reviewControllers.remove
    },
    {
        path: '/like/create',
        requireAuth: true,
        validationSchema: null,
        controller: likeControllers.createLike
    },
    {
        path: '/like/remove',
        requireAuth: true,
        validationSchema: null,
        controller: likeControllers.removeLike
    },
    {
        path: '/like/get',
        requireAuth: true,
        validationSchema: null,
        controller: likeControllers.getLike
    },
    {
        path: '/like/get/count',
        requireAuth: false,
        validationSchema: null,
        controller: likeControllers.getLikeCount
    },
    {
        path: '/like/get/count/byUser',
        requireAuth: false,
        validationSchema: null,
        controller: likeControllers.getLikeCountByUser
    },
    {
        path: '/rating/create',
        requireAuth: true,
        validationSchema: null,
        controller: ratingControllers.createRating
    },
    {
        path: '/rating/get/average',
        requireAuth: false,
        validationSchema: null,
        controller: ratingControllers.getAverageRating
    },
    {
        path: '/comment/create',
        requireAuth: true,
        validationSchema: null,
        controller: commentControllers.createComment
    },
    {
        path: '/comment/get/byReview',
        requireAuth: false,
        validationSchema: null,
        controller: commentControllers.getByReview
    },
    {
        path: '/user/get/all',
        requireAuth: true,
        validationSchema: null,
        controller: userControllers.getAll
    },
    {
        path: '/user/create',
        requireAuth: true,
        validationSchema: null,
        controller: userControllers.create
    },
    {
        path: '/tag/get/popular',
        requireAuth: false,
        validationSchema: null,
        controller: tagControllers.getPopular
    },
    {
        path: '/tag/get/byPrefix',
        requireAuth: false,
        validationSchema: null,
        controller: tagControllers.getByPrefix
    },
    {
        path: '/image/create',
        requireAuth: true,
        validationSchema: null,
        controller: imageControllers.create
    },
    {
        path: '/vk-auth',
        requireAuth: false,
        validationSchema: null,
        controller: authControllers.vkAuth
    }
];

routes.forEach(route => {
    const middleware: Array<RequestHandler> = []
    if (route.validationSchema) {
        middleware.push(validate(route.validationSchema))
    }
    if (route.requireAuth) {
        middleware.push(validateJwt)
    }
    middleware.push(route.controller)
    router.post(route.path, ...middleware)
})

export default router