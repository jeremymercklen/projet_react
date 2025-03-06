import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FaTrash } from 'react-icons/fa';
import { Typography } from '@mui/material';
import { Tweet } from '../types';
import { deleteTweet } from '../slice';
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

interface TweetProps {
    tweet: Tweet
}

const DeleteTweetModal: React.FC<TweetProps> = ({ tweet }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();

    return (
        <Fragment>
            <Button onClick={handleOpen}><FaTrash color='red' /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography>Do you really want to delete this post ?</Typography>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => {
                        dispatch(deleteTweet(tweet.id));
                        handleClose();
                    }}>Yes</Button>
                </Box>
            </Modal>
        </Fragment>
    );
}

export default DeleteTweetModal;