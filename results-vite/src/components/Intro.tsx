import { Button } from "@mui/material";
import { useRef, useState } from "react";
import ResultsTable from "./Results-table";

function Intro() {
    const csvFile = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    
    const onButtonClick = () => {
        // `current` points to the mounted file input element
        csvFile.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    }

    return (
        <>
            <div className="wrapper">
                <h1>Filter BirdNET results</h1>
                <Button variant="outlined" onClick={onButtonClick} style={{marginBottom: '30px'}}>Choose results file</Button>
                <input type='file' id='file' ref={csvFile} onChange={handleFileChange} style={{display: 'none'}}/>
                {file ? <ResultsTable file={file} /> : null}
            </div>
        </>
    );
}

export default Intro