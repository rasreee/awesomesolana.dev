import { defaultPagination, Pagination } from "../pagination";
import { Tag } from "../sources/types";

function formatGitHubTopic(name: string) {
  return name.replaceAll(".", "").replaceAll(" ", "-").toLowerCase();
}

function formatTagSearchParam(tag: Tag): string {
  if (tag.type === "language") return `language:${tag.name}`;
  if (tag.type === "topic") return `topic=${tag.name}`;
  if (tag.type === "framework") {
    return `topic=${formatGitHubTopic(tag.name)}`;
  }
  return "";
}

export function githubApiQuery({
  keywords = [],
  tags = [],
  per_page = defaultPagination.per_page,
  page = defaultPagination.page,
}: Partial<Pagination> & Partial<{ keywords: string[]; tags: Tag[] }>): string {
  const params = [
    ...keywords.map((keyword) => keyword.trim()),
    ...tags.map(formatTagSearchParam),
  ]
    .filter(Boolean)
    .join("+");

  const query = params.length ? `?q=${params}` : "";
  const pagination = `${query ? "&" : "?"}page=${page}&per_page=${per_page}`;

  return `${query}${pagination}`;
}
