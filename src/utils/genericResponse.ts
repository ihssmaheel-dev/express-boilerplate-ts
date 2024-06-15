interface GenericResponse<T> {
    status: boolean;
    message?: string;
    timestamp: number;
    data?: T;
    errors: { [key: string]: string };
}

function createGenericResponse<T>(status: boolean, message?: string, data?: T, errors: { [key: string]: string } = {}): GenericResponse<T> {
    return {
        status,
        message,
        timestamp: Date.now(),
        data,
        errors,
    };
}

function successResponse<T>(message: string): GenericResponse<T> {
    return createGenericResponse<T>(true, message);
}

function successResponseWithData<T>(data: T): GenericResponse<T> {
    return createGenericResponse<T>(true, "Response Success", data);
}

function errorResponse<T>(message: string): GenericResponse<T> {
    return createGenericResponse<T>(false, message);
}

function fieldErrorResponse<T>(message: string, errors: { [key: string]: string }): GenericResponse<T> {
    return createGenericResponse<T>(false, message, undefined, errors);
}

export {
    GenericResponse,
    createGenericResponse,
    successResponse,
    successResponseWithData,
    errorResponse,
    fieldErrorResponse,
};
