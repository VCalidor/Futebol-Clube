import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class Match extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: {
    teamName: string;
  }
  teamAway: {
    teamName: string;
  }
}

Match.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: BOOLEAN
}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
});

export default Match;
