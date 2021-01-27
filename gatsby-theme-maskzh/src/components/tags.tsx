import { navigate, useLocation } from '@reach/router';
import classnames from 'classnames';
import { withPrefix } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Tag } from '../utils/Tag';

const Tags = ({ tags, level = 1 }: { tags: Tag[]; level: number }) => {
  if (tags.length === 0) return null;

  const { t } = useTranslation();
  const locationInfo = useLocation();
  const tagMatch = decodeURIComponent(locationInfo.search).match(/[\&\?]tag=([\u4e00-\u9fa5_a-zA-Z0-9]+)/);
  const matchedTag = tagMatch ? tagMatch[1] : null;

  function onClickTag(event: React.MouseEvent<HTMLLIElement, MouseEvent>, tag: Tag) {
    event.stopPropagation();
    navigate(tag.to ? withPrefix(tag.to) : `?tag=${tag.tagname}`);
  }

  return (
    <ul>
      {tags.map((d) => (
        <li key={d.tagname} className="cursor-pointer" onClick={(e) => onClickTag(e, d)}>
          <div
            className={classnames('py-2 text-base hover:text-red-500', matchedTag === d.tagname && '-mr-px bg-red-100')}
            style={{ paddingLeft: level * 1 + 'rem' }}
          >
            <span className="text-gray-300 mr-1">#</span>
            <strong className={classnames(matchedTag === d.tagname ? 'text-red-500' : 'text-gray-600')}>
              {t(d.tagname)}
            </strong>
          </div>
          {d.children && <Tags tags={d.children} level={level + 1} />}
        </li>
      ))}
    </ul>
  );
};

export default Tags;
