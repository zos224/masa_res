export default async function Page() {
    const file = await fetch('https://mocki.io/v1/359b3394-8b8c-4e72-9dfc-85c14f1b313a')
    const data = await file.json()
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    fetch(process.env.APP_URL + '/api/product/import', {
        method: 'POST',
        body: formData
    })
}
