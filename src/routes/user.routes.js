import { Router } from "express"
const router = Router()
import {loginUser, logoutUser, registerUser} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"
router.route("/register")
.post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)
route.route("/logout").post(
    verifyJwt,
    logoutUser
)
export default router