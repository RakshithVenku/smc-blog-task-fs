const express = require('express')
const router = express.Router()

const EmployeeController = require('../app/controllers/EmployeeController')
const upload = require('../app/middleware/upload')
const authenticate = require('../app/middleware/authenticate')

router.get('/', authenticate, EmployeeController.index)
router.post('/show', EmployeeController.show)
router.post('/store', upload.array('avatar[]'), EmployeeController.store)
router.post('/update', EmployeeController.update)
router.post('/delete', EmployeeController.destroy)

module.exports = router