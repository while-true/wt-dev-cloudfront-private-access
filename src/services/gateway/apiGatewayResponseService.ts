import { APIGatewayProxyResult } from "aws-lambda";

export interface ApiGatewayResponseService {
  createSuccessResponse(
    data: string | unknown,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult;
  createErrorResponse(
    data: string | unknown,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult;
  createBadRequestResponse(
    data: string | unknown,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult;
  createNotFoundResponse(
    data: string | unknown,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult;
  createUnauthorizedResponse(
    data: string | unknown,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult;
}

interface ApiGatewayResponseServiceConfig {
  enableCors?: boolean;
}

export class ApiGatewayResponseServiceImpl implements ApiGatewayResponseService {
  private defaultHeaders: Record<string, boolean | number | string>;

  constructor(private config: ApiGatewayResponseServiceConfig = { enableCors: false }) {
    this.config.enableCors
      ? (this.defaultHeaders = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
        })
      : (this.defaultHeaders = {});
  }

  createSuccessResponse(
    data: string | unknown,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { ...this.defaultHeaders, ...headers },
    };
  }

  createSuccesfullyUpdatedResponse(
    data: string | unknown,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult {
    return {
      statusCode: 204,
      body: JSON.stringify(data),
      headers: { ...this.defaultHeaders, ...headers },
    };
  }

  createErrorResponse(
    data: string | unknown,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult {
    return {
      statusCode: 500,
      body: JSON.stringify(data),
      headers: { ...this.defaultHeaders, ...headers },
    };
  }

  createBadRequestResponse(
    data: string | unknown,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult {
    return {
      statusCode: 400,
      body: JSON.stringify(data),
      headers: { ...this.defaultHeaders, ...headers },
    };
  }

  createNotFoundResponse(
    data: string | unknown,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult {
    return {
      statusCode: 404,
      body: JSON.stringify(data),
      headers: { ...this.defaultHeaders, ...headers },
    };
  }

  createUnauthorizedResponse(
    data: string | unknown,
    headers?: Record<string, boolean | number | string>
  ): APIGatewayProxyResult {
    return {
      statusCode: 401,
      body: JSON.stringify(data),
      headers: { ...this.defaultHeaders, ...headers },
    };
  }

  createRedirectResponse(location: string): APIGatewayProxyResult {
    return {
      statusCode: 301,
      headers: {
        Location: location,
      },
      body: "",
    };
  }
}

export const apiGatewayResponseServiceWithCors = new ApiGatewayResponseServiceImpl({ enableCors: true });
