import React from "react";
import axios from 'axios';

const baseURL = "https://madlibs-diceware.herokuapp.com";
// const baseURL = "http://localhost:5000"; // Use for local testing purposes

const LabelledOutput = (props) => {
    return (<>
        <hr className="m-0 py-1" />
        <label className="h4">{props.label}</label>
        <hr className="m-0 py-1 mb-2" />
        <p className="alert alert-success" role="alert"> {props.output} </p>
    </>);
}

const Generator = () => {
    const [madLibsDicewarePassword, setMadLibsDicewarePassword] = React.useState(<></>);
    const [effDicewarePassword, setEffDicewarePassword] = React.useState("");

    const generateMadLibsDicewarePassword = () => {
        setMadLibsDicewarePassword("...");
        axios.get(`${baseURL}/mad-libs-diceware`)
            .then(response => {
                if (response.data === undefined)
                    setMadLibsDicewarePassword("Something went wrong!");
                else {
                    let words = response.data.password.split(' ');
                    setMadLibsDicewarePassword(<>
                        <b> {words[0]} </b>
                        <b> {words[1]} </b>
                        <b> {words[2]} </b>
                        -
                        <b> {words[4]} </b>
                        <b> {words[5]} </b>
                        <b> {words[6]} </b>
                    </>);
                }
            })
            .catch(error => {
                console.log(error);
                setMadLibsDicewarePassword("Something went wrong!");
            });
    }

    const generateEffDicewarePassword = () => {

        setEffDicewarePassword("...");
        axios.get(`${baseURL}/eff-diceware`)
            .then(response => {
                if (response.data === undefined)
                    setEffDicewarePassword("Something went wrong!");
                else
                    setEffDicewarePassword(response.data.password);
            })
            .catch(error => {
                console.log(error);
                setEffDicewarePassword("Something went wrong!");
            })
    }

    return (
        <div className='container-fluid pt-4 pb-2'>
            <div className='row'>
                <div className='col-md-6 py-2 px-4'>
                    <LabelledOutput
                        label={"Mad Libs Diceware"}
                        output={madLibsDicewarePassword}
                    />
                </div>

                <div className='col-md-6 py-2 px-4'>
                    <LabelledOutput
                        label={"Diceware"}
                        output={effDicewarePassword}
                    />
                </div>
            </div>
            <div className='row d-flex justify-content-center'>
                <p><small>This website does not store any generated passwords</small></p>
            </div>
            <div className='row d-flex justify-content-center'>
                <button type="button" className="btn m-2 btn-success" onClick={() => { generateEffDicewarePassword(); generateMadLibsDicewarePassword(); }}> Generate password </button>
            </div>
        </div>
    );
}

export default Generator;