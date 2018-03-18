import db from '../database'
const create = async ({ value, date, desc, isPayed, isGlobal }) => {
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
        income = await db.Income.saveIncome({ value, date, desc, isPayed, isGlobal })
    } catch (e) {
        console.error(e)
        throw new Error(e)
    }

    return income
}

const all = async () => {
    let incomes

    try {
        incomes = await db.Income.all()
    } catch (e) {
        console.error(e)
        throw new Error(e)
    }

    return incomes
}

const getGlobals = async (year) => {
    if (year > (new Date()).getFullYear()) throw new Error(`year must be less than ${new Date().getFullYear()}`)

    let incomes

    try {
        incomes = await db.Income.findByYear(year)
    } catch (e) {
        console.error(e)
        throw new Error(e)
    }

    return incomes
}

export default { create, all, getGlobals }
