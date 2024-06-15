interface GenericResponseType<T> {
    status: boolean;
    message?: string;
    timestamp: number;
    data?: T;
    errors: { [key: string]: string };
}

class GenericResponse {
    static createGenericResponse<T>(status: boolean, message?: string, data?: T, errors: { [key: string]: string } = {}): GenericResponseType<T> {
        return {
            status,
            message,
            timestamp: Date.now(),
            data,
            errors,
        };
    }
    static success<T>(message: string): GenericResponseType<T> {
        return GenericResponse.createGenericResponse<T>(true, message);
    }

    static successWithData<T>(data: T): GenericResponseType<T> {
        return GenericResponse.createGenericResponse<T>(true, "Response Success", data);
    }

    static successWithDataMsg<T>(data: T, message: string): GenericResponseType<T> {
        return GenericResponse.createGenericResponse<T>(true, message, data);
    }

    static error<T>(message: string): GenericResponseType<T> {
        return GenericResponse.createGenericResponse<T>(false, message);
    }

    static fieldError<T>(message: string, errors: { [key: string]: string }): GenericResponseType<T> {
        return GenericResponse.createGenericResponse<T>(false, message, undefined, errors);
    }
}

export default GenericResponse;
