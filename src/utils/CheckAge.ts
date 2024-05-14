export function CheckAge(value: string): boolean {
  if (
    value === '' ||
    Number(value[0]) > 3 ||
    Number(value[3]) > 1 ||
    Number(value.slice(0, 2)) > 31 ||
    Number(value.slice(3, 5)) > 12 ||
    Number(value.slice(6)) < 1900
  )
    return false;
  const dateElements = value
    .split('.')
    .map((el) => Number(el))
    .reverse();
  const dateValue = new Date(dateElements[0], dateElements[1] - 1, dateElements[2]);
  const today = new Date();
  let age = today.getFullYear() - dateValue.getFullYear();
  if (
    today.getMonth() < dateValue.getMonth() ||
    (today.getMonth() === dateValue.getMonth() && today.getDate() < dateValue.getDate())
  ) {
    age--;
  }
  if (age < 14 || age > 130) {
    return false;
  }
  return true;
}
