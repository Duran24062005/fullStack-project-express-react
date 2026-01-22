export default async function getHealty() {
    const res = await fetch("http://localhost:8000/hola");
    let data = await res.json();
    return await data
}