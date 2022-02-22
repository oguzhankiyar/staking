const calculateRates = (rate) => {
    const fn = (interest, day) => {
        const seconds = day * 24 * 60 * 60;
        const frequency = seconds / 7;
        const apr = ((1 + interest / 100) ** (1 / frequency) - 1) * frequency * 100;
        return Math.round(apr * 100) / 100;
    };

    return {
        daily: fn(rate, 1),
        weekly: fn(rate, 7),
        monthly: fn(rate, 30),
        yearly: fn(rate, 365)
    };
};

const calculateRewards = (rate, amount) => {
    const rates = calculateRates(rate);
    return {
        daily: rates.daily * amount / 100 / 365,
        weekly: rates.weekly * amount * 7 / 100 / 365,
        monthly: rates.monthly * amount * 30 / 100 / 365,
        yearly: rates.yearly * amount / 100
    };
};

const secondsUntilReward = () => {
    var d = new Date();
    var h = d.getUTCHours();
    var m = d.getUTCMinutes();
    var s = d.getUTCSeconds();
    return (24 * 60 * 60) - (h * 60 * 60) - (m * 60) - s;
};

const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    return `${hours}h ${minutes}m ${seconds}s`;
};

export { calculateRates, calculateRewards, secondsUntilReward, secondsToTime };