import { Request, Response } from 'express';
import TeamsModel from '../database/models/team';

class ProductController {

  constructor() {}

  public getAll = async (_req: Request, res: Response) => {
    const teams = await TeamsModel.findAll();
    return res.status(200).json(teams);
  };
}

export default ProductController;