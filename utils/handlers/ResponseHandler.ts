/** --------------------------------------------------------------------------------------------------------------------
 * @file this file have only one class and that class only have one public method for send response to front
 * only usage is "need same shape for all response 2 front"
 */
import { Response } from "express";

/** --------------------------------------------------------------------------------------------------------------------
 * @description Interface for handling API responses
 * @interface
 */
export interface ResponseHandlerDto {
  send(params: SendResponseParams): void;
}

/** --------------------------------------------------------------------------------------------------------------------
 * @description Interface for the send method parameters
 * @interface
 */
export interface SendResponseParams {
  statusCode: number  ;
  httpCode  : number  ;
  response  : Response;
  result   ?: unknown ;
}

/** --------------------------------------------------------------------------------------------------------------------
 * @description only work is 2 return response 4 front in same shape
 * @implements  ResponseHandlerDto
 * @class       ResponseHandler
 */
class ResponseHandler implements ResponseHandlerDto {
  /** ------------------------------------------------------------------------------------------------------------------
   * @description local values validation
   * @private
   */
  // private statusCode: number;
  // private httpCode  : number;
  // private response  : Response;
  // private result    : unknown;

  /** ------------------------------------------------------------------------------------------------------------------
   * @description local Constructor function
   */
  // constructor(response: Response, httpCode: number, statusCode: number, result: unknown) {
  //   this.statusCode = statusCode;
  //   this.response   = response  ;
  //   this.httpCode   = httpCode  ;
  //   this.result     = result    ;
  // }

  /** ------------------------------------------------------------------------------------------------------------------
   * @description method for send response 2 front-end in same shape
   * @public
   * @method
   */
  public send({ response, httpCode, statusCode, result = {} }: SendResponseParams): void {
    response.status(httpCode).json({ CODE: statusCode, result });
  }
}

export default ResponseHandler;
