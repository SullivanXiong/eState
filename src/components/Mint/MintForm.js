import React, { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IPFS from 'ipfs-mini';
import FileUpload from './FileUpload';
import { Item } from '../Carousel/components';
import './MintForm.css'


function MintForm({ urlIPFS, setUrlIPFS, mintUserNFT, pubkey, setCarouselItems, setEstateName, setAddress, setBedNumber, setBathroomNumber, setSqFt}) {
    const [minted, setMinted] = useState(undefined);
    console.log("MINT FORM " + pubkey);
    useCallback(async () => {
       setMinted(await mintUserNFT(pubkey))
    })
    console.log(minted);
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
            'float': 'left',
            'margin-left': '1vw'
        }
    }

    const [checkedUF, toggleUF, checkedIPFS, toggleIPFS] = useChecked();
    const [newImages, setNewImages] = useState({ images: [] });
    const [submit, setSubmit] = useState(undefined);

    useEffect(() => {
        const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

        function readmultifiles(files) {
            var reader = new FileReader();

            function readFile(index) {
              if( index >= files.length ) return;
              var file = files[index];
              reader.onload = function(e) {  
                const buf = Buffer.from(e.target.result) // Convert data into buffer
                ipfs.add(buf, (err, result) => { // Upload buffer to IPFS
                    if(err) {
                        console.log(err)
                        return
                    }
                    let url = `https://ipfs.io/ipfs/${result}`
                    console.log(`Url --> ${url}`)
                    setUrlIPFS((prev) => ({ urls: [...prev.urls, result] }))

                    // ipfs.cat(result, (err, res) => {
                    //     console.log(Buffer.from(res, 'binary'))
                    // })
                })
                // do sth with bin
                readFile(index+1)
              }
              reader.readAsBinaryString(file);
            }
            readFile(0);
        }
        readmultifiles(newImages.images)
        console.log(urlIPFS.urls)
    }, [submit])

    
    const updateUploadedFiles = (files) => {
        setNewImages({ ...newImages, images: files })
        setCarouselItems({ ...newImages, images: files }.images.map((image) => { return <Item img={URL.createObjectURL(image)}/> }))
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
                        onChange={(event) => setBedNumber(event.target.value)}
                    />
                </div>
                <div className='MintFormRow'>
                    <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                        Number of Bathrooms
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="Number of Bathrooms"
                        onChange={(event) => setBathroomNumber(event.target.value)}
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
                        onChange={(event) => setSqFt(event.target.value)}
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
                {checkedUF && (
                    <div className='MintFormRow'>
                        <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                            Upload Images
                        </Typography>
                        <FileUpload 
                            accept=".jpg,.png,.jpeg,.gif"
                            label="Upload to IPFS"
                            multiple
                            updateFilesCb={updateUploadedFiles}
                        />
                    </div>
                )}
                {checkedIPFS && (
                    <div className='MintFormRow'>
                        <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                            IPFS Endpoints
                        </Typography>
                        <TextField
                            required
                            id="outlined-required"
                            label="IPFS Image 1"
                            onChange={(event) => setSqFt(event.target.value)}
                        />
                    </div>
                )}
                <div className='MintFormRow'>
                    <Button style={style.submitButton} variant="contained" onClick={() => {
                        setSubmit(true)
                        mintUserNFT(pubkey)
                    }}>Create NFT</Button>
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
