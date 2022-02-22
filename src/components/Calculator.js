import React, { useEffect, useState } from 'react';
import { Box, NumberInput, InputGroup, Input, InputRightAddon, NumberInputField, Table, TableCaption, Thead, Tbody, Th, Tr, Td, InputLeftAddon, Spacer, Center, Stack } from '@chakra-ui/react';

import { useStaking } from '../hooks';
import { calculateRates, calculateRewards } from '../utils';

export function Calculator() {
	const [amount, setAmount] = useState(100000);
	const { staked, rate } = useStaking();

	const rates = calculateRates(rate);
	const rewards = calculateRewards(rate, amount);

	useEffect(() => {
		setAmount(staked);
	}, [staked]);

	const handleAmountChange = (value) => {
		setAmount(value);
	}

	return (
		<Box>
			<Stack spacing={5}>
				<Box alignSelf="center">
					<InputGroup size='sm'>
						<NumberInput min={0} value={amount} onChange={handleAmountChange}>
							<NumberInputField />
						</NumberInput>
						<InputRightAddon children='GO' />
					</InputGroup>
				</Box>
				<Spacer />
			</Stack>
			<Table variant='striped' colorScheme='gray'>
				<TableCaption>Rates are estimated and not guaranteed.</TableCaption>
				<Thead>
					<Tr>
						<Th>Day</Th>
						<Th>APY</Th>
						<Th isNumeric>Amount</Th>
						<Th isNumeric>Reward</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>1</Td>
						<Td>{rates.daily.toFixed(2)}%</Td>
						<Td isNumeric>{(amount).toLocaleString()} GO</Td>
						<Td isNumeric>{(rewards.daily).toLocaleString()} GO</Td>
					</Tr>
					<Tr>
						<Td>7</Td>
						<Td>{rates.weekly.toFixed(2)}%</Td>
						<Td isNumeric>{(amount).toLocaleString()} GO</Td>
						<Td isNumeric>{(rewards.weekly).toLocaleString()} GO</Td>
					</Tr>
					<Tr>
						<Td>30</Td>
						<Td>{rates.monthly.toFixed(2)}%</Td>
						<Td isNumeric>{(amount).toLocaleString()} GO</Td>
						<Td isNumeric>{(rewards.monthly).toLocaleString()} GO</Td>
					</Tr>
					<Tr>
						<Td>365</Td>
						<Td>{rates.yearly.toFixed(2)}%</Td>
						<Td isNumeric>{(amount).toLocaleString()} GO</Td>
						<Td isNumeric>{(rewards.yearly).toLocaleString()} GO</Td>
					</Tr>
				</Tbody>
			</Table>
		</Box>
	);
}
