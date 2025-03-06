import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FaPlus } from 'react-icons/fa';
import { TextField } from '@mui/material';
import { createTweet } from '../slice';
import { useAppDispatch } from '../../../app/store';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function CreateTweetModal() {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();

    return (
        <div>
            <Button onClick={handleOpen} variant='contained' size='large' sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                display: 'flex',
                justifyContent: 'center'
            }}><FaPlus /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(createTweet(content));
                        handleClose();
                        setContent('');
                    }}>
                        <TextField
                            value={content}
                            onChange={(e) => setContent(e.target.value)} />
                        <Button type='submit'>
                            Post
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default CreateTweetModal;