export class Tag {
  public children: Tag[] = [];
  constructor(public tagname: string, public to?: string) {}
}

export function flat(ary: Array<Array<string> | string>): string[] {
  const result = [];
  for (const item of ary) {
    if (Array.isArray(item)) {
      for (const innerItem of flat(item)) {
        result.push(innerItem);
      }
    } else {
      result.push(item);
    }
  }
  return result;
}

export function buildTags(tags: Array<Array<string>>): Array<Tag> {
  const flatTags = flat(tags.filter(Boolean));
  const topLevel = [];
  const tagMap = new Map();
  for (const tagPath of flatTags) {
    const tags = tagPath.split('/');
    tags.forEach((tag, i, self) => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, new Tag(tag));
      }
      if (i === 0) {
        if (!topLevel.includes(tag)) topLevel.push(tag);
      } else {
        const prevTag = tagMap.get(self[i - 1]);
        const currentTag = tagMap.get(tag);
        if (!prevTag.children.includes(currentTag)) {
          prevTag.children.push(currentTag);
        }
      }
    });
  }

  return topLevel.map((tagname) => tagMap.get(tagname));
}

export function isTagInclude(blogTag: string[], tag: string): boolean {
  if (!tag) return true;
  if (!blogTag) return false;
  return blogTag.some((tagList) => tagList.split('/').includes(tag));
}
