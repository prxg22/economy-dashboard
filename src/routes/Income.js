import { Router } from 'express'

import { Income } from '../domains'

const router = new Router('income')

const create = (req, res, next) => {
    Income.create(req.body)
    res.send()
}
router.post('/', create)

export default router
