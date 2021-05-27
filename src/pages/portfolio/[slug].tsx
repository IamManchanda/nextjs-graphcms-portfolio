import Head from "next/head";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import he from "he";

const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

function PagePortfolioItemBySlug({ portfolioItem }) {
  const {
    title,
    date,
    description,
    tags,
    coverImage,
    coverImageWidth,
    coverImageHeight,
    contentMdx,
  } = portfolioItem;

  return (
    <>
      <Head>
        <title>{title} - Next.js + GraphCMS</title>
      </Head>
      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-0">
        <h1 className="text-5xl font-bold text-gray-900">{title}</h1>

        <div className="flex items-center justify-between mb-4">
          <p className="mt-3 text-lg text-gray-700">
            {new Date(date).toDateString()}
          </p>
          <div className="flex mt-3 space-x-3">
            {tags.map((tag) => (
              <span
                className="px-2 py-1 m-2 text-sm tracking-wide text-gray-900 uppercase bg-gray-100 rounded-lg"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="py-4 prose prose-xl">{description}</p>

        <div className="mt-6 mb-4">
          <Image
            alt={title}
            title={title}
            src={`/images/portfolio-images/${coverImage}`}
            width={coverImageWidth}
            height={coverImageHeight}
            layout="responsive"
          />
        </div>

        <div className="mt-8 prose prose-xl max-w-none">
          <MDXRemote {...contentMdx} />
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const query = gql`
    query PortfolioItemsWithSlugQuery {
      portfolioItems: portfolios {
        slug
      }
    }
  `;

  const { portfolioItems } = await graphQLClient.request(query);

  return {
    paths: portfolioItems.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const query = gql`
    query PortfolioItemBySlugQuery($slug: String!) {
      portfolioItem: portfolio(where: { slug: $slug }) {
        title
        date
        description
        tags
        coverImage
        coverImageWidth
        coverImageHeight
        content
      }
    }
  `;

  const variables = { slug };

  const { portfolioItem } = await graphQLClient.request(query, variables);

  return {
    props: {
      portfolioItem: {
        contentMdx: await serialize(he.decode(portfolioItem.content)),
        ...portfolioItem,
      },
    },
  };
}

export default PagePortfolioItemBySlug;
