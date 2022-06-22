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
          { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
          { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] }
        ]
      });
    } 
    if(inProgress === 'true') {
      matches = await MatchesModel.findAll({
        where: { inProgress: true},
        include: [
          { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
          { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] }
        ]
      });
    }
    if(inProgress === 'false') {
      matches = await MatchesModel.findAll({
        where: { inProgress: false},
        include: [
          { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
          { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] }
        ]
      });
    }

    return res.status(200).json(matches);
  };


  public create = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    if(homeTeam === awayTeam) {
      return res
      .status(401)
      .json({ message: "It is not possible to create a match with two equal teams" });
    }
  
    const homeTeamExists = await TeamsModel.findByPk(homeTeam);
    const awayTeamExists = await TeamsModel.findByPk(awayTeam);

    if(homeTeamExists === null || awayTeamExists === null) {
      return res.status(404).json({ message: "There is no team with such id!" });
    }

    const newMatch = await MatchesModel.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    })

    return res.status(201).json(newMatch);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await MatchesModel.findByPk(id);
    if(team === null) {
      return res.status(404).json({ message: 'There is no match with such id!' });
    }

    await MatchesModel.update({ inProgress: 'false' }, { where: { id } })

    return res.status(200).json({ message: 'Finished' });
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const match = await MatchesModel.findByPk(id);
    if(match === null) {
      return res.status(404).json({ message: "There is no match with such id!" });
    }

    await MatchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } })

    return res.status(200).json({ message: 'Morena Tropicana' });
  };
}

export default MatchesController;