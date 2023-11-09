import './myName.scss';


const MyName = ({ nickname, person }) => {
    // const firstname = "Tushar";
    // const colorName = "red";

    // const person = {
    //     name: "Najrul",
    //     styling: {
    //         backgroundColor: "blue",
    //         color: "white",
    //     },
    // };

    const ourClassName = "my-div-text";

    return (
        <div className={`my-div ${ourClassName}`}>
            <h1>
                MyName is showing here: {person.firstname} {person.lastname} {nickname}
            </h1>
        </div>
    );
};

export default MyName;