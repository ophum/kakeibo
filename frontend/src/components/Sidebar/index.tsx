import {  List, ListItem, ListItemButton, ListItemContent, Sheet, Typography } from "@mui/joy";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
    const path = useLocation().pathname;
    return (
        <Sheet sx={{ width: "240px", height: "100dvh" }}>
            <Typography fontWeight="lg">kakeibo</Typography>
            <List>
                <ListItem>
                    <ListItemButton component="a" href="/" selected={path === "/"}>
                        <ListItemContent>履歴</ListItemContent>
                    </ListItemButton>
                </ListItem>
            </List>
        </Sheet>
    )
}