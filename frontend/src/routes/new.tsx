import { Button, FormControl, FormLabel, Input, Radio, RadioGroup } from "@mui/joy";
import { Controller, useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";

interface NewFormInput {
    date: Date;
    type: string;
    amount: number;
}

export default function New() {
    const form = useForm<NewFormInput>({
        defaultValues: {
            type: "send"
        }
    });
    const submit = useSubmit();
    const onSubmit = (data: NewFormInput) => {
        console.log({data})
        submit({
            body: JSON.stringify(data),
        }, {method: "post", action: "/new"})
    };
    return (<div>
        <form onSubmit={form.handleSubmit(onSubmit)} method="post">
            <FormControl>
                <FormLabel>日付</FormLabel>
                <Input type="date" {...form.register("date", {
                    valueAsDate: true
                })} />
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
                <Input type="number" endDecorator="円" {...form.register("amount", {
                    valueAsNumber: true,
                })} />
            </FormControl>
            <Button type="submit">追加</Button>
        </form>
    </div>)
}