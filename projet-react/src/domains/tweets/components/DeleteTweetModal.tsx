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
    width: '90%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    '@media (max-width: 600px)': {
        width: '95%', // Sur mobile, modal plus large
    },
};

interface TweetProps {
    tweet: Tweet;
}

const DeleteTweetModal: React.FC<TweetProps> = ({ tweet }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();

    return (
        <Fragment>
            <Button
                onClick={handleOpen}
                variant="outlined"
                color="error"
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
                <FaTrash color="red" />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Do you really want to delete this post?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            sx={{
                                flex: 1,
                                marginRight: 1,
                                borderRadius: 2,
                                color: 'text.primary',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                },
                            }}
                        >
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                dispatch(deleteTweet(tweet.id));
                                handleClose();
                            }}
                            variant="contained"
                            color="error"
                            sx={{
                                flex: 1,
                                marginLeft: 1,
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: 'red',
                                },
                            }}
                        >
                            Yes
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Fragment>
    );
};

export default DeleteTweetModal;
