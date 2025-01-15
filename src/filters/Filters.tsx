import React, { useState } from 'react';

import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import { Box, TextField, Switch, FormControlLabel, Button, Collapse, InputBase } from '@mui/material';

import FilterDivider from '@materials/FilterDivider';
import FilterSwitch from '@materials/FilterSwitch';

import customTheme from '../theme';

interface FiltersProps {
    context: string;
    showDescription?: boolean;
    handleSortNoDescriptionChange?: () => void;
    showIdeas?: boolean;
    handleSortNoIdeasChange?: () => void;
    handleSortNewChange?: () => void;
    handleSortAlphaBeticalChange?: () => void;
    searchQuery?: string;
    handleSearchInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

function Filters({ 
    context,
    showDescription,
    handleSortNoDescriptionChange,
    showIdeas,
    handleSortNoIdeasChange,
    handleSortNewChange,
    handleSortAlphaBeticalChange,
    searchQuery,
    handleSearchInputChange, 
}: FiltersProps) {
    
    const [expanded, setExpanded] = useState(false);
    
    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <Box sx={{
            display: 'flexbox',
            flexDirection: 'row',
            width: '99%',
            backgroundColor: customTheme.palette.secondary.main,
            borderRadius: '15px',
            gap: '12px',
            marginBottom: '12px',
            flexWrap: 'wrap',
          }}>
            <Button onClick={handleExpand}>
                {expanded ? 'Collapse Filters' : 'Expand Filters'}
            </Button>
            <InputBase
                sx={{
                    borderRadius: '10px',
                    backgroundColor: customTheme.palette.info.main,
                    color: customTheme.palette.secondary.main,
                    padding: '10px',
                }}
                inputProps={{
                    style: {
                        margin: '0 10px',
                    },
                }}
                id={'0'}
                placeholder='Search'
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box sx={{
                    display: 'inline-flex',
                    flexDirection: { sm: 'row', xs: 'column' },
                    flexwrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '99%',
                    height: '100%',
                    margin: '12px',
                }}>
                    <FormControlLabel
                        control={
                            <FilterSwitch 
                                checked={showDescription} 
                                onChange={handleSortNoDescriptionChange} 
                            />
                        }
                        label="Show Description"
                        sx={{color: customTheme.palette.primary.main}}
                    />
                    <FilterDivider/>
                    <FormControlLabel
                        control={
                            <FilterSwitch 
                                checked={showIdeas} 
                                onChange={handleSortNoIdeasChange}
                            />
                        }
                        label="Show Ideas"
                        sx={{color: customTheme.palette.primary.main}}
                    />
                    <FilterDivider/>
                    <FormControlLabel
                        control={
                            <FilterSwitch onChange={handleSortNewChange} />}
                        label="Sort by New"
                        sx={{color: customTheme.palette.primary.main}}
                    />
                    <FilterDivider/>
                    <FormControlLabel
                        control={
                            <FilterSwitch onChange={handleSortAlphaBeticalChange} />}
                        label="Sort Alphabetically"
                        sx={{color: customTheme.palette.primary.main}}
                    />
                    </Box>
            </Collapse>
          </Box>
    );
};

export default Filters;
