import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { modelNames } from "ra-data-simple-prisma";

const InfoPage = () => {
  return (
    <Box p={3}>
      <Typography variant="h5">Links</Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {modelNames.map(model => (
          <ListItem key={model}>
            <ListItemText>{model}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default InfoPage;
