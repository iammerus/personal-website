type DatedArticle = {
  id: string;
  data: {
    date: Date;
  };
};

export function sortArticlesNewestFirst<T extends DatedArticle>(articles: T[]): T[] {
  return [...articles].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id),
  );
}

export function getArticleNumber<T extends DatedArticle>(articles: T[], articleId: string): string {
  const chronological = [...articles].sort(
    (a, b) => a.data.date.valueOf() - b.data.date.valueOf() || a.id.localeCompare(b.id),
  );
  const index = chronological.findIndex((article) => article.id === articleId);

  if (index === -1) {
    throw new Error(`Cannot number unknown article: ${articleId}`);
  }

  return `B-${(index + 1).toString().padStart(3, '0')}`;
}
