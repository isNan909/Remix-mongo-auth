import { useState } from 'react';
import { Layout } from '~/layout/layout';
import { useActionData, Link } from '@remix-run/react';
import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { loginUser, getUser } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  // If user has active session, redirect to the homepage
  return (await getUser(request)) ? redirect('/') : null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email')?.toString();
  const password = form.get('password')?.toString();

  if (!email || !password)
    return {
      status: 400,
      body: 'Please provide email and password',
    };

  const user = await loginUser({ email, password });
  return user;
};

export default function Login() {
  const actionData = useActionData();
  const [formError, setFormError] = useState(actionData?.error || '');

  return (
    <>
      <Layout>
        <div className="min-h-full flex items-center justify-center mt-[30vh]">
          <div className="max-w-md w-full space-y-8">
            <div>
              <span className="text-center text-slate-400 block">
                Welcome back!
              </span>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Log in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
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

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log in
                </button>
              </div>
              <div>
                <p className="text-sm text-center">
                  I dont have an account?
                  <span className="underline pl-1 text-green-500">
                    <Link to="/register">Register</Link>
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
