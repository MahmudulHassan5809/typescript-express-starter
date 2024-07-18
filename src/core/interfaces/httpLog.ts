export default interface IHTTPLoggerResponseData {
    request: IHTTPLoggerRequest;
    response: IHTTPLoggerResponse;
}

interface IHTTPLoggerRequest {
    // headers: unknown;
    host?: string;
    baseUrl: string;
    url: string;
    method: string;
    body: unknown;
    params: unknown;
    query: unknown;
    clientIp?: string | string[];
}

interface IHTTPLoggerResponse {
    // headers: unknown;
    statusCode: number;
    requestDuration: string;
    body: unknown;
}
