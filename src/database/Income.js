import mongoose from 'mongoose'

const DateSchema = mongoose.Schema({
    day: {
        type: Number
    },
    month: {
        type: Number
    },
    year: {
        type: Number,
        required: true
    }
})

const IncomeSchema = mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    date: {
        type: DateSchema,
        required: true
    },
    isGlobal: {
        type: Boolean,
        default: false
    },
    isPayed: {
        type: Boolean,
        default: false
    }
})

IncomeSchema.index({ value: 1, desc: 1 }, { unique: true })

export const IncomeModel = mongoose.model('income', IncomeSchema)

const saveIncome = async (incomeData) => {
    const income = new IncomeModel(incomeData)
    try {
        await income.save()
    } catch (e) {
        throw e
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
