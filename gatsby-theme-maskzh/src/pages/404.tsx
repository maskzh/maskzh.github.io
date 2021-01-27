import { Link } from 'gatsby';
import React from 'react';
import SEO from '../components/seo';

export default function NotFoundPage() {
  return (
    <div>
      <SEO title="404: Not found" />
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <h1 className="text-lg font-bold">NOT FOUND</h1>
        <p className="text-base text-gray-500">You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Link to="/">
          <button className="mt-4 bg-red-600 text-white px-4 py-1 border-0 outline-0 rounded-full">➡ HOME</button>
        </Link>
      </div>
    </div>
  );
}
