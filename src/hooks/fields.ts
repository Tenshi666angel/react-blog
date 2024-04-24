import { ChangeEvent, useState } from "react"

export const useField = () => {
    const [value, setValue] = useState<string>('');

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    const result: [string, 
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) 
            => void] = [value, onChange]

    return result
}