import { useRouter } from "next/router";
import Link from "next/link";

export default function Breadcrumbs() {
  const router = useRouter();

  const formatLabel = (str) =>
    str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const pathSegments = router.asPath.split("/");
  pathSegments[0] = "/";

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join("/")}`;

    return {
      label: formatLabel(segment),
      url,
      isCurrentPage: index === pathSegments.length - 1,
    };
  });

  return (
    <div className="breadcrumbs fixed w-screen p-8 text-lg">
      <ul>
        {breadcrumbItems.map((item, index) => (
          <li key={index}>
            {item.isCurrentPage ? (
              <span>{item.label}</span>
            ) : (
              <Link href={item.url}>{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
