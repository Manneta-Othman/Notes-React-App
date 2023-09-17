import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, intitalValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if(jsonValue == null) {
            if(typeof intitalValue === 'function') {
                return (intitalValue as () => T) ()
            }else{
                return intitalValue
            }
        }else{
            return JSON.parse(jsonValue)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as [T, typeof setValue]
}