import { Application, Request, Response } from 'express';
import sanitize from 'sanitize-html';
import JobRoleService from '../service/jobRoleService.js';
import JobRole from '../model/jobRole.js';
import JobRoleValidator from '../service/jobRoleValidator.js';
import logger from '../service/logger.js';
import Capability from '../model/capability.js';
import CapabilityService from '../service/capabilityService.js';
import CapabilityValidator from '../service/capabilityValidator.js';

export default class JobRoleController {
  private jobRoleService = new JobRoleService(new JobRoleValidator());

  private capabilityService = new CapabilityService(new CapabilityValidator());

  appRoutes(app: Application) {
    app.get('/admin/add-job-roles', async (req: Request, res: Response) => {
      let data: Capability[] = [];
      try {
        data = await this.capabilityService.getCapabilities();
      } catch (e) {
        console.error(e);
      }
      res.render('add-job-roles', {
        capabilities: data,
      });
    });

    app.post('/admin/add-job-roles', async (req: Request, res: Response) => {
      const data: JobRole = req.body;
      data.name = sanitize(data.name).trim();
      data.description = sanitize(data.description).trim();
      data.link = sanitize(data.link).trim();

      try {
        const newJobRole = await this.jobRoleService.createJobRole(data);
        res.redirect(`/job-roles/${newJobRole.id}`);
      } catch (e: any) {
        logger.warn(e.message);
        res.locals.errormessage = e.message;
        res.render('add-job-roles', req.body);
      }
    });
  }
}
