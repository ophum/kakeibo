import { Button, Card, CardActions, CardContent, FormControl, FormLabel, Input, Radio, RadioGroup } from "@mui/joy";
import { Controller, useForm } from "react-hook-form";
import { useActionData, useSubmit } from "react-router-dom";

interface NewFormInput {
    date: Date;
    type: string;
    amount: number;
}

export default function New() {
    const res = useActionData() as { status: number };
    const form = useForm<NewFormInput>({
        defaultValues: {
            type: "send"
        }
    });
    const submit = useSubmit();
    const onSubmit = (data: NewFormInput) => {
        console.log({ data })
        submit({
            body: JSON.stringify(data),
        }, { method: "post", action: "/new" })
    };
    return (<Card sx={{ width: "480px" }}>
        <form onSubmit={form.handleSubmit(onSubmit)} method="post">
            <CardContent>
                {res && (<p>{res.status}</p>)}
                <FormControl>
                    <FormLabel>日付</FormLabel>
                    <Input type="date" {...form.register("date", {
                        valueAsDate: true
                    })} />
                </FormControl>
                <FormControl>
                    <Controller name="type" control={form.control} render={({ field }) => (
                        <RadioGroup {...field}>
                            <Radio label="入金" value="received" />
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
            </CardContent>
            <CardActions>
                <Button type="submit">追加</Button>
            </CardActions>
        </form>
    </Card>)
}