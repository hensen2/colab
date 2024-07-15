/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AxiosError } from "axios";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage = "";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof AxiosError) {
    errorMessage = error.response?.data.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <main
      id="error-page"
      className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Oops!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, an unexpected error has occurred.
        </p>
        <p>
          <i>{errorMessage}</i>
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
