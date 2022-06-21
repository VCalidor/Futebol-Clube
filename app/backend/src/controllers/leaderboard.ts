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

    let matches = await MatchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] }
      ]
    });

    const leaderboard = teams.map((team) => {
      const teamPoints = {
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

      matches.forEach(({ homeTeamGoals, awayTeamGoals, teamHome, teamAway, inProgress }) => {
        if(teamHome.teamName === teamPoints.name && inProgress === false) {
          teamPoints.goalsFavor += homeTeamGoals;
          teamPoints.goalsOwn += awayTeamGoals;
          teamPoints.totalGames += 1;

          if(homeTeamGoals > awayTeamGoals) teamPoints.totalVictories += 1;
          else if(homeTeamGoals === awayTeamGoals) teamPoints.totalDraws += 1;
          else teamPoints.totalLosses += 1;
        } else if(teamAway.teamName === teamPoints.name) {
          teamPoints.goalsFavor += homeTeamGoals;
          teamPoints.goalsOwn += awayTeamGoals;
          teamPoints.totalGames += 1;

          if(homeTeamGoals > awayTeamGoals) teamPoints.totalVictories += 1;
          else if(homeTeamGoals === awayTeamGoals) teamPoints.totalDraws += 1;
          else teamPoints.totalLosses += 1;
        }
      })

      teamPoints.goalsBalance = teamPoints.goalsFavor - teamPoints.goalsOwn
      teamPoints.totalPoints += teamPoints.totalVictories * 3 + teamPoints.totalDraws;
      teamPoints.efficiency = teamPoints.totalPoints / (teamPoints.totalGames * 3) * 100;
      teamPoints.efficiency = Number(teamPoints.efficiency.toFixed(2));

      return teamPoints;
    })
    leaderboard.sort((a, b) => {
      if(a.totalPoints === b.totalPoints) {
        if(a.totalVictories === b.totalVictories) {
          if(a.goalsBalance === b.goalsBalance) {
            if(a.goalsFavor === b.goalsFavor) {
              return b.goalsOwn - a.goalsOwn;
            }
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });

    return res.status(200).json(leaderboard);
  };

  public getAllHome = async (_req: Request, res: Response) => {
    const teams = await TeamsModel.findAll({
      attributes: ['id',['team_name', 'teamName']]
    });

    let matches = await MatchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] }
      ]
    });

    const leaderboard = teams.map((team) => {
      const teamPoints = {
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

      matches.forEach(({ homeTeamGoals, awayTeamGoals, teamHome, inProgress }) => {
        if(teamHome.teamName === teamPoints.name && inProgress === false) {
          teamPoints.goalsFavor += homeTeamGoals;
          teamPoints.goalsOwn += awayTeamGoals;
          teamPoints.totalGames += 1;

          if(homeTeamGoals > awayTeamGoals) teamPoints.totalVictories += 1;
          else if(homeTeamGoals === awayTeamGoals) teamPoints.totalDraws += 1;
          else teamPoints.totalLosses += 1;
        }
      })

      teamPoints.goalsBalance = teamPoints.goalsFavor - teamPoints.goalsOwn
      teamPoints.totalPoints += teamPoints.totalVictories * 3 + teamPoints.totalDraws;
      teamPoints.efficiency = teamPoints.totalPoints / (teamPoints.totalGames * 3) * 100;
      teamPoints.efficiency = Number(teamPoints.efficiency.toFixed(2));

      return teamPoints;
    })
    leaderboard.sort((a, b) => {
      if(a.totalPoints === b.totalPoints) {
        if(a.totalVictories === b.totalVictories) {
          if(a.goalsBalance === b.goalsBalance) {
            if(a.goalsFavor === b.goalsFavor) {
              return b.goalsOwn - a.goalsOwn;
            }
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });

    return res.status(200).json(leaderboard);
  };

  public getAllAway = async (_req: Request, res: Response) => {
    const teams = await TeamsModel.findAll({
      attributes: ['id',['team_name', 'teamName']]
    });

    let matches = await MatchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] }
      ]
    });

    const leaderboard = teams.map((team) => {
      const teamPoints = {
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

      matches.forEach(({ homeTeamGoals, awayTeamGoals, teamAway }) => {
        if(teamAway.teamName === teamPoints.name) {
          teamPoints.goalsFavor += homeTeamGoals;
          teamPoints.goalsOwn += awayTeamGoals;
          teamPoints.totalGames += 1;

          if(homeTeamGoals > awayTeamGoals) teamPoints.totalVictories += 1;
          else if(homeTeamGoals === awayTeamGoals) teamPoints.totalDraws += 1;
          else teamPoints.totalLosses += 1;
        }
      })

      teamPoints.goalsBalance = teamPoints.goalsFavor - teamPoints.goalsOwn
      teamPoints.totalPoints += teamPoints.totalVictories * 3 + teamPoints.totalDraws;
      teamPoints.efficiency = Math.round(teamPoints.totalPoints / (teamPoints.totalGames * 3) * 100 * 100) / 100

      return teamPoints;
    })
    leaderboard.sort((a, b) => {
      if(a.totalPoints === b.totalPoints) {
        if(a.totalVictories === b.totalVictories) {
          if(a.goalsBalance === b.goalsBalance) {
            if(a.goalsFavor === b.goalsFavor) {
              return b.goalsOwn - a.goalsOwn;
            }
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });

    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;