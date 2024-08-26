import AppError from "./AppError";

export default class Unauthorized extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}
