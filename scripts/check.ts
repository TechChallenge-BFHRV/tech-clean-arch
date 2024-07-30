export function check(condition: boolean, message: string) {
  if (condition) {
    console.log(`✔ ${message}`);
  } else {
    console.error(`✘ ${message}`);
  }
}
