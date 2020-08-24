import Link from 'next/link';

const Home: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full">
      <div>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          DeDrone Map
        </h2>
      </div>
      <form className="mt-8" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm">
          <div>
            <input
              aria-label="Username"
              name="username"
              type="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Benutzername"
            />
          </div>
          <div className="-mt-px">
            <input
              aria-label="Password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Passwort"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
              Login speichern
            </label>
          </div>

          <div className="text-sm leading-5">
            <a
              href="404"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Passwort vergessen?
            </a>
          </div>
        </div>

        <div className="mt-6">
          <Link href="dashboard">
            <button type="submit" className="btn-blue">
              Anmelden
            </button>
          </Link>
        </div>
      </form>
    </div>
  </div>
);

export default Home;
