import React from "react";
import axios from 'axios';

// Server base URL configuration
// const baseURL = "http://localhost:5000";
const baseURL = "https://mad-libs-diceware.vercel.app";

const EFFDicewareOutput = (props) => {
    return (
      <div className="d-flex justify-content-center">
        <p
          className={`alert ${props.result ? "alert-success" : "alert-danger"} text-center m-1 eff-diceware-text`}
          role="alert"
        >
          {props.password}
        </p>
      </div>
    );
}

const Generator = () => {
    const [madLibsDicewarePassword, setMadLibsDicewarePassword] = React.useState("");
    const [effDicewarePassword, setEffDicewarePassword] = React.useState(["", "", ""]);
    const [generatePasswordResult, setGeneratePasswordResult] = React.useState(true);

    const generateMadLibsDicewarePassword = () => {
        setMadLibsDicewarePassword("...");
        axios.get(`${baseURL}/mad-libs-diceware`)
            .then(response => {
                if (response.data === undefined)
                    setMadLibsDicewarePassword("Something went wrong!");
                else {
                    let words = response.data.password.split(' ');
                    setMadLibsDicewarePassword(`${words[0]} ${words[1]} ${words[2]} - ${words[4]} ${words[5]} ${words[6]}`);
                }
                setGeneratePasswordResult(true);
            })
            .catch(error => {
                console.log(error);
                setMadLibsDicewarePassword("Something went wrong!");
                setGeneratePasswordResult(false);
            });
    }

    const generateEffDicewarePassword = () => {
        setEffDicewarePassword(["...", "...", "..."]);
        const promises = [];
        for (let numPasswords = 0; numPasswords < 3; numPasswords++) {
            promises.push(axios.get(`${baseURL}/eff-diceware`));
        }
        Promise.all(promises)
            .then(responses => {
                const passwords = responses.map(response => response.data.password);
                setEffDicewarePassword(passwords);
                setGeneratePasswordResult(true);
            })
            .catch(error => {
                console.log(error);
                setEffDicewarePassword(["Something went wrong!", "Something went wrong!", "Something went wrong!"]);
                setGeneratePasswordResult(false);
            });
    }

    // Generate passwords on initial mount
    React.useEffect(() => {
      generateEffDicewarePassword();
      generateMadLibsDicewarePassword();
    }, []);

    return (
      <div className="container-fluid pt-2 pb-4">
        <div className="d-flex justify-content-center">
          <p
            className={`alert ${generatePasswordResult ? 'alert-success' : 'alert-danger'} text-center`}
            id="mad-libs-diceware-text"
            role="alert"
          >
            {madLibsDicewarePassword}
          </p>
        </div>
            
        <div className="d-flex justify-content-center">
            <p>
                Much easier to remember than the following diceware generated passwords
            </p>
        </div>    
        {effDicewarePassword.map((pass, index) => <EFFDicewareOutput key={index} password={pass} result={generatePasswordResult} />)}
        
        <div className="d-flex justify-content-center">
          <p className="mt-4">
            <small>This website does not store any generated passwords</small>
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-success"
            id="generate-password-button"
            onClick={() => {
              generateEffDicewarePassword();
              generateMadLibsDicewarePassword();
            }}
          >
            <i className="bi bi-arrow-clockwise"></i>  Generate password
          </button>
        </div>
      </div>
    );
}

export default Generator;