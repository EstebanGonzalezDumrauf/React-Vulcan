import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { getRibbonActions2 } from '../../store/FakeAPIButtons';
import * as Icons from '@mui/icons-material';

export const RibbonButtonsYesNot = () => {
    const [actions, setActions] = React.useState([]);

    React.useEffect(() => {
        getRibbonActions2().then(setActions);
    }, []);

    return (
        <ButtonGroup
    variant="contained"
    sx={{ mt: 2, mb: 2, border: 'none', boxShadow: 'none' }}
    aria-label="button group"
>

            {actions.map(({ text, icon, color }, index) => {
                const IconComponent = Icons[icon];
                return (
                    <Button
                        key={index}
                        startIcon={IconComponent ? <IconComponent /> : null}
                        style={{ backgroundColor: color, color: '#fff', textTransform: 'none' }}
                    >
                        {text}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
};
