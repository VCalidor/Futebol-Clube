import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class Match extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    primaryKey: true,
  },
  homeTeam: INTEGER,
  homeTeam_goals: INTEGER,
  awayTeam: INTEGER,
  awayTeam_goals: INTEGER,
  inProgress: BOOLEAN
}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
});

export default Match;
