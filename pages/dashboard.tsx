import { useQuery } from 'react-query';
import fetcher from '../utils/fetcher';
import { useRouter } from 'next/router';
import { Loading } from '../components';

const Dashboard = () => {
    const router = useRouter();
    const { data, error } = useQuery('user', fetcher('/api/user/me'), {
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (error) router.push('/signin');

    if (data) return <div>Hello, {data.email}</div>;

    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <Loading />
            </div>
        </div>
    );
};

export default Dashboard;
