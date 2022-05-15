import {
  ActionFunction,
  LoaderFunction,
  redirect,
  json,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUser } from '~/utils/auth.server';
import { logout } from '~/utils/auth.server';
import { Layout } from '~/layout/layout';

export const loader: LoaderFunction = async ({ request }) => {
  // If user has active session, redirect to the homepage
  const userSession = await getUser(request);
  if (userSession === null) return redirect('/auth/login');
  return json({ userSession });
};

export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};

export default function Index() {
  const { userSession } = useLoaderData();
  const userName = userSession?.profile.fullName;
  const userEmail = userSession?.email;

  return (
    <>
      <Layout>
        <div className="text-center m-[30vh] block">
          <div>
            <small className="text-slate-400 pb-5 block">You are Logged!</small>
            <h1 className="text-4xl text-green-600 font-bold pb-3">
              Welcome to Remix Application
            </h1>
            <p className="text-slate-400">
              Name: {userName}, Email: {userEmail}
            </p>
          </div>
          <div className="text-sm mt-[40px]">
            <form action="/auth/logout" method="POST">
              <button
                name="_action"
                value="delete"
                className="font-medium text-red-600 hover:text-red-500"
              >
                Log me out
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
