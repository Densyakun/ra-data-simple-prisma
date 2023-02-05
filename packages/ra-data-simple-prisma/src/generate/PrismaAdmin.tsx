import React, { ReactNode } from "react";
import {
  Admin,
  AdminProps,
  Resource,
} from "react-admin";
import { Prisma } from "@prisma/client";
import { GenerateList } from "./GenerateList";
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
      resources
      || models.map(model =>
        model.fields[0].name === "id" && (
          <Resource
            key={model.name}
            name={model.name}
            list={<GenerateList model={model as any} />}
            edit={<GenerateEdit model={model as any} />}
            show={<GenerateShow model={model as any} />}
          />
        )
      )
    }
  </Admin>
);

export default PrismaAdmin;
