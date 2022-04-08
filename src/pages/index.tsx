import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const CalendarDynamic = dynamic(() => import('../components/Calendar'), {
  loading: () => <div>carregando...</div>,
  ssr: false,
});

const Home: NextPage = () => {
  return <CalendarDynamic />
}

export default Home;
