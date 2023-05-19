const{gethotel,posthotel,puthotel,deletehotel} = require('../controller/hotelController')

const route = require('express').Router()
const auth = require('../midleware/auth')

route.get('/',gethotel)

route.post('/',auth,posthotel)

route.put('/:id',auth,puthotel)

route.delete('/:id',deletehotel)

module.exports = route