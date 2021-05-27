import { gql } from "graphql-request";

export const FetchHomepageQuery = gql`
  query HomepageQuery {
    portfolioItems: portfolios(first: 2, orderBy: date_DESC) {
      title
      slug
      description
      tags
      coverImage
      coverImageWidth
      coverImageHeight
    }
    blogItems: posts(first: 2, orderBy: date_DESC) {
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

export const FetchAboutpageQuery = gql`
  query AboutpageQuery($slug: String!) {
    about: author(where: { slug: $slug }) {
      name
      biography
    }
  }
`;
