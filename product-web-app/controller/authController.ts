import { Application, Request, Response } from 'express';

import Login from '../model/login.js';
import AuthService from '../service/authService.js';
import LoginValidator from '../service/loginValidator.js';
import LoginResponse from '../model/loginResponse.js';

const MILISECONDS_PER_HOUR = 3600000;

export default class AuthController {
  private authService = new AuthService(new LoginValidator());

  appRoutes(app: Application) {
    app.get('/auth/login', async (req: Request, res: Response) => {
      res.render('login');
    });

    app.post('/auth/login', async (req: Request, res: Response) => {
      const data: Login = req.body;
      try {
        const loginResponse: LoginResponse = await this.authService.login(data);
        const cookieOptions = {
          httpOnly: true,
          maxAge: MILISECONDS_PER_HOUR,
        };
        res.cookie('token', loginResponse.token, cookieOptions);
        res.cookie('admin',loginResponse.admin, cookieOptions);
        res.redirect('/');
      } catch (e: any) {
        res.locals.errormessage = e.message;
        res.render('login', req.body);
      }
    });
    app.get('/auth/logout', async (req: Request, res: Response) => {
      res.clearCookie('token');
      res.render('login');
    });
  }
}
