import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";

AdminJS.registerAdapter({
  Database,
  Resource,
});

const prisma = new PrismaClient();

const parseLines = (value: unknown) => {
  if (typeof value !== "string") return value;

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
};

const admin = new AdminJS({
  rootPath: "/admin",

  resources: [
    {
      resource: {
        model: getModelByName("Course"),
        client: prisma,
      },

      options: {
        properties: {
          description: {
            type: "textarea",
          },

          eligibility: {
            type: "textarea",
          },

          curriculum: {
            type: "textarea",
          },
        },

        actions: {
          new: {
            before: async (request : any) => {
              if (request.payload) {
                request.payload.curriculum = parseLines(
                  request.payload.curriculum
                );
              }

              return request;
            },
          },

          edit: {
            before: async (request : any) => {
              if (request.payload) {
                request.payload.curriculum = parseLines(
                  request.payload.curriculum
                );
              }

              return request;
            },

            after: async (response : any) => {
              if (
                response.record?.params.curriculum &&
                Array.isArray(response.record.params.curriculum)
              ) {
                response.record.params.curriculum =
                  response.record.params.curriculum.join("\n");
              }

              return response;
            },
          },

          show: {
            after: async (response : any) => {
              if (
                response.record?.params.curriculum &&
                Array.isArray(response.record.params.curriculum)
              ) {
                response.record.params.curriculum =
                  response.record.params.curriculum.join("\n");
              }

              return response;
            },
          },
        },
      },
    },

    {
      resource: {
        model: getModelByName("User"),
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

export const adminRouter = AdminJSExpress.buildRouter(admin);

export default admin;