export async function listLoader() {
    return await (fetch("http://localhost:8080/histories").then(res => res.json()))
}