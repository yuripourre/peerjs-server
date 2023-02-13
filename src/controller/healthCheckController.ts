import {Request, Response} from "express";

export class HealthCheckController {

    static index () {
        return async (req: Request, res: Response): Promise<Response> => {
            return res.status(200).send({
                message: 'Hello World!',
            });
        };
    }


}