export function getQuery(path: string) {
  const fragment = path.split("/");
  return fragment[fragment.length - 1];
}
