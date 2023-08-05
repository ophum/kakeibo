import { Chip, Sheet, Table } from "@mui/joy";

function App() {
  return (
    <>
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
            <tr>
              <td>1</td>
              <td>2023年8月4日</td>
              <td>10000円</td>
              <td></td>
              <td>
                <Chip>給料</Chip>
              </td>
            </tr>
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}

export default App;
