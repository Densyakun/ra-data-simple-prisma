import React from "react";
import {
  TextField,
  Show,
  BooleanField,
  DateField,
  NumberField,
} from "react-admin";
import { Prisma } from "@prisma/client";
import { SimpleShowLayout } from "react-admin";
import { JsonField } from "react-admin-json-view";
import { FieldType } from "./types";

export const GenerateShow = ({ model }: { model: Prisma.DMMF.Model }) => {
  return (
    <Show>
      <SimpleShowLayout>
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
          // TODO object
          // TODO enum
        })}
      </SimpleShowLayout>
    </Show>
  );
};
