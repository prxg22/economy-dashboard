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
        default: false,
        select: false
    },
    deleted: {
        type: Boolean,
        default: false,
        // select: false
    },
    edited: {
        type: Boolean,
        default: false,
        // select: false
    }
}, {
    timestamps: true
})

IncomeSchema.index({ value: 1, desc: 1, "date.month": -1, "date.year": -1 }, { unique: true })

export const IncomeModel = mongoose.model('income', IncomeSchema)

const save = async (incomeData) => {
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
        throw e
    }

    return incomes
}

const findByYear = async (year) => {
    let incomes
    try {
        incomes = await IncomeModel.find({ 'date.year': year, isGlobal: false })
    } catch (e) {
        throw e
    }

    console.log(incomes)

    return incomes
}

const findByDate = async (year, month) => {
    let incomes
    try {
        incomes = await IncomeModel.find({ 'date.year': year, 'date.month': month, deleted: false, edited: false, isGlobal: false })
    } catch (e) {
        throw e
    }

    return incomes
}

const del = async (_id) => {
    let income

    try {
        income = await IncomeModel.findById({ _id, _deleted: false, _edited: false })
        if (!income) throw new Error(`Income id (${_id}) don't exist`)
    } catch(e) {
        throw e
    }
    try {
        income._deleted = true

        await income.save()
    } catch (e) {
        throw e
    }

    return income
}

const edit = async (_id, { value, desc, date }) => {
    try {
        var income = await IncomeModel.findById({ _id })
    } catch (e) {
        throw e
    }

    const newIncome = {
        value: value || income.value,
        desc: desc || income.desc,
        date: date || income.date,
    }

    income.edited = true

    try {
        await income.save()
        income = await save(newIncome)
    } catch (e) {
        throw e
    }

    return income
}

export default {
    save,
    del,
    all,
    edit,
    findByYear,
    findByDate
}
