import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class Match extends Model {
  homeTeam: number;
  homeTeam_goals: number;
  awayTeam: number;
  awayTeam_goals: number;
  inProgress: boolean;
}

Match.init({
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
