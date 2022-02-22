import React, { useEffect, useState } from 'react';
import { CircularProgress, NumberInput, NumberInputField, Stack, Button, Slider, SliderTrack, Box, SliderFilledTrack, SliderThumb, Text, Center, Spacer, useToast } from '@chakra-ui/react'

import { useStaking } from '../hooks';

export function Stake(props) {
	const { balance, stake, decimal } = useStaking();
	const [amount, setAmount] = useState(0);
	const [percent, setPercent] = useState(100);
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const handleSliderChange = (value) => {
		setPercent(value);
		setAmount(parseInt(balance) * value / 100);
	};

	const handleAmountChange = (value) => {
		setAmount(value);
	};

	const handleStake = async () => {
		setLoading(true);
		
		const ok = await stake(amount);

		setLoading(false);

		if (props.close) {
			props.close();
		}

		if (ok) {
			toast({
				title: 'Staked successfully.',
				status: 'success',
				duration: 5000,
				position: 'top',
				isClosable: true,
			});
		} else {
			toast({
				title: 'Staking cancelled.',
				status: 'error',
				duration: 5000,
				position: 'top',
				isClosable: true,
			});
		}
	};

	useEffect(() => {
		setAmount(balance);
	}, [balance]);

	if (loading) {
		return (
			<Stack spacing={5}>
				<Spacer />
				<CircularProgress isIndeterminate alignSelf="center" />
				<Spacer />
				<Spacer />
			</Stack>
		);
	}

	return (
		<Stack spacing={5}>
			<NumberInput min={0} max={parseInt(balance)} value={amount} onChange={handleAmountChange}>
				<NumberInputField />
			</NumberInput>
			<Center>
				<Text>{percent}%</Text>
			</Center>
			<Slider defaultValue={percent} min={0} max={100} step={10} onChange={handleSliderChange}>
				<SliderTrack bg='red.100'>
					<Box position='relative' right={10} />
					<SliderFilledTrack bg='tomato' />
				</SliderTrack>
				<SliderThumb boxSize={5} backgroundColor="tomato" />
			</Slider>
			<Button colorScheme="green" onClick={handleStake}>
				STAKE
			</Button>
			<Spacer />
		</Stack>
	);
}