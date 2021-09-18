import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './MintForm.css'

function MintForm() {
    const style = {
        singleTextFieldTitle: {
            display: "inline-block",
            height: "56px",
            'line-height': "56px",
            margin: "8px"
        }
    }

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
                        NFT Asset Code
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="NFT Asset Code"
                    />
                    <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                        NFT Asset Code
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="NFT Asset Code"
                    />
                </div>
                <div className='MintFormRow'>
                    <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                        NFT Asset Code
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="NFT Asset Code"
                    />
                    <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                        NFT Asset Code
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="NFT Asset Code"
                    />
                </div>
                <div className='MintFormRow'>
                    <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                        NFT Asset Code
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="NFT Asset Code"
                    />
                    <Typography variant="h6" component="div" style={style.singleTextFieldTitle}>
                        NFT Asset Code
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="NFT Asset Code"
                    />
                </div>
            </div>
        </Box>
    )
}

export default MintForm;