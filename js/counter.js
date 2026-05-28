/* Live day counter — update START_DATE to change the anniversary */
const START_DATE = '2025-07-30';

const days = Math.floor((new Date() - new Date(START_DATE)) / 86400000);
document.getElementById('dayCount').textContent = days;
