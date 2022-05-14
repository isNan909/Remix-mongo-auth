import { useState } from 'react';
import { Layout } from '~/layout/layout';
import { Link, useActionData } from '@remix-run/react';
import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { registerUser, getUser } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  // If user has active session, redirect to the homepage
  return (await getUser(request)) ? redirect('/') : null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  const fullName = form.get('fullName');

  if (!email || !password || !fullName) {
    return {
      status: 400,
      body: 'Please provide email and password',
    };
  }

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof fullName !== 'string'
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const allFields = { email, password, fullName };
  const user = await registerUser(allFields);
  return user;
};

export default function Register() {
  const actionData = useActionData();
  const [formError, setFormError] = useState(actionData?.error || '');

  return (
    <>
      <Layout>
        <div className="min-h-full flex items-center justify-center mt-[30vh]">
          <div className="max-w-md w-full space-y-8">
            <div>
              <span className="text-center text-slate-400 block">
                Welcome fellas!
              </span>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Register your account
              </h2>
            </div>

            <form method="post">
              <div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Full name
                  </label>
                  <input
                    id="user-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Full name"
                    defaultValue={actionData?.fullName}
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    defaultValue={actionData?.email}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    defaultValue={actionData?.password}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5"
              >
                Register account
              </button>
              <div>
                <p className="text-sm text-center mt-5">
                  Already have an account?
                  <span className="underline pl-1 text-green-500">
                    <Link to="/auth/login">Login</Link>
                  </span>
                </p>
              </div>
              <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
                {formError}
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
