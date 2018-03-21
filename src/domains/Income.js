import db from '../database'
const create = async ({ value, date, desc, isGlobal }) => {
    // Check value errors
    if (value <= 0) throw new Error('value must be greater than 0')

    // Check global errors
    if (!isGlobal && !date.month) throw new Error('month is required for no global incomes')
    if (!isGlobal && isPayed) isHappening = false // eslint-disable-line

    // Check date errors
    if (date.month < 1 || date.month > 12) throw new Error('month must be between 0 and 12')
    if (date.year > (new Date()).getFullYear()) throw new Error(`year must be less than ${new Date().getFullYear()}`)

    // try to save income
    let income
    try {
        income = await db.Income.saveIncome({ value, date, desc, isGlobal })
    } catch (e) {
        console.error(e)
        throw e
    }

    return income
}

const all = async () => {
    let incomes

    try {
        incomes = await db.Income.all()
    } catch (e) {
        throw e
    }

    return incomes
}

const getByYear = async (year) => {
    if (year > (new Date()).getFullYear()) throw new Error(`year must be less than ${new Date().getFullYear()}`)

    let incomes

    try {
        incomes = await db.Income.findByYear(year)
    } catch (e) {
        throw e
    }

    return incomes
}

const getByDate = async (year, month) => {
    if (year > (new Date()).getFullYear()) throw new Error(`year must be less than ${new Date().getFullYear()}`)
    if (month <= 0 || month >= 12) throw new Error(`month must be between 0 and 12`)

    let incomes

    try {
        incomes = await db.Income.findByDate(year, month)
    } catch (e) {
        throw e
    }

    return incomes
}

const del = async (year, month) => {
    if (year > (new Date()).getFullYear()) throw new Error(`year must be less than ${new Date().getFullYear()}`)
    if (month <= 0 || month >= 12) throw new Error(`month must be between 0 and 12`)

    let response
    try {
        response = await db.Income.del(year, month)
    } catch (e) {
        throw e
    }

    return response
}

const edit = async (id, { value, desc, date }) => {
    // Check value errors
    if (value <= 0) throw new Error('value must be greater than 0')

    // Check date errors
    if ((date && date.month) && (date.month < 1 || date.month > 12)) throw new Error('month must be between 0 and 12')
    if (date && (date.year > (new Date()).getFullYear())) throw new Error(`year must be less than ${new Date().getFullYear()}`)

    let response
    try {
        response = await db.Income.edit(id, { value, desc, date })
    } catch(e) {
        throw e
    }

    return response
}


export default {
    create,
    del,
    all,
    edit,
    getByYear,
    getByDate
}
