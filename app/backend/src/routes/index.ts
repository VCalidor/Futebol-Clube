import { Application as App } from 'express';

const Routes = (app: App) => {
  app.get('/', (req, res) => res.status(200).json('dili dole'))
  // app.use() Outras rotas
}

export default Routes;