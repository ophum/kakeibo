import { Sheet, Stack } from "@mui/joy";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";


export default function Root() {
    return (
        <Stack direction="row" spacing={1}>
            <Sidebar />
            <Sheet sx={{width: "calc(100% - 240px)", height: "100dvh"}}>
                <Outlet />
            </Sheet>
        </Stack>
    )
}