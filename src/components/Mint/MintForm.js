import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FileUpload from './FileUpload';
import './MintForm.css'

function MintForm({ setEstateName, setAddress }) {
    const style = {
        singleTextFieldTitle: {
            display: "inline-block",
            height: "56px",
            'line-height': "56px",
            margin: "8px"
        },
        uploadStyle: {
            'padding-left': "1.5vw"
        },
        submitButton: {
            'background-color': "#1976d2",
            'color': 'white',
            'float': 'right',
            'margin-right': '2.5vw'
        }
    }

    const [checkedUF, toggleUF, checkedIPFS, toggleIPFS] = useChecked();
    const [newUserInfo, setNewUserInfo] = useState({ profileImages: [] });
    
    const updateUploadedFiles = (files) => {
        console.log(files);
        setNewUserInfo({ ...newUserInfo, profileImages: files })
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            style={{
                margin: 'auto'
            }}
            noValidate
            autoComplete="off"
        >
            <div className="MintFormWrapper">
                <div className='MintFormRow'>
                    <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                        Estate Name
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="Estate Name"
                        onChange={(event) => setEstateName(event.target.value)}
                    />
                </div>
                <div className='MintFormRow'>
                    <FormGroup
                        row={true}
                        style={style.uploadStyle}
                    >
                        <FormControlLabel control={<Checkbox checked={checkedUF} onChange={toggleUF}/>} label="Upload Files" />
                        <FormControlLabel control={<Checkbox checked={checkedIPFS} onChange={toggleIPFS}/> } label="IPFS" />
                    </FormGroup>
                </div>
                <div className='MintFormRow'>
                    <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                        Upload Images
                    </Typography>
                    <FileUpload 
                        accept=".jpg,.png,.jpeg,.gif"
                        label="Estate Images"
                        multiple
                        updateFilesCb={updateUploadedFiles}
                    />
                </div>
                <div className='MintFormRow'>
                    <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                        Address
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="Address"
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </div>
                <div className='MintFormRow'>
                    <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                        Number of Beds
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="Number of Beds"
                    />
                </div>
                <div className='MintFormRow'>
                    <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                        Estate Square Footage
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="Estate Square Footage"
                    />
                </div>
                <div className='MintFormRow'>
                    <Button style={style.submitButton} variant="contained">Contained</Button>
                </div>
            </div>
        </Box>
    )
}

// check hook
const useChecked = (defaultChecked = "UF") => {
    const [checkedUF, setCheckedUF] = useState(true);
    const [checkedIPFS, setCheckedIPFS] = useState(false);

    const toggleUF = useCallback(() => {
        if (!checkedUF) {
            setCheckedUF(true)
            setCheckedIPFS(false)
        }
    }, [checkedUF]);
    
    const toggleIPFS = useCallback(() => {
        if (!checkedIPFS) {
            setCheckedIPFS(true)
            setCheckedUF(false)
        }
    }, [checkedIPFS]);

    return [checkedUF, toggleUF, checkedIPFS, toggleIPFS]
}

export default MintForm;