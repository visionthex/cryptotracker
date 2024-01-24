import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import btcImage from './img/btc.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const contributors = [
  {
    name: 'Charles Sanders',
    role: 'Software Developer',
    contribution: 'Frontend/Backend Development',
    github: 'https://github.com/visionthex',
    linkedin: 'https://linkedin.com/in/charles-w-sanders',
    twitter: 'https://twitter.com/visionthex',
    avatar: 'https://contrib.rocks/image?repo=visionthex/admin_console'
  },
  {
    name: 'Braden Walker',
    role: 'Software Developer',
    contribution: 'Frontend Development',
    github: 'https://github.com/WalkerB20',
    linkedin: 'https://linkedin.com/in/braden_walker',
    twitter: 'https://twitter.com/WalkerB20',
    avatar: 'https://contrib.rocks/image?repo=WalkerB20/todo-list-workshop-main'
  },
  {
    name: 'Eddie Licaycay',
    role: 'Developer',
    contribution: 'Frontend Development',
    github: 'https://github.com/EddieLicaycay',
    linkedin: 'https://linkedin.com/in/eddie_licaycay',
    twitter: 'https://twitter.com/EddieLicaycay',
    avatar: 'https://contrib.rocks/image?repo=EddieLicaycay/To-Do-List'
  },
];

const Contact = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <List className={classes.root}>
          <Typography variant="h4" component="h1">
            CONTRIBUTORS:
          </Typography>
          {contributors.map((contributor, index) => (
            <ListItem alignItems="flex-start" key={contributor.github}>
              <ListItemAvatar>
                <Avatar
                  alt={`${contributor.name}'s profile picture`}
                  src={contributor.avatar}
                />
              </ListItemAvatar>
              <ListItemText
                primary={contributor.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Role: {contributor.role}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Contribution: {contributor.contribution}
                    </Typography>
                    <Box component="span" display="block">
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Socials:
                        <Box component="span" display="flex" alignItems="center">
                          <a
                            href={contributor.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GitHubIcon />
                            <Box component="span" visibility="hidden">
                              GitHub
                            </Box>
                          </a>
                          <a
                            href={contributor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LinkedInIcon />
                            <Box component="span" visibility="hidden">
                              LinkedIn
                            </Box>
                          </a>
                          <a
                            href={contributor.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <TwitterIcon />
                            <Box component="span" visibility="hidden">
                              Twitter
                            </Box>
                          </a>
                        </Box>
                      </Typography>
                    </Box>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12} sm={4}>
      <img src={btcImage} alt="Bitcoin" style={{ width: '165%', height: '100%', objectFit: 'cover', marginLeft: '-190px' }} />
      </Grid>
    </Grid>
  );
};

export default Contact;