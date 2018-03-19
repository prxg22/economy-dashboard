import { Route } from 'express'

import { Income } from '../domains'

const create = async (req, res) => {
    if (!req.body.date ||
        !req.body.date.year ||
        !req.body.value ||
        !req.body.desc) return res.status(400).send()

    let income = {}

    try {
        income = await Income.create(req.body)
    } catch (e) {
        console.error(e);
        return res.status(500).send({ error: e })
    }

    return res.send(income)
}

const all = async (req, res) => {
    let incomes = []

    try {
        incomes = await Income.all()
    } catch (e) {
        console.error(e);
        return res.status(500).send({ error: e.msg })
    }

    return res.send(incomes)
}

const globals = async (req, res) => {
    if (!req.params.year) return res.status(400).send()

    let incomes = []

    try {
        incomes = await Income.getGlobals(req.params.year)
    } catch (e) {
        console.error(e);
        return res.status(500).send({ error: e.msg })
    }

    return res.send(incomes)

}

export default (router) => {
    router.route('/income')
        .get(all)
        .post(create)

    router.route('/income/:year')
        .get(globals)
}
