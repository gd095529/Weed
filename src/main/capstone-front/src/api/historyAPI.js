import axios from 'axios';

export const fetchHistory = async () => {
    try {
        const response = await axios.get('/history', {
            withCredentials: true
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching history:', error);
    }
};