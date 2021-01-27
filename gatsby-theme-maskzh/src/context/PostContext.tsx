import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { buildTags } from '../utils/Tag';

const defaultStore = {
  posts: [],
  tags: [],
};

const PostContext = React.createContext(defaultStore);

export default PostContext;

export const Provider = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___title }) {
        edges {
          node {
            frontmatter {
              title
              tags
              created
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `);

  const posts = data.allMarkdownRemark.edges.map((edge) => ({
    title: edge.node.frontmatter.title,
    tags: edge.node.frontmatter.tags,
    date: edge.node.frontmatter.created,
    content: edge.node.excerpt,
    slug: edge.node.fields.slug,
  }));

  const rawTags = data.allMarkdownRemark.edges.map((edge) => {
    return edge.node.frontmatter.tags;
  });

  const tags = buildTags(rawTags);

  return <PostContext.Provider value={{ posts, tags }}>{children}</PostContext.Provider>;
};
