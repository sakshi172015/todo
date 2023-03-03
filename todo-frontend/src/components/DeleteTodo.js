import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {deleteTodo} from '../requests'
import Snackbar from '@mui/material/Snackbar';


export default function DeleteTodo({showDelete, setShowDelete, id}) {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const handleDelete = async() => {
        const response = await deleteTodo(id)
        if(response.status === 200) {
            setMessage(response.data.message)
        } else {
            setMessage("Error occurred")
        }
        setOpen(true)
        setShowDelete(false)
      }
    return (
        <Dialog
            open={showDelete}
            onClose={() =>  setShowDelete(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this todo?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDelete}>Yes</Button>
              <Button onClick={() => setShowDelete(false)} autoFocus>
                No
              </Button>
            </DialogActions>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <div>{message}</div>
            </Snackbar>
        </Dialog>
    )
}