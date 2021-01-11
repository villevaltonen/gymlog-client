import { React, useState, useEffect } from 'react'

const Dashboard = () => {
    const [resultList, setResultList] = useState({
        results: 0,
        skip: 0,
        limit: 5, // TODO: increase this for real use
        sets: []
    })
    const [ message, setMessage] = useState({
      show: false,
      message: "",
    });

    const getSets = () => {
         try {
            fetch(`/api/v1/sets?skip=${resultList.skip}&limit=${resultList.limit}`, { 
            method: "GET",
            credentials: "include"
           }).then((res) => {
             console.log(res);
             return res.json();
           }).then((data) => {
              console.log(data);

             if(!data.error) {
                const newSets = resultList.sets.concat(data.sets);
                setResultList({
                    ...resultList,
                    sets: newSets,
                    skip: newSets.length
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

    useEffect(() => {
        getSets();
    }, []);

    return (
        <div>
            { resultList.sets.map((set) => {
            const { id, exercise, weight, repetitions } = set;
            return (
                <h4 key={id}>{exercise}{weight}{repetitions}</h4>
            ); }
        )}
        <button className="btn" onClick={getSets}>Get sets</button>
        {message.show ? <p>{message.message}</p> : ""}
        </div>
    )
}

export default Dashboard
