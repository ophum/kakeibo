import { Button,  Sheet, Table } from "@mui/joy";
import { useLoaderData } from "react-router-dom";


interface History {
    id: number;
    type: string;
    amount: number;
    date: string;
    created_at: string;
}

interface HistoriesResponse {
    histories: History[];
}

export default function List() {
    const data = useLoaderData() as HistoriesResponse;

    console.log(data);
    return (
        <>
            <Button component="a" href="/new">追加</Button>
            <Sheet>
                <Table variant="outlined">
                    <thead>
                        <tr>
                            <th>日付</th>
                            <th>入金</th>
                            <th>出金</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.histories.map(v => (
                            <tr key={v.id}>
                                <td>{(new Date(v.date)).toISOString().split("T", 1)[0]}</td>
                                <td>{v.type === "received" && `${v.amount}円`}</td>
                                <td>{v.type === "send" && `${v.amount}円`}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
        </>
    )
}