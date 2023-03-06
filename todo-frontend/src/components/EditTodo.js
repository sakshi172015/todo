import React, {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {editTodo} from '../requests'
import Snackbar from '@mui/material/Snackbar';
import { TextField } from '@mui/material'

export default function EditTodo({showEdit, setShowEdit, todo}) {
    const [title, setTitle] = useState(todo.title)
    const [note, setNote] = useState(todo.note)
    const [link, setLink] = useState(todo.link)
    const [icon, setIcon] = useState(todo.icon)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const handleEdit = async() => {
        const response = await editTodo(todo._id, title, link, icon, note, todo.status)
        if(response.status === 200) {
            setMessage(response.data.message)
            window.location.reload(true);
        } else {
            setMessage("Error occurred")
        }
        setOpen(true)
        setShowEdit(false)
    }
    return (
        <>
        <Dialog
            open={showEdit}
            onClose={() =>  setShowEdit(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Edit"}
            </DialogTitle>
            <DialogContent>
                <TextField fullWidth id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} style={{margin: '5px'}}/>
                <TextField fullWidth id="outlined-basic" label="Note" variant="outlined" value={note} onChange={(e) => setNote(e.target.value)} style={{margin: '5px'}} />
                <TextField fullWidth id="outlined-basic" label="Link" variant="outlined" value={link} onChange={(e) => setLink(e.target.value)} style={{margin: '5px'}} />
                <TextField fullWidth id="outlined-basic" label="icon" variant="outlined" value={icon} onChange={(e) => setIcon(e.target.value)} style={{margin: '5px'}} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEdit}>Edit</Button>
              <Button onClick={() => setShowEdit(false)} autoFocus>
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
