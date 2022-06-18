import { Request, Response } from 'express';
import MatchesModel from '../database/models/match';
// import TeamsInterface from '../interfaces/TeamsInterface';

class MatchesController {
  constructor() {}

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await MatchesModel.findAll();
    return res.status(200).json(matches);
  };
}

export default MatchesController;