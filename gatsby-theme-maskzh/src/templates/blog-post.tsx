import dayjs from 'dayjs';
import { graphql, Link } from 'gatsby';
import React, { useContext } from 'react';
import Article from '../components/article';
import SEO from '../components/seo';
import PostContext from '../context/PostContext';

export default function BlogPost({ pathContext: { slug }, data: { site, markdownRemark } }) {
  const { posts } = useContext(PostContext);
  const articles = posts
    .filter(
      (post) =>
        new Set([...(post.tags || []), ...(markdownRemark.frontmatter.tags || [])]).size <
        (post.tags || []).length + (markdownRemark.frontmatter.tags || []).length,
    )
    .filter((post) => post.slug !== slug)
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
    .slice(0, 3);

  return (
    <div className="min-h-screen overflow-x-hidden dark:bg-black">
      <Link to="/" className="block py-2 text-lg font-bold text-center dark:text-white">
        {site.siteMetadata.title}
      </Link>
      <div className="px-6 pb-6 mx-auto" style={{ maxWidth: 800 }}>
        <SEO title={markdownRemark.frontmatter.title} />
        <Article markdownRemark={markdownRemark} />
        {articles.length > 0 && (
          <h3 className="mt-6 text-sm font-medium dark:text-white">
            延伸阅读
          </h3>
        )}
        <div className="divide-y divide-gray-100 dark:divide-gray-900">
          {articles.map(({ title, date, slug }) => (
            <Link key={slug} to={slug} className="block py-2">
              <time className="text-gray-400 text-xs font-medium dark:text-gray-600">
                {dayjs(date).format('YYYY-MM-DD')}
              </time>
              <h3 className="text-sm text-black font-bold truncate dark:text-white">{title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      rawMarkdownBody
      timeToRead
      wordCount {
        paragraphs
        sentences
        words
      }
      frontmatter {
        title
        tags
        created
      }
    }
  }
`;
