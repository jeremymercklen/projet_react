import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { getUserEmailById } from '../../auth/service';
import { useNavigate } from 'react-router-dom';
import { getFollowers } from '../services';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    maxHeight: '80vh',
    overflowY: 'auto', // Défilement pour les longues listes
    width: '90%', // Par défaut, le modal occupe 90% de la largeur
    maxWidth: 500, // La largeur maximale est de 500px
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
        };
        getFollowersList();
    }, []);

    return (
        <div>
            <Button
                onClick={handleOpen}
                variant="contained"
                color="primary"
                sx={{
                    textTransform: 'none',
                    borderRadius: '20px',
                    padding: '8px 20px',
                    boxShadow: 2,
                    '&:hover': {
                        backgroundColor: '#1DA1F2',
                    },
                }}
            >
                {`Followers: ${followers.length}`}
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="followers-modal-title"
                aria-describedby="followers-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="followers-modal-title"
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            marginBottom: 2,
                            textAlign: 'center',
                        }}
                    >
                        Followers
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />

                    <List>
                        {followers.length === 0 ? (
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                                No followers yet.
                            </Typography>
                        ) : (
                            followers.map((followId: number, index) => (
                                <ListItem
                                    key={index}
                                    onClick={() => navigate(`/profile/${followId}`)}
                                    sx={{
                                        borderRadius: 1,
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={getUserEmailById(followId)}
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    />
                                </ListItem>
                            ))
                        )}
                    </List>
                </Box>
            </Modal>
        </div>
    );
}

export default FollowersModal;
