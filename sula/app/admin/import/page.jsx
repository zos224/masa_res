import { promises as fs } from 'fs';

export default async function Page() {
    const file = await fs.readFile('data.json', 'utf8');
    const data = JSON.parse(file);
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    fetch(process.env.APP_URL + '/api/product/import', {
        method: 'POST',
        body: formData
    })
}
