const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            return res.status(500).json({
                message: "catch error",
                error: error.message,
                status: 500
            })
        })
    }
}
export default asyncHandler