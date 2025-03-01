async function sleep(sleepMs: number) {
  await new Promise((resolve) => setTimeout(resolve, sleepMs));
}

export default sleep;
