import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { getUserEmailById } from '../../auth/service';
import { useNavigate } from 'react-router-dom';
import { getFollowers } from '../services';

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

function FollowersModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const [followers, setFollowers] = useState([] as number[]);

    useEffect(() => {
        const getFollowersList = async () => {
            setFollowers(await getFollowers());
        }
        getFollowersList();
    }, [])

    return (
        <div>
            <Button onClick={handleOpen} variant='text' size='large'>
                {`followers: ${followers.length}`}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        followers.map((followId: number, index) => (
                            <div>
                                <Button key={index} variant='text' onClick={() => navigate(`/profile/${followId}`)}>
                                    {getUserEmailById(followId)}
                                </Button>
                            </div>
                        ))
                    }
                </Box>
            </Modal>
        </div>
    );
}

export default FollowersModal;