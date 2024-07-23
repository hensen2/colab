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

export default function PageHeader() {
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
    </div>
  );
}
