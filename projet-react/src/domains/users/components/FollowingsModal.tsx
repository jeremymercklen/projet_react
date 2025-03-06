import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { getUserEmailById } from '../../auth/service';
import { useNavigate } from 'react-router-dom';
import { getFollowings } from '../services';
import { Avatar, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { FaRegUserCircle } from 'react-icons/fa'; // Icône utilisateur

// Styles du modal, plus responsive
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
    overflowY: 'auto', // Pour les longues listes
    width: '90%', // Le modal occupe 90% de la largeur par défaut
    maxWidth: 500, // La largeur maximale est de 500px
    '@media (max-width: 600px)': {
        width: '95%', // Sur mobile, il occupe 95% de la largeur
    },
    '@media (max-width: 400px)': {
        maxWidth: '100%', // Sur très petit écran, occupe toute la largeur
        p: 2, // Padding réduit sur petit écran
    },
};

function FollowingsModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const [followings, setFollowings] = useState([] as number[]);

    useEffect(() => {
        const getFollowingsList = async () => {
            setFollowings(await getFollowings());
        }
        getFollowingsList();
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
                {`Followings: ${followings.length}`}
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="followings-modal-title"
                aria-describedby="followings-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="followings-modal-title"
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            marginBottom: 2,
                            textAlign: 'center',
                        }}
                    >
                        Followings
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />

                    <List>
                        {followings.length === 0 ? (
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                                No followings yet.
                            </Typography>
                        ) : (
                            followings.map((followId: number, index) => (
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

export default FollowingsModal;
