import AppError from "./AppError";

export default class NotFound extends AppError {

    constructor(message = 'Not Found') {
        super(message, 404);
    }
}
