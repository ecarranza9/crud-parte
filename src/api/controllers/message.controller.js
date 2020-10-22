async function MessageHandler(res,obj = {}, message = "", state = 200 ){
    return res.status(state).json({
        message:message,
        data:obj
    })
}

module.exports = {
    MessageHandler
}