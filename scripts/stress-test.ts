import axios from 'axios';
import { check } from './check';

const options = {
  stages: [
    { duration: 2 * 60 * 1000, target: 100 },
    { duration: 5 * 60 * 1000, target: 100 },
    { duration: 2 * 60 * 1000, target: 0 },
  ],
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function performRequest() {
  try {
    const res = await axios.get('endpoint para stress aqui');
    check(res.status === 200, 'status é 200');
  } catch (error) {
    console.error('Request failed:', error.message);
  }
}

async function main() {
  for (const stage of options.stages) {
    const { duration, target } = stage;
    const startTime = Date.now();
    const endTime = startTime + duration;
    const interval = duration / target;

    while (Date.now() < endTime) {
      const promises = [];
      for (let i = 0; i < target; i++) {
        promises.push(performRequest());
        await sleep(interval);
      }
      await Promise.all(promises);
    }
  }
}

main().catch((error) => console.error(error));
