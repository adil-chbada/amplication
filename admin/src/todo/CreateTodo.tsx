import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Todo } from "../api/todo/Todo";
import { TodoCreateInput } from "../api/todo/TodoCreateInput";

const INITIAL_VALUES = {} as TodoCreateInput;

export const CreateTodo = (): React.ReactElement => {
  useBreadcrumbs("/todos/new", "Create todo");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Todo,
    AxiosError,
    TodoCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/todos", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/todos"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TodoCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create todo"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        ></Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
