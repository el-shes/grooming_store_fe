import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function Review(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Reservation summary
      </Typography>
      <List disablePadding>
        {props.summary.map((item) => (
          <ListItem key={item.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={item.name} />
            <Typography variant="body2">{item.value}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${props.finalPrice}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}