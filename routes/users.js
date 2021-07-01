const express = require("express")
const router = express.Router()
const { nanoid } = require('nanoid')
const idLength = 8

let users = [
    { id: "ytSDc_pM", name: "usman", email: "usman@gmail.com" },
    { id: "ytSgc_pM", name: "farooq", email: "usman1@gmail.com" },
    { id: "ytsWc_pM", name: "ehsan", email: "usman2@gmail.com" },
    { id: "ytSDc_PM", name: "ali", email: "usman3@gmail.com" },
    { id: "ytSFc_VM", name: "hamza", email: "usman4@gmail.com" },
]

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The User Name
 *         email:
 *           type: string
 *           description: The User Email
 *       example:
 *         id: d5fE_asz
 *         name: Usman Bakhsh
 *         email: ehmusman@gmail.com
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The User Managing API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/", (req, res) => {
    res.status(200).send(users)
})

// get a single user
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The User was not found
 */

router.get("/:id", (req, res) => {
    const user = users.find(user => user.id === req.params.id)
    if (!user) return res.status(404).send("The User Was not found")

    res.status(200).send(user)
})

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
    const { name, email } = req.body

    try {
        const user = {
            id: nanoid(idLength),
            name, email
        }
        users.push(user)

        res.status(200).send("The User Was Successfully created")
    } catch (error) {
        res.status(500).send("Some Server Error")
    }
})

// update a user
/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
    const { id: userId } = req.params
    const { name, email } = req.body
    console.log(userId, name, email)
    try {
        let index = users.findIndex(user => user.id === userId)
        if (index === -1) return res.status(400).send("The User was not found")
        users[index].name = name;
        users[index].email = email;
        res.status(200).send({
            description: "The User Was Updated",
            content: users[index]
        })
    } catch (error) {
        res.status(500).send("Some error happened")
    }
})


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

router.delete("/:id", (req, res) => {
    const { id: userId } = req.params
    const index = users.findIndex(user => user.id === userId)
    if (index === -1) return res.status(400).send("The User Was Not Found")
    users = users.splice(index, 1)
    res.status(200).send("The User Was Deleted")
})
module.exports = router