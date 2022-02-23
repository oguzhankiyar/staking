import React, { useEffect, useState } from 'react';
import { CircularProgress, NumberInput, NumberInputField, Stack, Button, Slider, SliderTrack, Box, SliderFilledTrack, SliderThumb, Text, Center, Spacer, useToast, InputGroup, InputRightAddon } from '@chakra-ui/react'

import { useStaking } from '../hooks';

export function Stake(props) {
	const { balance, stake } = useStaking();
	const [amount, setAmount] = useState(0);
	const [percent, setPercent] = useState(100);
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const handleSliderChange = (value) => {
		setPercent(value);
		handleAmountChange(balance * value / 100);
	};

	const handleAmountChange = (value) => {
		if (value.length === 0) {
			value = 0;
		}
		
		value = parseFloat(value);

		if (value !== 0 && !value) {
			return;
		}

		const max = (balance - 0.3);

		if (max <= 0 || value <= 0) {
			setAmount(0);
			setPercent(0);
		} else {
			value = Math.min(value, max);

			setAmount(value);
			setPercent(Math.floor(value * 100 / max));
		}
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
		handleAmountChange(balance);
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
			<InputGroup>
				<NumberInput width="full" value={amount} onChange={handleAmountChange}>
					<NumberInputField />
				</NumberInput>
				<InputRightAddon children='GO' />
			</InputGroup>
			<Center>
				<Text>{percent}%</Text>
			</Center>
			<Slider value={percent} min={0} max={100} step={1} onChange={handleSliderChange} focusThumbOnChange={false}>
				<SliderTrack bg='red.100'>
					<Box position='relative' right={10} />
					<SliderFilledTrack bg='tomato' />
				</SliderTrack>
				<SliderThumb boxSize={5} backgroundColor="tomato" />
			</Slider>
			<Button colorScheme="green" onClick={handleStake} disabled={amount <= 0}>
				STAKE
			</Button>
			<Spacer />
		</Stack>
	);
}