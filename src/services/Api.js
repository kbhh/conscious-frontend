import axios from 'axios';
import AuthHeader from '@/auth/authHeader';

// Returns an axios object
export default () => {
    return axios.create({
        baseURL: 'http://localhost:5000',
        headers: AuthHeader.authHeader()        
    })
}
