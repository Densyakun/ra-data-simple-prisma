import {
  CustomRoutes,
  Resource,
} from "react-admin";
import { PrismaAdmin, GenerateList, GenerateEdit, GenerateShow } from "ra-data-simple-prisma";
import { PostCreate, PostEdit, PostList } from "./resources/Post";
import { TagCreate, TagList } from "./resources/Tag";
import { AdminCreate, AdminList, AdminShow } from "./resources/Admin";
import { useSession } from "next-auth/react";
import { Route } from "react-router";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
import LoginPage from "./custom-pages/LoginPage";
import InfoPage from "./custom-pages/InfoPage";
import {
  CategoryList,
  CategoryCreate,
  CategoryEdit,
} from "./resources/Category";
import { AuditList } from "./resources/Audit";
import { models } from "./generate/models";

const ReactAdmin = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>loading</p>;

  return (
    <PrismaAdmin
      adminProps={{
        authProvider: authProvider(session),
        dataProvider: dataProvider,
        disableTelemetry: true,
        loginPage: LoginPage,
      }}
      otherChildren={
        <CustomRoutes>
          <Route path="/info" element={<InfoPage />} />
        </CustomRoutes>
      }
      resources={<>
        {models.map(model =>
          model.fields[0].name === "id" && (
            <Resource
              key={model.name}
              name={model.name}
              list={<GenerateList model={model as any} />}
              edit={<GenerateEdit model={model as any} />}
              show={<GenerateShow model={model as any} />}
            />
          )
        )}
        <Resource
          name="post"
          list={PostList}
          create={PostCreate}
          edit={PostEdit}
        />
        <Resource name="tag" list={TagList} create={TagCreate} />
        <Resource
          name="admin"
          list={AdminList}
          create={AdminCreate}
          show={AdminShow}
        />
        <Resource
          name="category"
          list={CategoryList}
          create={CategoryCreate}
          edit={CategoryEdit}
        />
        <Resource name="audit" list={AuditList} />
      </>}
    />
  );
};

export default ReactAdmin;
