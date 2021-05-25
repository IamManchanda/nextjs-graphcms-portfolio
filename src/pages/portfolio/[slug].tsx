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
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-10">
        <h1>{title}</h1>
        <p>{new Date(date).toDateString()}</p>
        <p>{description}</p>
        <div>
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Image
          alt={title}
          title={title}
          src={`/images/portfolio-images/${coverImage}`}
          width={coverImageWidth}
          height={coverImageHeight}
          layout="responsive"
        />
        <div>
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
        content
        coverImage
        coverImageWidth
        coverImageHeight
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
