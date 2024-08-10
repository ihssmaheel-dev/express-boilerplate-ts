interface GenericResponseType<T> {
    status: boolean;
    message?: string;
    timestamp: number;
    data?: T;
    errors: { [key: string]: string };
}

class GenericResponse {
    static createResponse<T>(
        status: boolean,
        message: string = '',
        data?: T,
        errors: { [key: string]: string } = {}
    ): GenericResponseType<T> {
        return {
            status,
            message,
            timestamp: Date.now(),
            data,
            errors,
        };
    }
}

export const SuccessResponse = <T>(dataOrMessage?: T | string, message: string = 'Response Success'): GenericResponseType<T> => {
    if (typeof dataOrMessage === 'string') {
        return GenericResponse.createResponse<T>(true, dataOrMessage, undefined as any);
    }
    return GenericResponse.createResponse(true, message || 'Response Success', dataOrMessage);
};

export const ErrorResponse = <T>(message: string, errors: { [key: string]: string } = {}): GenericResponseType<T> => {
    return GenericResponse.createResponse<T>(false, message, undefined, errors);
};

export default GenericResponse;
