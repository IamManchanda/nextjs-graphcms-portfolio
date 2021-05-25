import Head from "next/head";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

function PagePortfolioItemBySlug({ portfolioItem }) {
  console.log({ portfolioItem });
  const {
    title,
    date,
    description,
    tags,
    content,
    coverImage,
    coverImageWidth,
    coverImageHeight,
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
      portfolioItem,
    },
  };
}

export default PagePortfolioItemBySlug;