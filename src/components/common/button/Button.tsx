import React from 'react';
import { Button } from '@chakra-ui/react';

interface CustomButton {
	onClick?: (event: React.FormEvent<HTMLFormElement>) => void;
	mt?: number;
	width?: string;
	label?: string;
	isDisabled?: boolean;
	variant?: string;
}

const CommonButton: React.FC<CustomButton> = ({
	onClick,
	mt,
	width = '100%',
	label = 'Submit',
	isDisabled = false,
	variant = 'solid',
}) => {
	return (
		<Button
			className={
				variant === 'solid' ? 'custom-btn' : 'outline-custom-btn'
			}
			type="submit"
			mt={mt}
			width={width}
			onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
				onClick?.(event as unknown as React.FormEvent<HTMLFormElement>)
			}
			isDisabled={isDisabled}
		>
			{label}
		</Button>
	);
};

export default CommonButton;
