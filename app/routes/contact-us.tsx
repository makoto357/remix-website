import { Form, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";

interface ActionData {
  errors?: {
    email?: string;
  };
}

export default function ContactUs() {
  const actionData = useActionData() as ActionData;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Form
        action="/contact-us"
        method="post"
        className="flex flex-col space-y-4"
      >
        <label htmlFor="email">Your email address</label>
        <input
          id="email"
          name="email"
          type="email"
          className="dark:text-black"
          aria-invalid={actionData?.errors?.email ? true : undefined}
          aria-describedby="email-error"
        />

        {actionData?.errors?.email && (
          <div id="email-error">{actionData.errors.email}</div>
        )}
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="dark:text-black"
        />
        <button type="submit">Save</button>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email"); //get name attribute of the input

  if (!email) {
    return json<ActionData>(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  }
  return json({ ok: true });
}
