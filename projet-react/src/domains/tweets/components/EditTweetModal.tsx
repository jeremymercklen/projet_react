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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface TweetProps {
    tweet: Tweet
}

const EditTweetModal: React.FC<TweetProps> = ({ tweet }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(tweet.content);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();

    return (
        <Fragment>
            <Button onClick={handleOpen}><FaEdit /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(editTweet({ tweetId: tweet.id, content }));
                        handleClose();
                    }}>
                        <TextField
                            value={content}
                            onChange={(e) => setContent(e.target.value)} />
                        <Button type='submit'>
                            Edit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Fragment>
    );
}

export default EditTweetModal;