// import Divider from "@mui/material/Divider/Divider";
// import Grid from "@mui/material/Grid/Grid";
// import Stack from "@mui/material/Stack/Stack";
import { Link } from "react-router-dom";
import AuthCardWrapper from "./AuthCardWrapper";
// import { Typography } from '@mui/material';
import AuthLogin from "./form/AuthLogin";

export default function Login() {
    const matchDownSM = true
    return (
        <></>
        // <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh', background: 'aliceblue' }}>
        //     <Grid item xs={12}>
        //         <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
        //             <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
        //                 <AuthCardWrapper>
        //                     <Grid container spacing={2} alignItems="center" justifyContent="center">
        //                         <Grid item sx={{ mb: 3 }}>
        //                             <Link to="#">
        //                                 {/* <Logo /> */}
        //                             </Link>
        //                         </Grid>
        //                         <Grid item xs={12}>
        //                             <Grid
        //                                 container
        //                                 direction={matchDownSM ? 'column-reverse' : 'row'}
        //                                 alignItems="center"
        //                                 justifyContent="center"
        //                             >
        //                                 <Grid item>
        //                                     <Stack alignItems="center" justifyContent="center" spacing={1}>
        //                                         {/* <Typography
        //                                             color="primary"
        //                                             gutterBottom
        //                                             variant={matchDownSM ? 'h4' : 'h3'}
        //                                         >
        //                                             Hi, Welcome Back
        //                                         </Typography>
        //                                         <Typography
        //                                             variant="caption"
        //                                             fontSize="14px"
        //                                             textAlign={matchDownSM ? 'center' : 'inherit'}
        //                                         >
        //                                             Enter your credentials to continue
        //                                         </Typography> */}
        //                                     </Stack>
        //                                 </Grid>
        //                             </Grid>
        //                         </Grid>
        //                         <Grid item xs={12}>
        //                             <AuthLogin />
        //                         </Grid>
        //                         <Grid item xs={12}>
        //                             <Divider />
        //                         </Grid>
        //                         <Grid item xs={12}>
        //                             <Grid item container direction="column" alignItems="center" xs={12}>
        //                                 {/* <Typography
        //                                     component={Link}
        //                                     to="#"
        //                                     variant="subtitle1"
        //                                     sx={{ textDecoration: 'none' }}
        //                                     color="primary"
        //                                 >
        //                                     Don&apos;t have an account?
        //                                 </Typography> */}
        //                             </Grid>
        //                         </Grid>
        //                     </Grid>
        //                 </AuthCardWrapper>
        //             </Grid>
        //         </Grid>
        //     </Grid>
        // </Grid>
    )
}