import React, { useEffect, useState } from 'react';
import { useDisclosure, Stack, Button, Flex, Box, Divider, Stat, StatLabel, StatNumber, Modal, ModalBody, ModalContent, ModalCloseButton, ModalOverlay, Image, ModalHeader } from '@chakra-ui/react';

import { useStaking } from '../hooks';
import { Calculator } from './Calculator';
import { Stake } from './Stake';
import { Unstake } from './Unstake';
import { calculateRewards, secondsUntilReward, secondsToTime } from '../utils';

export function MyStake() {
	const { staked, rate } = useStaking();
	const { isOpen: isCalculatorOpen, onOpen: openCalculator, onClose: closeCalculator } = useDisclosure();
	const { isOpen: isStakeOpen, onOpen: openStake, onClose: closeStake } = useDisclosure();
	const { isOpen: isUnStakeOpen, onOpen: openUnstake, onClose: closeUnstake } = useDisclosure();
	const [seconds, setSeconds] = useState(0);

	const rewards = calculateRewards(rate, staked);

	useEffect(() => {
		const timer = setInterval(() => {
			setSeconds(seconds - 1);

			if (seconds <= 0) {
				setSeconds(secondsUntilReward());
			}
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [seconds]);

	return (
		<Box margin={5} backgroundColor="white" borderWidth={1} boxShadow="0 0 10px #ccc" borderRadius={10}>
			<Box paddingX={5} paddingY={6}>
				<Flex justifyContent="space-between">
					<Stack>
						<Stat>
							<StatLabel color="gray">YOUR STAKE</StatLabel>
							<StatNumber>{staked.toLocaleString()} GO</StatNumber>
						</Stat>
					</Stack>
					<Stack direction="row" align="center">
						<Button colorScheme="purple" size="sm" onClick={openUnstake}>-</Button>
						<Button colorScheme="green" size="sm" onClick={openStake}>+</Button>

						<Modal isOpen={isStakeOpen} onClose={closeStake} size="sm" isCentered>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>Stake</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<Stake close={closeStake} />
								</ModalBody>
							</ModalContent>
						</Modal>

						<Modal isOpen={isUnStakeOpen} onClose={closeUnstake} size="sm" isCentered>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>Unstake</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<Unstake close={closeUnstake} />
								</ModalBody>
							</ModalContent>
						</Modal>
					</Stack>
				</Flex>
			</Box>
			<Divider />
			<Box paddingX={5} paddingY={6}>
				<Stat>
					<StatLabel color="gray">REWARDS IN</StatLabel>
					<StatNumber>{secondsToTime(seconds)}</StatNumber>
				</Stat>
			</Box>
			<Divider />
			<Box paddingX={5} paddingY={6}>
				<Flex justifyContent="space-between">
					<Stat>
						<StatLabel color="gray">ESTIMATED REWARDS</StatLabel>
						<StatNumber>{rewards.daily.toLocaleString()} GO</StatNumber>
					</Stat>
					<Stack direction="row" align="center">
						<Image src="/img/calculator.svg" onClick={openCalculator} cursor="pointer" />
						<Modal isOpen={isCalculatorOpen} onClose={closeCalculator} size="xl" isCentered>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>Calculator</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<Calculator />
								</ModalBody>
							</ModalContent>
						</Modal>
					</Stack>
				</Flex>
			</Box>
		</Box>
	);
}
