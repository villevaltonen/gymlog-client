import { React, useState, useEffect } from 'react'

const Dashboard = () => {
    const [resultList, setResultList] = useState({
        results: 0,
        skip: 0,
        limit: 5, // TODO: increase this for real use
        sets: []
    })
    const [set, setSet] = useState({
        exercise: "",
        weight: 0.0,
        repetitions: 0,
    })
    const [ message, setMessage] = useState({
      show: false,
      message: "",
    });

    const loadSets = () => {
         try {
            fetch(`/api/v1/sets?skip=${resultList.skip}&limit=${resultList.limit}`, { 
            method: "GET",
            credentials: "include"
           }).then((res) => {
             return res.json();
           }).then((data) => {
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
        fetch(`/api/v1/sets?skip=0&limit=5`, { 
        method: "GET",
        credentials: "include"
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if(!data.error) {
                setResultList(resultList => resultList = {
                    sets: resultList.sets.concat(data.sets),
                    skip: resultList.sets.length + data.sets.length,
                    limit: 5
                });
            }
        })
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSet({ ...set, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(set.exercise && set.weight && set.repetitions) {
            try {
                fetch("/api/v1/sets", { 
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({
                        exercise: set.exercise,
                        weight: parseInt(set.weight),
                        repetitions: parseInt(set.repetitions)
                    })
                }).then((res) => {
                    return res.json();
                }).then((data) => {
                    if(!data.error) {
                        const newSet = [{
                            id: data.id,
                            exercise: data.exercise,
                            weight: data.weight,
                            repetitions: data.repetitions,
                            created: data.created
                        }]
                        
                        const newSets = newSet.concat(resultList.sets)
                        console.log(newSets)
                        setResultList(resultList => resultList = {
                            sets: newSets,
                            skip: resultList.sets.length + 1,
                            limit: 5
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
    }

    return (
        <div>
            <form className="form">
          <div className="form-control">
            <label htlmFor="exercise">Exercise: </label>
            <input
              type="text"
              id="exercise"
              name="exercise"
              value={set.exercise}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htlmFor="weight">Weight: </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={set.weight}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htlmFor="repetitions">Repetitions: </label>
            <input
              type="number"
              id="repetitions"
              name="repetitions"
              value={set.repetitions}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Add set
          </button>
        </form>
            <ul>
                { resultList.sets.map((set) => {
                const { id, exercise, weight, repetitions, created } = set;
                return (
                    <li key={id}>{exercise} {weight} {repetitions} {created}</li>
                ); }
            )}
            <button className="btn" onClick={loadSets}>Show more...</button>
            {message.show ? <p>{message.message}</p> : ""}
            </ul>
        </div>
    )
}

export default Dashboard
