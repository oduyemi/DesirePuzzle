import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';


interface CTAButtonProps extends ButtonProps {
  text: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, bgColor, _hover, ...props }) => {
  return (
    <Button bg={bgColor} _hover={_hover} {...props}>
      {text}
    </Button>
  );
};

export default CTAButton;