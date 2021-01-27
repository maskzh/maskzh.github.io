import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';

export default function Search({ text, setText }) {
  const { t } = useTranslation();

  return (
    <div className="py-4 border-b">
      <input
        className="w-full h-8 px-3 py-1 text-sm rounded-lg placeholder-center border border-gray-100 outline-none focus:shadow"
        placeholder={t('search articles')}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
