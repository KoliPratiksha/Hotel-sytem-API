const User = require('../modeles/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// getuser
exports.getuser = async (req, res) => {
    try {
        const data = await User.find()
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// register
exports.register = async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) return res.status(400).json({ errors: true, message: "User is already exist" })

        const salt = await bcrypt.genSalt()
        req.body.password = await bcrypt.hash(req.body.password, salt)

        const data = await User.create(req.body)
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// login
exports.login = async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (!userExist) return res.status(400).json({ errors: true, message: "email or password is not exist" })

        const verifyPassword = await bcrypt.compare(req.body.password, userExist.password)
        if (!verifyPassword) return res.status(400).json({ errors: true, message: "email or password is not exist" })

        const token = await jwt.sign({ id: userExist._id }, process.env.SEC)
        return res.json({ errors: false, data: { token: token, user: userExist } })


    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// putuser
exports.putuser = async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// deletuser
exports.deleteuser = async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id)
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}