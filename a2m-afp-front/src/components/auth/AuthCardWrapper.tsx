// import { Box } from '@mui/material';
import AuthCard from './AuthCard';

const AuthCardWrapper = ({ children, ...other }: any) => (
    <AuthCard
        sx={{
            maxWidth: { xs: 400, lg: 475 },
            margin: { xs: 2.5, md: 3 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
    >
        {/* <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box> */}
    </AuthCard>
);

export default AuthCardWrapper;