import type { ActionFunction } from '@remix-run/node';
import { useActionData } from '@remix-run/react';

type ActionData = {
  fields?: {
    name: string;
    content: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name');
  const content = form.get('content');

  console.log(name, content, 'this is logged');
  debugger;
  return null
};

export default function NewJokeRoute() {
  const actionData = useActionData<ActionData>();

  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div>
          <label>
            Name:
            <input
              type="text"
              defaultValue={actionData?.fields?.name}
              name="name"
            />
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea
              defaultValue={actionData?.fields?.content}
              name="content"
            />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
