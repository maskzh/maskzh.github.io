import { useLocation } from '@reach/router';
import dayjs from 'dayjs';
import { graphql, Link } from 'gatsby';
import queryString from 'query-string';
import React, { useContext } from 'react';
import Article from '../components/article';
import SEO from '../components/seo';
import PostContext from '../context/PostContext';
import { isTagInclude } from '../utils/Tag';

export default function BlogPost({ pathContext: { slug }, data: { site, markdownRemark } }) {
  const { posts } = useContext(PostContext);
  const location = useLocation();
  const tag = queryString.parse(location.search).tag;
  const articles = posts
    .filter((article) => isTagInclude(article.tags, tag as string))
    .filter((article) => article.slug !== slug)
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
    .slice(0, 3);

  return (
    <div className="min-h-screen dark:bg-black">
      <Link to="/" className="block py-2 shadow text-lg font-bold text-center dark:text-white">
        {site.siteMetadata.title}
      </Link>
      <div className="px-6 mx-auto" style={{ maxWidth: 800 }}>
        <SEO title={markdownRemark.frontmatter.title} />
        <Article markdownRemark={markdownRemark} />
        {articles.length > 0 && <h3 className="text-base font-medium dark:text-white">延伸阅读</h3>}
        {articles.map(({ title, date, content, slug }) => (
          <Link key={slug} to={slug} className="block py-4 border-b border-gray-100 dark:border-gray-900">
            <time className="text-gray-400 text-xs font-medium dark:text-gray-600">
              {dayjs(date).format('YYYY-MM-DD')}
            </time>
            <h3 className="text-base text-black font-bold truncate dark:text-white">{title}</h3>
            <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">{content}</p>
          </Link>
        ))}
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
