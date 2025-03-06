import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FaEdit } from 'react-icons/fa';
import { TextField } from '@mui/material';
import { Tweet } from '../types';
import { useAppDispatch } from '../../../app/store';
import { editTweet } from '../slice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 3,
    '@media (max-width: 600px)': {
        width: '95%', // Sur mobile, plus large
    },
};

interface TweetProps {
    tweet: Tweet;
}

const EditTweetModal: React.FC<TweetProps> = ({ tweet }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(tweet.content);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();

    return (
        <Fragment>
            <Button
                onClick={handleOpen}
                variant="outlined"
                color="primary"
                size="large"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    borderRadius: '20px',
                    '&:hover': {
                        backgroundColor: 'rgba(29, 161, 242, 0.1)',
                    },
                }}
            >
                <FaEdit />
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
                                dispatch(editTweet({ tweetId: tweet.id, content }));
                                handleClose();
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
                            label="Edit your tweet"
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
                            Save Changes
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Fragment>
    );
};

export default EditTweetModal;
