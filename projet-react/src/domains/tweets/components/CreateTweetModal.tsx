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
    width: '90%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    '@media (max-width: 600px)': {
        width: '95%', // Sur mobile, plus large
    },
};

function CreateTweetModal() {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();

    return (
        <div>
            <Button
                onClick={handleOpen}
                variant="contained"
                color="primary"
                size="large"
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    borderRadius: '50%',
                    width: 60,
                    height: 60,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 3,
                    '&:hover': {
                        backgroundColor: '#1DA1F2',
                        boxShadow: 6,
                    },
                }}
            >
                <FaPlus size={24} color="white" />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (content.trim()) {
                                dispatch(createTweet(content));
                                handleClose();
                                setContent('');
                            }
                        }}
                    >
                        <TextField
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            label="What's happening?"
                            sx={{
                                marginBottom: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px',
                                },
                                '& .MuiInputBase-root': {
                                    fontSize: '1rem',
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                borderRadius: '20px',
                                padding: '10px',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: '#1DA1F2',
                                },
                            }}
                        >
                            Post
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default CreateTweetModal;
