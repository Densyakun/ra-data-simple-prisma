import React from "react";
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  NumberField,
  ReferenceField,
} from "react-admin";
import { Prisma } from "@prisma/client";
import { JsonField } from "react-admin-json-view";
import { FieldType } from "./types";
//import { ShowModelFields } from "./ShowField";

export const GenerateList = ({ model }: { model: Prisma.DMMF.Model }) => {
  return (
    <List>
      <Datagrid rowClick={"show"}>
        {/* <ShowModelFields model={model} /> */}
        {model.fields.map((field) => {
          if (field.isReadOnly) {
            return;
          }

          const type = field.type as FieldType;

          if (type === "String") {
            return <TextField key={field.name} source={field.name} />;
          }
          if (type === "Boolean") {
            return <BooleanField key={field.name} source={field.name} />;
          }
          if (type === "Int") {
            return <NumberField key={field.name} source={field.name} />;
          }
          // TODO BigInt
          // TODO Float
          // TODO Decimal
          if (type === "DateTime") {
            return <DateField key={field.name} source={field.name} />;
          }
          if (type === "JSON") {
            return <JsonField key={field.name} source={field.name} />;
          }
          // TODO Bytes
          // TODO Unsupported
          if (field.kind === "object") {
            if (field.relationFromFields?.[0]) {
              return (
                <ReferenceField
                  key={field.name}
                  source={field.relationFromFields[0]}
                  reference={field.type}
                >
                  <TextField source="name" />
                </ReferenceField>
              );
            }
            return (
              <ReferenceField key={field.name} source={field.name} reference={field.type}>
                <TextField />
              </ReferenceField>
            );
          }
          // TODO enum
        })}
      </Datagrid>
    </List>
  );
};
