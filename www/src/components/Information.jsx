import React from "react";

const QuestionAnswer = (props) => {
    return (<>
        <p>
            <b><big>💭 {props.question}</big></b>
            <br />
            {props.answer}
        </p>
        <br />
    </>);
}

const TimeToCrackTable = (props) => {
    const getAverageTimeToCrack = () => {
        let sum = 0;
        props.data.forEach(entry => {
            sum += entry.timeToCrack;
        });

        return sum / props.data.length;
    }

    return (<>
        <label className="h5"> {props.tableTitle} </label>
        <table className="table table-striped table-sm">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Password</th>
                    <th scope="col">Time to crack (years)</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((entry, key) => {
                    return (
                        <tr key={key}>
                            <th scope="row">{key}</th>
                            <td>{entry.password}</td>
                            <td>{entry.timeToCrack}</td>
                        </tr>
                    );
                })}

                <tr key="avg-time-to-crack">
                    <th scope="row">=</th>
                    <td><b>Average time to crack</b></td>
                    <td><b>
                        {getAverageTimeToCrack()}
                    </b></td>
                </tr>
            </tbody>

        </table>
    </>);
}


const Information = () => {
    return (<div className='container-fluid py-2 mt-2'>
        <label className="h4 pt-3">About Mad Libs Diceware</label>
        <hr />


        <QuestionAnswer
            question={"What is Mad Libs Diceware?"}
            answer={<>
                Diceware generates secure passwords with a huge search space consisting of 7776<sup>5</sup> ≈ twenty-eight quintillion
                combinations for 5-word passwords but they are difficult to remember since the words are not correlated for the mind to
                remember them easily. Mad Libs Diceware is a variant of Diceware which uses the Mad Libs approach to generate passwords
                that are easy to remember as well as difficult to crack.
            </>}
        />
        <QuestionAnswer
            question={"Is Mad Libs Diceware as secure as Diceware?"}
            answer={<>
                Yes, the table below shows a comparison of the time it takes to crack passwords created by both the password generation
                methodologies. Based on the comparison we can conclude that Mad Libs Diceware generates passwords that are as secure as
                Diceware. Mad Libs Diceware generated passwords have a larger average time to crack since they generally have more number
                of characters than Diceware generated passwords.
            </>}
        />

        <div className="row">
            <div className="col-lg-6">
                <TimeToCrackTable
                    tableTitle={"Diceware"}
                    data={[
                        { password: "cancel ebook ladies countable unvalued ibuprofen", timeToCrack: 4.99e+67 },
                        { password: "macarena strum wimp immobile gecko copied", timeToCrack: 2.26e+55 },
                        { password: "attendee catnip disagree apricot bulldozer cuddly", timeToCrack: 2.89e+69 },
                    ]}
                />
            </div>
            <div className="col-lg-6">
                <TimeToCrackTable
                    tableTitle={"Madlibs Diceware"}
                    data={[
                        { password: "cursorily unlined vector untunably opulent dictionary", timeToCrack: 3.27e+76 },
                        { password: "massively silver gallery vehemently identical kiosk", timeToCrack: 9.74e+72 },
                        { password: "lawlessly mixed tombstone giftedly bountiful loom", timeToCrack: 2.89e+69 },
                    ]}
                />
            </div>
        </div>

        <p>Tool used to calculate the time to crack metric: https://random-ize.com/how-long-to-hack-pass/</p>
        <br />

        <QuestionAnswer
            question={"How does Mad Libs Diceware make it easy to remember a password?"}
            answer={<>
                The human mind remembers things through association i.e. random things are difficult to remember while
                somewhat logically organized things are retained in memory. Click on the 'Generate password' button above if you haven't
                already. Which one of the above generated passwords do you think is easy to remember?

                <br /><br />

                If you wish, you can make it much more easier to type by using the characters lying at multiples of your
                favourite digit. For instance, if your favourite digit is 3, <b> immovably thin crackers inverssely vengeful begger </b>
                becomes <b> mayiaevslnfgr </b>. Remember to have atleast 15 characters in your password for it to be strong and
                secure. You can also substitute alphabetic characters with similar looking symbols. For example, 's' can be substituted
                with '$' in a password.
            </>}
        />


    </div>);
}

export default Information