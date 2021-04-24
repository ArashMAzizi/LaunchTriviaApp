import React from 'react';

function Questionaire({handleAnswer, correctAns, showNext, res: {question, correct_answer, answers}}) {
    return (
        <div>
            <div>
                <h1 dangerouslySetInnerHTML={{__html: question}}/>
             </div>
            <div>
                {answers.map((answer, index) => {
                    const rightAns = correctAns ? (
                        answer === correct_answer ? "right" : "wrong"
                    ): "";
                    return(
                        <button className={rightAns} onClick = {() => handleAnswer(answer)}>{answer}</button>
                    )
                })}
            </div>
            {correctAns && (
                <button onClick = {showNext}>Go To Next Question</button>
            )}
        </div>
    )
}

export default Questionaire