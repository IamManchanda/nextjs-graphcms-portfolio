import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="w-full px-4 py-10 sm:px-6 lg:px-0">
      <div className="flex flex-col items-center justify-between max-w-3xl mx-auto sm:flex-row">
        <div className="text-3xl font-semibold sm:text-2xl">
          Awesome GraphCMS
        </div>
        <ul className="flex mt-4 text-lg sm:mt-0">
          <li>
            <Link href="/">
              <a className="text-gray-900 hover:text-gray-700 hover:underline">
                Home
              </a>
            </Link>
          </li>

          <li className="ml-4">
            <Link href="/about">
              <a className="text-gray-900 hover:text-gray-700 hover:underline">
                About
              </a>
            </Link>
          </li>

          <li className="ml-4">
            <Link href="/portfolio">
              <a className="text-gray-900 hover:text-gray-700 hover:underline">
                Portfolio
              </a>
            </Link>
          </li>

          <li className="ml-4">
            <Link href="/blog">
              <a className="text-gray-900 hover:text-gray-700 hover:underline">
                Blog
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavigationHeader;
