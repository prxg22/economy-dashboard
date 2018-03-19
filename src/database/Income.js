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

DateSchema
    .virtual('toDate')
    .get(function () {
        return new Date(`${this.year}-${this.month || 1}-${this.day || 1}`);
    })

const IncomeSchema = mongoose.Schema({
    value: {
        type: Number,
        required: true,
        index: true,
    },
    desc: {
        type: String,
        required: true,
        index: true
    },
    date: {
        type: DateSchema,
        required: true,
        index: true
    },
    isGlobal: {
        type: Boolean,
        default: false
    },
    isPayed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

IncomeSchema.index({ value: 1, desc: 1, "date.month": -1, "date.year": -1 }, { unique: true })

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
