import { Router, Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";

const router = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided full name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Abishkar Karki
 *               email:
 *                 type: string
 *                 format: email
 *                 example: abishkar.karki@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd
 *             required:
 *               - fullName
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 act:
 *                   type: string
 *                   example: UserRegistration
 *                 message:
 *                   type: string
 *                   example: User Created Successfully !!!
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66d586912c70824dd5a14417
 *                     fullName:
 *                       type: string
 *                       example: Abishkar Karki
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: abishkar.karki@gmail.com
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-09-02T09:34:09.139Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-09-02T09:34:09.139Z
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Bad request, missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: All fields are required.
 *       409:
 *         description: Conflict, user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: User with this email already exists
 */

router.post("/register", registerUser);

router.get("/register", (req: Request, res: Response) => {
  res.render("register", {
    message: null,
    error: null,
  });
});

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user and returns a token if the credentials are valid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDU4NjkxMmM3MDgyNGRkNWExNDQxNyIsImlhdCI6MTcyNTI3MTEyNSwiZXhwIjoxNzI1Mjc0NzI1fQ.v5JHNQsfYgswSleE9dWQN8vjtfXAPy5Kpeqa1enPkDI
 *                 fullName:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: john.doe@example.com
 *       400:
 *         description: Bad request, email or password is missing
 *       401:
 *         description: Unauthorized, invalid email or password
 */

router.post("/login", loginUser);

router.get("/login", (req: Request, res: Response) => {
  res.render("login", {
    message: null,
    error: null,
  });
});

export default router;
