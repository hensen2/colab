import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export default function Header() {
  const { pathname } = useLocation();

  // extract relative paths as array of strings
  const relativePaths =
    pathname !== "/" ? location.pathname.slice(1).split("/") : null;
  const pathLength = relativePaths?.length;

  return (
    <div>
      <div className="flex h-16 shrink-0 items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {!relativePaths ? (
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to="/">Dashboard</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {pathLength &&
              relativePaths.map((name, idx) => (
                <Fragment key={name}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="capitalize">
                    {idx === pathLength - 1 ? (
                      <BreadcrumbPage>{name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={`/${name}`}>{name}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-4 mt-3 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Experiment Notebook
          </h2>
        </div>
        <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
