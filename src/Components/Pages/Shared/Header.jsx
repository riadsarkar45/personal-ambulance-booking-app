import PropTypes from 'prop-types';

const Header = ({title}) => {
    return (
        <div className="bg-white bg-opacity-20 h-[4rem] flex items-center p-3 rounded-md">
            <h2 className="text-2xl text-white">{title}</h2>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;