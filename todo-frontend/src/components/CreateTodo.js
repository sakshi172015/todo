import React, {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {createTodo} from '../requests'
import Snackbar from '@mui/material/Snackbar';
import { TextField } from '@mui/material'

export default function EditTodo({showCreate, setShowCreate, }) {
    const [title, setTitle] = useState()
    const [note, setNote] = useState()
    const [link, setLink] = useState()
    const [icon, setIcon] = useState()
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const handleCreate = async() => {
        const response = await createTodo(title, link, icon, note)
        if(response.status === 200) {
            setMessage(response.data.message)
        } else {
            setMessage("Error occurred")
        }
        setOpen(true)
        setShowCreate(false)
    }
    return (
        <>
        <Dialog
            open={showCreate}
            onClose={() =>  setShowCreate(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Create"}
            </DialogTitle>
            <DialogContent>
                <TextField fullWidth id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} style={{margin: '5px'}}/>
                <TextField fullWidth id="outlined-basic" label="Note" variant="outlined" value={note} onChange={(e) => setNote(e.target.value)} style={{margin: '5px'}} />
                <TextField fullWidth id="outlined-basic" label="Link" variant="outlined" value={link} onChange={(e) => setLink(e.target.value)} style={{margin: '5px'}} />
                <TextField fullWidth id="outlined-basic" label="icon" variant="outlined" value={icon} onChange={(e) => setIcon(e.target.value)} style={{margin: '5px'}} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreate}>Create</Button>
              <Button onClick={() => setShowCreate(false)} autoFocus>
                Close
              </Button>
            </DialogActions>
        </Dialog>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <div>{message}</div>
        </Snackbar>
        </>
    )
}
