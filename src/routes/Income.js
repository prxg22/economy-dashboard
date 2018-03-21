import { Route } from 'express'

import { Income } from '../domains'

const create = async (req, res, next) => {
    if (!req.body.date ||
        !req.body.date.year ||
        !req.body.value ||
        !req.body.desc) return res.status(400).send()

    let income = {}

    try {
        income = await Income.create(req.body)
    } catch (e) {
        return next(e)
    }

    return res.send(income)
}

const all = async (req, res) => {
    let incomes = []

    try {
        incomes = await Income.all()
    } catch (e) {
        return next(e)
    }

    return res.send(incomes)
}

const byYear = async (req, res, next) => {
    if (!req.params.year) return res.status(400).send()

    let incomes = []

    try {
        incomes = await Income.getByYear(req.params.year)
    } catch (e) {
        return next(e)
    }

    return res.send(incomes)
}

const byDate = async (req, res, next) => {
    if (!req.params.year || !req.params.month) return res.status(400).send()

    let incomes = []

    try {
        incomes = await Income.getByDate(req.params.year, req.params.month)
    } catch (e) {
        return next(e)
    }

    return res.send(incomes)
}

const del = async (req, res, next) => {
    if (!req.params.id) return res.status(400).send()

    let response

    try {
        response = await Income.del(req.params.id)
    } catch (e) {
        return next(e)
    }

    return res.send(response)
}

const edit = async (req, res, next) => {
    const { date, desc, value } = req.body
    const { id } = req.params

    if ((!date && !desc && !value) || !id) return res.status(400).send()

    let response

    try {
        response = await Income.edit(id, { date, desc, value })
    } catch(e) {
        return next(e)
    }

    return res.send(response)
}

export default (router) => {
    router.route('/incomes')
        .get(all)
        .post(create)

    router.route('/incomes/:year')
        .get(byYear)

    router.route('/incomes/:year/:month')
        .get(byDate)

    router.route('/income/:id')
        .delete(del)
        .post(edit)

}
