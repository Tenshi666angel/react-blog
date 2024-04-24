import { ChangeEvent, useState } from "react"

export const useField = () => {
    const [value, setValue] = useState<string>('');

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    } 

    return [value, onChange] as const
}