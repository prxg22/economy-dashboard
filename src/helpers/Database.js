import mongoose from 'mongoose'

class Database {
    connect = async () => {
        mongoose.Promise =  global.Promise

        if (this.db) return resolve(this.db)

        // Database connection
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017')
        } catch(e) {
            console.error(e)
            return exit(-1)
        }

        this.connection = mongoose.connection
        console.log('> database connection succeed!')
    }
}

export default Database
