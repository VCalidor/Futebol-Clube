import { Request, Response } from 'express';
import MatchesModel from '../database/models/match';
import TeamsModel from '../database/models/team'
// import TeamsInterface from '../interfaces/TeamsInterface';

class MatchesController {
  constructor() {}

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    let matches;
    if(inProgress === undefined) {
      matches = await MatchesModel.findAll({
        include: [
          { model: TeamsModel, as: 'teamHome', attributes: ['team_name'] },
          { model: TeamsModel, as: 'teamAway', attributes: ['team_name'] }
        ]
      });
    } 
    if(inProgress === 'true') {
      matches = await MatchesModel.findAll({
        where: { inProgress: true},
        include: [
          { model: TeamsModel, as: 'teamHome', attributes: ['team_name'] },
          { model: TeamsModel, as: 'teamAway', attributes: ['team_name'] }
        ]
      });
    }
    if(inProgress === 'false') {
      matches = await MatchesModel.findAll({
        where: { inProgress: false},
        include: [
          { model: TeamsModel, as: 'teamHome', attributes: ['team_name'] },
          { model: TeamsModel, as: 'teamAway', attributes: ['team_name'] }
        ]
      });
    }

    return res.status(200).json(matches);
  };
}

export default MatchesController;