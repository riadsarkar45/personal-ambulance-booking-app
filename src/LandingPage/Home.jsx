import Banner from './Banner';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

const Home = () => {
    return (
        <div className='w-[90%] m-auto bg'>
            <Header></Header>
            <Banner></Banner>
            <Body></Body>
            <Footer></Footer>
        </div>
    );
};

export default Home;