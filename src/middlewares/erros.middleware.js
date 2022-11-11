export const errorsMiddleware = function (err, req, res, next){
    if (err.name === "ValidationError")
        res.status(400).send();
    else 
        res.status(500).send();
}