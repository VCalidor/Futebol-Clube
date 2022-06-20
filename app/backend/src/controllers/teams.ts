import { Request, Response } from 'express';
import TeamsModel from '../database/models/team';
// import TeamsInterface from '../interfaces/TeamsInterface';

class TeamsController {

  constructor() {} 

  public getAll = async (_req: Request, res: Response) => {
    const teams = await TeamsModel.findAll({
      attributes: ['id',['team_name', 'teamName']]
    }) ;

    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const team = await TeamsModel.findByPk(id);

    if(team) return res.status(200).json({id: team.id , teamName: team.team_name });

    return res.status(404).json({ message: 'There is no team with such id!' });
  };
}

export default TeamsController;