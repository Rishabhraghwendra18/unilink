'use client'

import React from 'react';
import {Button} from '@mui/material/';
import { alpha, styled } from '@mui/material/styles';

const CustomButton = styled(Button)(({theme})=>({
    color:'white',
    backgroundColor:'#00C4F4',
    borderRadius:'0.33rem',
    fontWeight:'bold',
    textTransform:'none'
}));

function CustomCommonButton({children}) {
  return (
    <CustomButton variant="contained">{children}</CustomButton>
  )
}

export default CustomCommonButton