import { ThemeOptions } from '@mui/material/styles';

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1DA1F2', // Couleur bleue de Twitter
      contrastText: '#fff', // Texte clair sur la couleur primaire
    },
    secondary: {
      main: '#657786', // Couleur gris pour les éléments secondaires
      contrastText: '#fff', // Texte clair sur la couleur secondaire
    },
    background: {
      default: '#E6ECF0', // Couleur de fond légère
      paper: '#fff', // Fond des cartes ou blocs
    },
    text: {
      primary: '#14171A', // Texte sombre pour la lisibilité
      secondary: '#657786', // Texte secondaire gris
    },
    divider: 'rgba(0, 0, 0, 0.12)', // Lignes de séparation légères
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // Boutons avec des bords arrondis
          padding: '8px 20px', // Espacement du texte dans le bouton
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Ombre subtile
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff', // Fond blanc pour la barre d'application
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Légère ombre sous la barre
        },
      },
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DA1F2', // Couleur bleue de Twitter
      contrastText: '#fff', // Texte clair sur la couleur primaire
    },
    secondary: {
      main: '#657786', // Gris pour les éléments secondaires
      contrastText: '#fff', // Texte clair sur la couleur secondaire
    },
    background: {
      default: '#15202B', // Fond sombre global
      paper: '#192734', // Fond des cartes ou blocs en sombre
    },
    text: {
      primary: '#E1E8ED', // Texte clair sur fond sombre
      secondary: '#AAB8C2', // Texte secondaire gris clair
    },
    divider: 'rgba(255, 255, 255, 0.12)', // Ligne de séparation subtile en sombre
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // Boutons arrondis
          padding: '8px 20px', // Espacement du texte
          boxShadow: '0px 2px 4px rgba(255, 255, 255, 0.1)', // Ombre plus subtile en mode sombre
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#192734', // Fond sombre de la barre d'application
          boxShadow: '0px 4px 6px rgba(255, 255, 255, 0.1)', // Ombre claire sous la barre
        },
      },
    },
  },
};
