export async function rootLoader() {
    return await (fetch("http://localhost:8080/histories").then(res => res.json()))
}