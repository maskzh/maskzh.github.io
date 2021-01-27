import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';

export default function Search({ text, setText }) {
  const { t } = useTranslation();

  return (
    <input
      className="w-full h-8 px-3 py-1 text-base rounded-lg placeholder-center outline-none shadow dark:bg-gray-900 dark:text-white"
      placeholder={t('search articles')}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
