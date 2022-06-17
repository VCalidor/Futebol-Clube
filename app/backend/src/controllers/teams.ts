import { Request, Response } from 'express';
import TeamsModel from '../database/models/team';
// import TeamsInterface from '../interfaces/TeamsInterface';

class TeamsController {

  constructor() {}

  public getAll = async (_req: Request, res: Response) => {
    const teams = await TeamsModel.findAll() ;
    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const team = await TeamsModel.findByPk(id);

    if(!team) return res.status(400).json({message: 'Time não existente'})

    return res.status(200).json(team);
  };
}

export default TeamsController;