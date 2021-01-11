import { React, useState } from 'react'

const Dashboard = () => {
    const [sets, setSets] = useState([])
    const [ message, setMessage] = useState({
      show: false,
      message: "",
    });

    const getSets = () => {
         try {
            fetch("/api/v1/sets", { 
            method: "GET",
            mode: "cors",
            credentials: "include"
           }).then((res) => {
             console.log(res);
             return res.json();
           }).then((data) => {
              console.log(data);

             if(!data.error) {
               setSets({
                   // TODO not correct
                   sets: sets.push(data)
               })
             } else {
               setMessage({
                 show: true,
                 message: data.error,
               })
             }
           });
          } catch(err) {
            console.log(err);
          }
    }

    return (
        <div>{sets.map((set) => {
            console.log(set);
            const { id, exercise, weight, repetitions } = set;
            return (
                <h4 id={id}>{exercise}{weight}{repetitions}</h4>
            );
        })}
        <button className="btn" onClick={getSets}>Get sets</button>
        {message.show ? <p>{message.message}</p> : ""}
        </div>
    )
}

export default Dashboard
