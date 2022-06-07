function since(date: Date) {
  const today = new Date();

  const sinceYears = today.getFullYear() - date.getFullYear();
  if (sinceYears) {
    return `${sinceYears} years`;
  }

  const sinceMonths = today.getMonth() - date.getMonth();
  if (sinceMonths) {
    return `${sinceMonths} months`;
  }

  const sinceDays = today.getDate() - date.getDate();
  if (sinceDays) {
    return `${sinceDays} days`;
  }

  const sinceHours = today.getHours() - date.getHours();
  if (sinceHours) {
    return `${sinceHours} hours`;
  }

  const sinceMinutes = today.getMinutes() - date.getMinutes();
  if (sinceMinutes) {
    return `${sinceMinutes} minutes`;
  }

  const sinceSeconds = today.getSeconds() - date.getSeconds();
  if (sinceSeconds) {
    return `${sinceSeconds} seconds`;
  }

  return "now";
}

export default since;
