import { React, useState, useEffect } from 'react'
import Login from './Login'
import { useAuthentication } from "./AuthenticationProvider";

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
    const [message, setMessage] = useState({
      show: false,
      message: "",
    });
    const [isAuthenticated, setIsAuthenticated] = useAuthentication();

    useEffect(() => {
        if(isAuthenticated === true) {
            fetch(`/api/v1/sets?skip=0&limit=5`, { 
                method: "GET",
                credentials: "include"
            }).then((res) => {
                return res.json();
            }).then((data) => {
                if(!data.error) {

                    setResultList(resultList => resultList = {
                        sets: data.sets,
                        skip: resultList.sets.length + data.sets.length,
                        limit: 5
                    });
                }
            });

            setMessage({
                show: false,
                message: ""
            })
        } else {
            setResultList(resultList => resultList = {
                sets: [],
                skip: 0,
                limit: 5
            })
        }
    }, [isAuthenticated]);

    const loadSets = () => {
         try {
            fetch(`/api/v1/sets?skip=${resultList.skip}&limit=${resultList.limit}`, { 
            method: "GET",
            credentials: "include"
           }).then((res) => {
               if(res.status === 401) {
                   setIsAuthenticated(false);
               }
               return res.json();
           }).then((data) => {
             if(!data.error) {
                 if(data.sets.length === 0) {
                    setMessage({
                    show: true,
                    message: "No more sets found",
                })
                 } else {
                    const newSets = resultList.sets.concat(data.sets);
                    setResultList({
                        ...resultList,
                        sets: newSets,
                        skip: newSets.length
                    })
                 }
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

    const deleteSet = (id) => {
        try {
            fetch(`/api/v1/sets/${id}`, { 
                method: "DELETE",
                credentials: "include",
            }).then((res) => {
                if(res.status === 401) {
                    setIsAuthenticated(false);
                }
                return res.json();
            }).then((data) => {
                if(!data.error) {
                    setResultList(resultList => resultList = {
                        sets: resultList.sets.filter(set => set.id !== id),
                        skip: resultList.sets.length - 1,
                        limit: 5
                    })
                    console.log(resultList);
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
                        weight: parseFloat(set.weight),
                        repetitions: parseInt(set.repetitions)
                    })
                }).then((res) => {
                    if(res.status === 401) {
                        setIsAuthenticated(false);
                    }
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
                        
                        setResultList(resultList => resultList = {
                            sets: newSet.concat(resultList.sets),
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
            {isAuthenticated ?
            <div>
            <form className="form">
          <div className="form-control">
            <label htlmfor="exercise">Exercise: </label>
            <input
              type="text"
              id="exercise"
              name="exercise"
              value={set.exercise}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htlmfor="weight">Weight: </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={set.weight}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htlmfor="repetitions">Repetitions: </label>
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
                    <li key={id}>{exercise} {weight} {repetitions} {created} <button onClick={() => {deleteSet(id)}}>Delete</button></li>
                ); }
            )}
            <button className="btn" onClick={loadSets}>Show more...</button>
            {message.show ? <p>{message.message}</p> : ""}
            </ul>
            </div> : <Login/>}
        </div>
    )
}

export default Dashboard
