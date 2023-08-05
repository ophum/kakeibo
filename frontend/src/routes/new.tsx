import { Button, FormControl, FormLabel, Input, Radio, RadioGroup } from "@mui/joy";
import { Controller, useForm } from "react-hook-form";

interface NewFormInput {
    date: string;
    type: string;
    amount: number;
}

export default function New() {
    const form = useForm<NewFormInput>({
        defaultValues: {
            type: "send"
        }
    });
    const onSubmit = (data: NewFormInput) => console.log(data);
    return (<div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormControl>
                <FormLabel>日付</FormLabel>
                <Input type="date" {...form.register("date")} />
            </FormControl>
            <FormControl>
                <Controller name="type" control={form.control} render={({ field }) => (
                    <RadioGroup {...field}>
                        <Radio label="入金" value="receive" />
                        <Radio label="出金" value="send" />
                    </RadioGroup>
                )} />
            </FormControl>
            <FormControl>
                <FormLabel>金額</FormLabel>
                <Input type="number" endDecorator="円" {...form.register("amount")} />
            </FormControl>
            <Button type="submit">追加</Button>
        </form>
    </div>)
}