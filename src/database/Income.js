import mongoose from 'mongoose'

const IncomeSchema = mongoose.Schema({
    value: Number,
    desc: String,
    date: {
        month: Number,
        year: Number
    },
    isGlobal: Boolean,
    isPayed: Boolean
})

export const IncomeModel = mongoose.model('income', IncomeSchema)

const saveIncome = async (incomeData) => {
    const income = new IncomeModel(incomeData)

    try {
        await income.save()
    } catch (e) {
        throw new Error(e)
        return
    }

    return income
}

const all = async () => {
    let incomes

    try {
        incomes = await IncomeModel.find()
    } catch (e) {
        throw new Error(e)
        return
    }

    return incomes
}

const findByYear = async (year) => {
    let incomes
    try {
        incomes = await IncomeModel.find({ 'date.year': year })
    } catch (e) {
        throw new Error(e)
        return
    }

    return incomes
}

export default {
    saveIncome,
    all,
    findByYear
}
