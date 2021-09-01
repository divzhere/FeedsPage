export function extractQuotesText(str) {
  const regex = /"(.*?)"/g;
  const result = [];
  let current;
  while ((current = regex.exec(str))) {
    result.push(current.pop());
  }
  return result.length > 0 ? result : [str];
}
