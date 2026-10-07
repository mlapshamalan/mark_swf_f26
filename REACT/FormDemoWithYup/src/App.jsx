import { useState, useEffect } from "react";

const App = () => {
    const personObj = {
        fname: "",
        lname: "",
        age: 0
    };

    const [data, setData] = useState(personObj);

    const handleChange = (event) => {
        // 1. Destructure from event.target (fixes undefined: undefined)
        const { name, value } = event.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let newData = JSON.stringify(data)
        console.log(newData)
        let options = {
            method: "GET",

        }
        fetch.get(endpoint, options)
            .then()
            .then()
            .catch(error => console.log(error));
    }

    // 2. This runs EVERY TIME 'data' successfully updates
    useEffect(() => {
        console.log("Updated state:", data);
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input
                    type="text"
                    name="fname"
                    value={data.fname}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    maxLength={10}
                />
                <br />
                <br />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    name="lname"
                    value={data.lname}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    maxLength={10}
                />
            </label>
            <br/>
            <br/>
            <label>
                Age:
                <input
                    type="number"
                    name="age"
                    value={data.age}
                    onChange={handleChange}
                    max={99}
                    min={18}
                />
            </label>
            <br />
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default App;