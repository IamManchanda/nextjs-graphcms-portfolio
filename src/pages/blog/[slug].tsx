import Head from "next/head";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import he from "he";

const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

function PageBlogItemBySlug({ blogItem }) {
  const { title, date, tags, author, contentMdx } = blogItem;

  return (
    <>
      <Head>
        <title>{title} - Next.js + GraphCMS</title>
      </Head>
      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-0">
        <h1 className="text-5xl font-bold text-gray-900">{title}</h1>

        <div className="flex justify-center mt-3 space-x-3">
          {tags.map((tag) => (
            <span
              className="px-2 py-1 m-2 text-sm tracking-wide text-gray-900 uppercase bg-gray-100 rounded-lg"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between my-2">
          <p className="text-lg text-gray-700">
            {new Date(date).toDateString()}
          </p>
          <div className="flex items-center">
            <div className="mr-4 text-lg font-semibold text-gray-900">
              {author.name}
            </div>
            <Image
              alt={author.name}
              title={author.name}
              className="rounded-full"
              src={`/images/author-images/${author.image}`}
              width={75}
              height={75}
              objectFit="cover"
            />
          </div>
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
