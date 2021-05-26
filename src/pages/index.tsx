import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

function PageIndex({ data }) {
  return (
    <>
      <Head>
        <title>Next.js GraphCMS Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {data?.portfolioItems?.map(({ title, slug }) => (
          <div key={slug}>
            <Link href={`/portfolio/${slug}`}>
              <a>{title}</a>
            </Link>
          </div>
        ))}
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
