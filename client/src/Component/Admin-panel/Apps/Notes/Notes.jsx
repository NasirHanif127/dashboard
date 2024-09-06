import {
    Grid,
    Button,
    List,
    ListSubheader,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment

} from "@mui/material";
import { useState } from "react";
import JoditEditor from "jodit-react";
import "./Notes.css"


const Notes = () => {
    const [saveInput, setSaveInput] = useState(false);
    const [note, setNote]=useState("");
    const [filename, setFilename]=useState("");

    const saveFile = ()=>{
            console.log( filename,note)
    }

    const design = (

        <>
            <div
                className=" bg-white shadow-sm"
                style={{ borderRadius: "10px" }}
            >

                <Grid container className="p-3">
                    <Grid
                        item
                        xs={12}
                        sm={3}
                        style={{
                            borderRight: "1px solid #f5f5f5"
                        }}

                    ><Button
                        sx={{ mr: 5 }}
                        className="py-2 px-3 mb-4"
                        variant="outlined"
                    >New File</Button>

                        <Button
                            onClick={() => setSaveInput(!saveInput)}
                            className="py-2 px-3 mb-4"
                            variant="outlined" color="error">
                            Save File
                        </Button>

                        {
                            saveInput ?
                                <FormControl>
                                    <InputLabel>Filename</InputLabel>
                                    <OutlinedInput
                                        // eroror={error.password.state}
                                        // helperText={error.password.message}
                                        variant="outlined"
                                        name="filename"
                                        label={"Filename"}
                                        value={filename}
                                        onChange={(e)=>setFilename(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton 
                                                onClick={saveFile}
                                                >
                                                    <span className="material-icons-outlined">save</span>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl> :
                                null
                        }

                        <List
                            subheader={<ListSubheader>Saved File</ListSubheader>}
                        >
                            
                            <ListItem sx={{ py: 0 }}>
                                <ListItemButton>
                                    <ListItemText 
                                    sx={{
                                        color : "black"
                                    }}
                                    primary={"my demo file"} />
                                    <IconButton color="error">
                                        <span className="material-icons-outlined">delete</span>
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemButton>
                                    <ListItemText 
                                    sx={{
                                        color : "black"
                                    }}
                                    primary={"my demo file"} />
                                    <IconButton color="error">
                                        <span className="material-icons-outlined">delete</span>
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemButton>
                                    <ListItemText 
                                    sx={{
                                        color : "black"
                                    }}
                                    primary={"my demo file"} />
                                    <IconButton color="error">
                                        <span className="material-icons-outlined">delete</span>
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                           
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={9} >
                        <JoditEditor 
                        config={{height : "850px"}}
                        value={note}
                        onBlur={(data)=>setNote(data)}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    );
    return design
}

export default Notes