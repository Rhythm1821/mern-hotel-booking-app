import { useSearchContext } from "../contexts/SearchContext";

export default function Search() {
    const search = useSearchContext()
    console.log("search", search);
    
    return (
        <>
            <h1>Search</h1>
        </>
    )
}