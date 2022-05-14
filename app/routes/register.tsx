import { useState } from 'react';
import { Layout } from '~/layout/layout';
import { ActionFunction } from '@remix-run/node';
import { registerUser } from '~/utils/auth.server';

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  const fullName = form.get('fullname');

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
  const [formField, setFormField] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormField((form) => ({ ...form, [field]: event.target.value }));
  };

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
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Full name"
                    value={formField.fullName}
                    onChange={(e) => handleInputChange(e, 'fullName')}
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
                    value={formField.email}
                    onChange={(e) => handleInputChange(e, 'email')}
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
                    value={formField.password}
                    onChange={(e) => handleInputChange(e, 'password')}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5"
              >
                Register account
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
