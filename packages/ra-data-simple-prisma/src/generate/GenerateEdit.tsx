import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  DateInput,
  NumberInput,
  AutocompleteInput,
  ReferenceInput,
  AutocompleteArrayInput,
  ReferenceArrayInput,
} from "react-admin";
import { Prisma } from "@prisma/client";
import { JsonInput } from "react-admin-json-view";
import { FieldType } from "./types";

export const GenerateEdit = ({ model }: { model: Prisma.DMMF.Model }) => {
  return (
    <Edit>
      <SimpleForm>
        {model.fields.map((field) => {
          if (field.isReadOnly || field.isUpdatedAt) {
            return;
          }

          const type = field.type as FieldType;

          if (type === "String") {
            return <TextInput key={field.name} source={field.name} />;
          }
          if (type === "Boolean") {
            return <BooleanInput key={field.name} source={field.name} />;
          }
          if (type === "Int") {
            return <NumberInput key={field.name} source={field.name} />;
          }
          // TODO BigInt
          // TODO Float
          // TODO Decimal
          if (type === "DateTime") {
            return <DateInput key={field.name} source={field.name} />;
          }
          if (type === "JSON") {
            return <JsonInput key={field.name} source={field.name} />;
          }
          // TODO Bytes
          // TODO Unsupported
          if (field.kind === "object") {
            if (field.relationFromFields?.[0]) {
              return (
                <ReferenceInput
                  key={field.name}
                  source={field.relationFromFields[0]}
                  reference={field.type}
                >
                  <AutocompleteInput optionText="name" />
                </ReferenceInput>
              );
            }
            return (
              <ReferenceArrayInput key={field.name} source={field.name} reference={field.type}>
                <AutocompleteArrayInput />
              </ReferenceArrayInput>
            );
          }
          // TODO enum

          return (
            <React.Fragment key={field.name}>
              Unknown {field.name} {type}
            </React.Fragment>
          );
        })}
      </SimpleForm>
    </Edit>
  );
};
