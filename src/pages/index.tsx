import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

function PageIndex({ data }) {
  return (
    <>
      <Head>
        <title>Full Stack Portfolio & Blog - Next.js & GraphCMS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-0">
        {data?.portfolioItems?.map(
          ({
            title,
            slug,
            description,
            coverImage,
            coverImageWidth,
            coverImageHeight,
          }) => (
            <div key={slug}>
              <Link href={`/portfolio/${slug}`}>
                <a>
                  <div className="relative mb-10">
                    <div className="absolute z-10 w-full h-full bg-green-900 opacity-70" />
                    <div className="absolute z-20 flex flex-col items-center justify-center w-full h-full px-4 text-center">
                      <h3 className="text-2xl font-semibold text-white">
                        {title}
                      </h3>
                      <p className="mt-3 text-lg leading-relaxed text-gray-50">
                        {description}
                      </p>
                    </div>
                    <Image
                      alt={title}
                      title={title}
                      src={`/images/portfolio-images/${coverImage}`}
                      width={coverImageWidth}
                      height={coverImageHeight}
                      layout="responsive"
                      className="absolute"
                    />
                  </div>
                </a>
              </Link>
            </div>
          ),
        )}
      </div>

      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-0">
        <div className="mt-10">
          {data?.blogItems?.map(
            ({ title, slug, date, description, author }) => (
              <div className="grid grid-cols-1 py-6 md:grid-cols-4" key={slug}>
                <div className="mb-2 md:mb-0 md:col-span-1">
                  <p className="text-sm text-gray-600">
                    {new Date(date).toDateString()}
                  </p>
                </div>
                <div className="md:col-span-3">
                  <Link href={`/blog/${slug}`}>
                    <a className="text-2xl font-semibold text-gray-900 transition-colors duration-300 hover:text-gray-700 hover:underline">
                      {title}
                    </a>
                  </Link>
                  <p className="mt-2 leading-loose text-gray-800">
                    {description}
                  </p>
                  <div className="mt-2 text-sm font-semibold text-gray-900">
                    by, {author.name}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const query = gql`
    query HomepageQuery {
      portfolioItems: portfolios {
        title
        slug
        description
        coverImage
        coverImageWidth
        coverImageHeight
      }
      blogItems: posts {
        title
        slug
        date
        description
        author {
          name
        }
      }
    }
  `;

  const data = await graphQLClient.request(query);

  return {
    props: {
      data,
    },
  };
}

export default PageIndex;
