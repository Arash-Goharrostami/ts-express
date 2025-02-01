import { Request, Response, NextFunction } from "express";

/** --------------------------------------------------------------------------------------------------------------------
 * A higher-order function that wraps an asynchronous middleware function and ensures that any errors
 * are passed to the next error-handling middleware in the Express application.
 *
 * @param fn - The asynchronous middleware function to be wrapped.
 * This function should accept the standard Express `Request`, `Response`, and `NextFunction` parameters,
 * and can either return a `Promise` or be synchronous.
 *
 * @returns A middleware function that invokes the provided `fn` and catches any errors, forwarding them to the next middleware.
 *
 * @example
 * ```ts
 * router.get('/route', use(async (request, response, next) => {
 *   const data = await fetchData();
 *   response.json(data);
 * }));
 * ```
 */
const use = (fn: (request: Request, response: Response, next: NextFunction) => Promise<void> | void) =>
  (request: Request, response: Response, next: NextFunction): void => {
    Promise.resolve(fn(request, response, next)).catch(next);
  };

export default use;
