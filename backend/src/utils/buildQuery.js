export const buildQuery = (reqBody) => {
    const { keyword, type, isFavorite } = reqBody;

    let query = {};

    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: "i" } },
            { content: { $regex: keyword, $options: "i" } },
            { transcribedText: { $regex: keyword, $options: "i" } }
        ];
    }

    if (type) {
        if (type === "transcript") {
            query.type = "transcript";
        }
        if (type === "note") {
            query.type = "note";
        }
    }
    if (isFavorite) {
        query.isFavorite = true;
    } 

    return query;
};