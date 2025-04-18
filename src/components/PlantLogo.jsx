const PlantLogo = ({ width = 24, height = 24 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 24 24"
            className="plant-logo-svg"
        >
            <path
                className="plant-logo-path"
                d="M12 2c4 4 7 10 7 15 0 4-3 5-7 5s-7-1-7-5c0-5 3-11 7-15z"
            />
            <path 
                className="plant-logo-path"
                d="M12 2v18" 
            />
        </svg>
    );
};

export default PlantLogo; 