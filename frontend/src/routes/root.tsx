import { Button, Chip, Sheet, Table } from "@mui/joy";

const rows = [
    {
        id: 1,
        date: "2023年8月4日",
        received: 10000,
        send: 0,
        categories: ["給料"]
    }
]
export default function Root() {
    return (
        <>
            <Button component="a" href="/new">追加</Button>
            <Sheet>
                <Table variant="outlined">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>日付</th>
                            <th>入金</th>
                            <th>出金</th>
                            <th>カテゴリ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(v => (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.date}</td>
                                <td>{v.received}円</td>
                                <td>{v.send}円</td>
                                <td>
                                    {v.categories.map(v => (
                                        <Chip>{v}</Chip>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
        </>
    )
}