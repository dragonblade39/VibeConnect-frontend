import {
  Button,
  Dialog,
  DialogContent,
  Fade,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function Modal({ open, closeDialog, title, subtitle, deleteFunction }) {
  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="sm"
      scroll="body"
      onClose={deleteFunction}
      TransitionComponent={Transition}
    >
      <DialogContent
        sx={{
          px: 5,
          py: 3,
          position: "relative",
          background: "linear-gradient(to right,#CC7BAC,#F5D8DC)",
          backdropFilter: "blur(12px)",
          border: "3px solid #75006f",
        }}
      >
        <IconButton
          size="medium"
          onClick={closeDialog}
          sx={{ position: "absolute", right: "1rem", top: "1rem" }}
        >
          X
        </IconButton>

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4">{title}</Typography>
              {/* Adjust the styling of the hr element here */}
              <hr
                className="modalhr"
                sx={{
                  opacity: 1,
                  color: "#ff4081 !important",
                  width: "50px",
                  mt: 1,
                }}
              />

              <Typography variant="h5">{subtitle}</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
          >
            <Button
              onClick={deleteFunction}
              size="medium"
              sx={{
                fontWeight: "700",
                border: "2px solid #75006f",
                width: "100px",
                color: "black",
                background: "none",
              }}
            >
              Ok
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
