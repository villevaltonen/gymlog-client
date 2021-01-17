import { React, useState } from 'react'
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
    const [authentication, setAuthentication] = useAuthentication();

    const checkRefresh = () => {
        const tokenAge = 60 * 1000; // ms
        const current = new Date();
        const result = current - authentication.loginTime;
        
        if(result >= 30 * 1000 && result <= tokenAge) {
            try {
                fetch("/api/users/refresh", { 
                    method: "POST",
                    body: JSON.stringify(authentication.credentials),
                    credentials: "include"
                }).then((res) => {
                    return res.json();
                }).then((data) => {
                    if(!data.error) {
                        const current = new Date()
                        setAuthentication({
                        ...authentication,
                        isAuthenticated: true,
                        loginTime: current,
                        });
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

    const loadSets = (e) => {
        checkRefresh();
        try {
           fetch(`/api/v1/sets?skip=${resultList.skip}&limit=${resultList.limit}`, { 
           method: "GET",
           credentials: "include"
          }).then((res) => {
              if(res.status === 401) {
                  setAuthentication({
                      ...authentication,
                      isAuthenticated: false,
                  });
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
        checkRefresh();
        try {
            fetch(`/api/v1/sets/${id}`, { 
                method: "DELETE",
                credentials: "include",
            }).then((res) => {
                if(res.status === 401) {
                    setAuthentication({
                        ...authentication,
                        isAuthenticated: false,
                    });
                }
                return res.json();
            }).then((data) => {
                if(!data.error) {
                    setResultList(resultList => resultList = {
                        ...resultList,
                        sets: resultList.sets.filter(set => set.id !== id),
                        skip: resultList.sets.length - 1,
                    });
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

    const addSet = (e) => {
        e.preventDefault();
        checkRefresh();
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
                        setAuthentication({
                            ...authentication,
                            isAuthenticated: false,
                        });
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
            {authentication.isAuthenticated ?
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
          <button type="submit" onClick={addSet}>
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
