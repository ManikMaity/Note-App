export function customErrorResponse (err){
    return {
        success : false,
        message : err.message || "Internal Server Error",
        explanation : err.explanation || ["Something went wrong"],
        data : {}
    }
}

export function customSuccessResponse(message, data){
    return {
        success : true,
        message : message || "Success",
        data : data || {},
        error : {}
    }
}

