import Link from "next/link";

function BlogItemsContainer({ blogItems }) {
  return blogItems?.map(({ title, slug, date, description, author }) => (
    <div className="grid grid-cols-1 py-6 md:grid-cols-4" key={slug}>
      <div className="mb-2 md:mb-0 md:col-span-1">
        <p className="text-sm text-gray-600">{new Date(date).toDateString()}</p>
      </div>
      <div className="md:col-span-3">
        <Link href={`/blog/${slug}`}>
          <a className="text-2xl font-semibold text-gray-900 transition-colors duration-300 hover:text-gray-700 hover:underline">
            {title}
          </a>
        </Link>
        <p className="mt-2 leading-loose text-gray-800">{description}</p>
        <div className="mt-2 text-sm font-semibold text-gray-900">
          by, {author.name}
        </div>
      </div>
    </div>
  ));
}

export default BlogItemsContainer;
