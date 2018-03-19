export default (error, req, res, next) => {
    res.status(500).send(`${error.msg || error.code || error}`)
}
