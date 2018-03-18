import Income from './Income'
import { Router } from 'express'

const router = new Router()

router.route('/income')
    .get(Income.all)
    .post(Income.create)

router.route('/income/:year')
    .get(Income.globals)

export default router
