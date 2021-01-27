import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import SEO from '../components/seo';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div>
      <SEO title={`404: ${t('not found')}`} />
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <h1 className="text-lg font-bold">{t('not found')}</h1>
        <p className="text-base text-gray-500">You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Link to="/">
          <button className="mt-4 bg-red-600 text-white px-4 py-1 border-0 outline-0 rounded-full">
            ➡ {t('home')}
          </button>
        </Link>
      </div>
    </div>
  );
}
