import { ActionFunctionArgs, redirect } from "react-router-dom";

export async function newAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const body = formData.get("body");

    const res = await fetch("http://localhost:8080/histories", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        body: body,
    })
    if (res.ok) {
        return redirect("/")
    }

    return {
        status: res.status
    }
}