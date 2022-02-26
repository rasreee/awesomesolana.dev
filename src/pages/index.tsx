import Layout from '@layouts/Layout';
import { HomePage as Home } from '@modules/home/HomePage';

(Home as any).Layout = Layout;

export default Home;
