export const getArticlesQuery = /* GraphQL */ `
  query getArticles($first: Int!) {
    blogs(first: 5) {
      edges {
        node {
          handle
          articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
            edges {
              node {
                handle
                title
                excerpt
                publishedAt
                image {
                  url
                  altText
                  width
                  height
                }
                authorV2 {
                  name
                }
                blog {
                  handle
                }
              }
            }
          }
        }
      }
    }
  }
`;
