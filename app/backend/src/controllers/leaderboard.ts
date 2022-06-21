import { Request, Response } from 'express';
import TeamsModel from '../database/models/team';
import MatchesModel from '../database/models/match';
// import TeamsInterface from '../interfaces/TeamsInterface';

class LeaderboardController {

  constructor() {} 

  public getAll = async (_req: Request, res: Response) => {
    const teams = await TeamsModel.findAll({
      attributes: ['id',['team_name', 'teamName']]
    });

    const matches = await MatchesModel.findAll();

    const leaderboard = teams.map((team) => {
      let teamPoints = {
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      }

      matches.forEach(({ homeTeamGoals, awayTeamGoals, homeTeam, awayTeam }) => {
        const teamHome = teams.find(({id}) => id === homeTeam);
        const teamAway = teams.find(({id}) => id === awayTeam);

        if(teamHome?.teamName === teamPoints.name) {
          teamPoints.goalsFavor += homeTeamGoals;
          teamPoints.goalsOwn += awayTeamGoals;
          teamPoints.totalGames += 1;

          if(homeTeamGoals > awayTeamGoals) teamPoints.totalVictories += 1;
          else if(homeTeamGoals === awayTeamGoals) teamPoints.totalDraws += 1;
          else teamPoints.totalLosses += 1;

        } 
        else if(teamAway?.teamName === teamPoints.name) {
          teamPoints.goalsFavor += awayTeamGoals;
          teamPoints.goalsOwn += homeTeamGoals;
          teamPoints.totalGames += 1;

          if(homeTeamGoals > awayTeamGoals) teamPoints.totalVictories += 1;
          else if(homeTeamGoals === awayTeamGoals) teamPoints.totalDraws += 1;
          else teamPoints.totalLosses += 1;
        }
      })

      teamPoints.totalPoints += teamPoints.totalVictories * 3 + teamPoints.totalDraws;
      teamPoints.efficiency = teamPoints.totalPoints / (teamPoints.totalGames * 3) * 100;
    })
    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;