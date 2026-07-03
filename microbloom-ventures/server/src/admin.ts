import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource, getModelByName } from "@adminjs/prisma";

import prisma from "./lib/prisma";

AdminJS.registerAdapter({
  Database,
  Resource,
});

const admin = new AdminJS({
  rootPath: "/admin",
  resources: [
    {
      resource: {
        model: getModelByName("User"),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName("Course"),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName("Product"),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName("Service"),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName("BlogPost"),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName("Job"),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName("Internship"),
        client: prisma,
      },
    },
  ],
});

export const adminRouter = AdminJSExpress.buildRouter(admin);
export default admin;