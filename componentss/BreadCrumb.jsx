import Link from "next/link";

export default function Breadcrumb({ pages }) {
  return (
    <nav className="flex flex-wrap mt-8" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center gap-4">
        <li className="underline">
          <Link href="/" className="underline" />
          Home
        </li>
        {pages &&
          pages?.map((page, i) => (
            <li key={page.name}>
              <div className="flex items-center">
                {i != 1 && "/"}

                <a
                  href={page.href}
                  className="whitespace-nowrap ml-3"
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </a>
              </div>
            </li>
          ))}
      </ol>
    </nav>
  );
}
