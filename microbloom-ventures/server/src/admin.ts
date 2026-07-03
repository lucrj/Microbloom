import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";

AdminJS.registerAdapter({
  Database,
  Resource,
});

const prisma = new PrismaClient();

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
        model: getModelByName("Service"),
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
        model: getModelByName("BlogPost"),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName("Internship"),
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
        model: getModelByName("Enrollment"),
        client: prisma,
      },
    },
  ],
});

export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate: async (email, password) => {
      if (
        email === "admin@microbloom.com" &&
        password === "admin123"
      ) {
        return { email };
      }

      return null;
    },
    cookieName: "adminjs",
    cookiePassword: "supersecretcookiepassword",
  },
  null,
  {
    secret: "supersecretcookiepassword",
    resave: false,
    saveUninitialized: true,
  }
);

export default admin;