import Head from "next/head";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import he from "he";

const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

function PageBlogItemBySlug({ blogItem }) {
  const { title, date, description, tags, author, contentMdx } = blogItem;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-0">
        <h1>{title}</h1>
        <p>{new Date(date).toDateString()}</p>
        <p>{description}</p>

        <div>{author.name}</div>
        <Image
          alt={author.name}
          title={author.name}
          src={`/images/author-images/${author.image}`}
          width={author.imageWidth / 3}
          height={author.imageHeight / 3}
        />

        <div>
          {tags.map((tag) => (
            <span key={tag}>{tag} &nbsp;</span>
          ))}
        </div>

        <div>
          <MDXRemote {...contentMdx} />
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const query = gql`
    query BlogItemsWithSlugQuery {
      blogItems: posts {
        slug
      }
    }
  `;

  const { blogItems } = await graphQLClient.request(query);

  return {
    paths: blogItems.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const query = gql`
    query BlogItemBySlugQuery($slug: String!) {
      blogItem: post(where: { slug: $slug }) {
        title
        date
        description
        tags
        author {
          name
          image
          imageWidth
          imageHeight
        }
        content
      }
    }
  `;

  const variables = { slug };

  const { blogItem } = await graphQLClient.request(query, variables);

  return {
    props: {
      blogItem: {
        contentMdx: await serialize(he.decode(blogItem.content)),
        ...blogItem,
      },
    },
  };
}

export default PageBlogItemBySlug;
