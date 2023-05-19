const Hotel = require('../modeles/hotel')

// gethotel

exports.gethotel = async (req, res) => {
    try {
        const data = await Hotel.find()
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// posthotel
exports.posthotel = async(req,res)=>{
    try {
        const data = await Hotel.create(req.body)
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// puthotel
exports.puthotel = async (req, res) => {
    try {
        const data = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// delethotel
exports.deletehotel = async (req, res) => {
    try {
        const data = await Hotel.findByIdAndDelete(req.params.id)
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}