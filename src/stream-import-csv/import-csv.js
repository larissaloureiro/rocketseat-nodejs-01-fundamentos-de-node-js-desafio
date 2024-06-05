import fs from 'node:fs';
import { parse } from 'csv-parse';

const csvPath = new URL('./tasks.csv', import.meta.url)

const processFile = async () => {
  const parser = fs
    .createReadStream(csvPath)
    .pipe(parse({
    columns: true,
    }));
  for await (const line of parser) {
    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(line)
    })
  }
};

(async () => {
  const records = await processFile();
  console.log('CSV data imported!');
})();