/* eslint global-require: "off" */

import fs from 'fs';
import path from 'path';
import koaRouter from 'koa-router';
import Home from '../controllers/home';
import GitHub from '../controllers/github';
import Resume from '../controllers/resume';
import user from '../controllers/helper/user';
import analyse from '../controllers/helper/analyse';
import share from '../controllers/helper/share';
import resume from '../controllers/helper/resume';

const router = koaRouter();
const basename = path.basename(module.filename);

fs.readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) && (file.split('.').slice(-1)[0] ===  'js') && (file !== basename)
  )
  .forEach((file) => {
    const route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
  });

router.get(
  '/',
  user.checkNotLogin(),
  Home.landingPage
);
router.get('/404', Home.handle404);
router.get(
  '/initial',
  user.checkIfLogin(),
  Home.initial
);
router.get(
  '/statistic',
  Home.statistic
);
router.get(
  '/languages',
  Home.languages
);
router.get(
  '/:login',
  user.checkValidateUser(),
  Home.dashboard
);
router.get(
  '/:login/github',
  share.githubEnable(),
  analyse.github(),
  GitHub.githubPage
);
router.get(
  '/:login/resume',
  resume.checkValidateByLogin('params.login'),
  analyse.resume('query.hash'),
  Resume.resumePage
);
router.get(
  '/:login/:dashboardRoute',
  user.checkValidateUser(),
  user.checkValidateDashboard(),
  Home.dashboard
);

export default router;
