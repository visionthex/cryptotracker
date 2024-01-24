import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Link } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: "auto",
    maxWidth: 800,
    wordWrap: "break-word",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  list: {
    marginBottom: theme.spacing(2),
    whiteSpace: "pre-wrap",
  },
  preWrap: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.title}>Crypto Tracker App</Typography>
      <Typography variant="h5">Description</Typography>
      <Typography paragraph>
        Crypto Tracker is a React application designed to help users track their cryptocurrency investments. It provides real-time updates on price changes, enabling users to make informed decisions about their cryptocurrency investments.
      </Typography>
      <Typography variant="h5">Features</Typography>
      <ul className={classes.list}>
        <li>Real-time tracking: Stay updated with the latest cryptocurrency prices.</li>
        <li>Alerts: Set up notifications to be alerted when a cryptocurrency reaches a certain price.</li>
        <li>Dark Mode: Switch between light and dark themes for a comfortable viewing experience.</li>
        <li>Search: Search for specific cryptocurrencies in the CoinTable.</li>
        <li>Routing: Uses React Router for efficient routing between different components of the application.</li>
      </ul>
      <Typography variant="h5">Installation</Typography>
      <Box component="pre" className={classes.preWrap}>
        <ol>
          <li>Clone the repository: git clone https://github.com/visionthex/sdi-blended-project2-scaffold</li>
          <li>Navigate to the project directory: cd sdi-blended-project2-scaffold</li>
          <li>Install dependencies: npm install</li>
          <li>Start the app: npm start</li>
        </ol>
      </Box>
      <Typography variant="h5">Usage</Typography>
      <Typography paragraph>
        After starting the app, navigate to the main page to add cryptocurrencies to your portfolio. You can start tracking their prices in real-time on the dashboard. Set alerts to get notified when a cryptocurrency reaches a certain price. Use the search bar in the NavBar to find specific cryptocurrencies.
      </Typography>
      <Typography variant="h5">Contributors</Typography>
      <Typography paragraph>
        Thanks to the following people who have contributed to this project:
      </Typography>
      <Link href="https://github.com/visionthex/sdi-blended-project2-scaffold/graphs/contributors">
        <img src="https://contrib.rocks/image?repo=visionthex/admin_console" alt="Contributors" />
      </Link>
      <Link href="https://github.com/visionthex/sdi-blended-project2-scaffold/graphs/contributors">
        <img src="https://contrib.rocks/image?repo=EddieLicaycay/To-Do-List" alt="Contributors" />
      </Link>
      <Link href="https://github.com/visionthex/sdi-blended-project2-scaffold/graphs/contributors">
        <img src="https://contrib.rocks/image?repo=WalkerB20/todo-list-workshop-main" alt="Contributors" />
      </Link>
    </div>
  );
};

export default About;