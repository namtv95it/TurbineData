import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';
// import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

const AuthCard = forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            ...others
        }: any,
        ref
    ) => {
        // const theme = useTheme();

        return (
            <></>
            // <Card
            //     ref={ref}
            //     {...others}
            //     sx={{
            //         border: border ? '1px solid' : 'none',
            //         borderColor: '#90caf9' + 25,
            //         boxShadow: 'inherit',
            //         ...sx
            //     }}
            // >
            //     {/* card header and action */}
            //     {title &&
            //         (<CardHeader sx={headerSX} title={darkTitle ? <Typography variant="h3">{title}</Typography> : title} action={secondary} />)
            //     }

            //     {/* content & header divider */}
            //     {title && <Divider />}

            //     {/* card content */}
            //     {content && (
            //         <CardContent sx={contentSX} className={contentClass}>
            //             {children}
            //         </CardContent>
            //     )}
            //     {!content && children}
            // </Card>
        );
    }
);

AuthCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default AuthCard;