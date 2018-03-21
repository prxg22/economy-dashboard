export default (error, req, res, next) => {
    console.log(error)
    res.status(500).send(`${error.msg || error.code || error}`)
}
