import Banner from './Banner';
import Body from './Body';
import Footer from './Footer';

const Home = () => {
    return (
        <div className='w-full m-auto bg-[#ebeaee]'>
            {/* <Header></Header> */}
            <Banner></Banner>
            <Body></Body>
            <Footer></Footer>
        </div>
    );
};

export default Home;