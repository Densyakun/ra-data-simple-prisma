import React, { ReactNode } from "react";
import {
  Admin,
  AdminProps,
  Resource,
} from "react-admin";
import { Prisma } from "@prisma/client";
import { GenerateList } from "./GenerateList";
import { GenerateCreate } from "./GenerateCreate";
import { GenerateEdit } from "./GenerateEdit";
import { GenerateShow } from "./GenerateShow";

export type PrismaAdminProps = {
  adminProps?: AdminProps;
  resources: ReactNode;
  otherChildren?: ReactNode;
  models?: undefined;
} | {
  adminProps?: AdminProps;
  resources?: undefined;
  otherChildren?: ReactNode;
  models: Prisma.DMMF.Datamodel["models"];
};

const PrismaAdmin = ({
  adminProps,
  resources,
  otherChildren,
  models
}: PrismaAdminProps) => (
  <Admin {...adminProps}>
    {otherChildren}
    {
      resources ||
      models && models.map(model =>
        model.fields[0].name === "id" && (
          <Resource
            key={model.name}
            name={model.name}
            list={<GenerateList model={model} />}
            create={<GenerateCreate model={model} />}
            edit={<GenerateEdit model={model} />}
            show={<GenerateShow model={model} />}
          />
        )
      )
    }
  </Admin>
);

export default PrismaAdmin;
