import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "./Button";
import { Input } from "./Input";

import * as Form from "./Form";
import * as useFormId from "./use-form-id";
import { FieldProvider } from "./FieldContext";

type Inputs = {
  firstname: string;
  email: string;
  title:
    | "Mx"
    | "Mr"
    | "Ms"
    | "Mrs"
    | "Dr"
    | "Successor of the Prince of the Apostles";
  terms: false | ("one" | "two" | "three")[];
};

export function ExampleForm() {
  const createID = useFormId.useFormId();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log(errors, getValues());
  return (
    <Form.Root layout="column" onSubmit={handleSubmit(onSubmit)}>
      <Form.Field>
        <Form.Label
          htmlFor={createID("firstname", "control")}
          id={createID("firstname", "label")}
        >
          First name
        </Form.Label>
        <Form.Control>
          <Input
            id={createID("firstname", "control")}
            {...register("firstname", {
              required: true,
            })}
            aria-invalid={errors.firstname ? "true" : "false"}
            aria-describedby={
              errors.firstname ? createID("firstname", "errors") : undefined
            }
          />
        </Form.Control>
        {errors.firstname && (
          <Form.Error id={createID("firstname", "errors")}>
            First name is required.
          </Form.Error>
        )}
      </Form.Field>
      <Form.Field>
        <Form.Label
          htmlFor={createID("email", "control")}
          id={createID("email", "label")}
        >
          Email Address
        </Form.Label>
        <Form.Control>
          <Input
            id={createID("email", "control")}
            {...register("email", {
              required: true,
              pattern: /[-\w+.]+@[-\w+.]+\.[a-z0-9]+/i,
            })}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={
              errors.email ? createID("email", "errors") : undefined
            }
          />
        </Form.Control>
        {errors.email && (
          <Form.Error id={createID("email", "errors")}>
            {errors.email.type === "pattern"
              ? `Must be a valid email address.`
              : `Email is required.`}
          </Form.Error>
        )}
      </Form.Field>
      <Form.Field>
        <Form.Label
          htmlFor={createID("title", "control")}
          id={createID("title", "label")}
        >
          Title
        </Form.Label>
        <Form.Control>
          <select id={createID("title", "control")} {...register("title")}>
            <option>Mx</option>
            <option>Mr</option>
            <option>Ms</option>
            <option>Mrs</option>
            <option>Dr</option>
            <option>Successor of the Prince of the Apostles</option>
          </select>
        </Form.Control>
      </Form.Field>
      <Form.Fieldset>
        <Form.Legend>Terms</Form.Legend>
        <Form.Control>
          <input
            type="checkbox"
            value="one"
            id={createID("terms", "control", 0)}
            {...register("terms")}
          />
          <label
            htmlFor={createID("terms", "control", 0)}
            id={createID("terms", "label", 0)}
          >
            One
          </label>
          <br />
          <input
            type="checkbox"
            value="two"
            id={createID("terms", "control", 1)}
            {...register("terms")}
          />
          <label
            htmlFor={createID("terms", "control", 1)}
            id={createID("terms", "label", 1)}
          >
            Two
          </label>
          <br />
          <input
            type="checkbox"
            value="three"
            id={createID("terms", "control", 2)}
            {...register("terms")}
          />
          <label
            htmlFor={createID("terms", "control", 2)}
            id={createID("terms", "label", 2)}
          >
            Three
          </label>
        </Form.Control>
      </Form.Fieldset>
      <Form.Actions>
        <Button type="submit">Submit</Button>
      </Form.Actions>
    </Form.Root>
  );
}
