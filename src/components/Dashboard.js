import { React, useState } from "react";
import Login from "./Login";
import { useAuthentication } from "./providers/AuthenticationProvider";
import { useResult } from "./providers/ResultProvider";

const Dashboard = () => {
  const [result, setResult] = useResult();
  const [set, setSet] = useState({
    exercise: "",
    weight: 0.0,
    repetitions: 0,
  });
  const [message, setMessage] = useState({
    show: false,
    message: "",
  });
  const [authentication, setAuthentication] = useAuthentication();

  const middleware = () => {
    const tokenAge = 60 * 1000; // ms
    const current = new Date();
    const result = current - authentication.loginTime;

    // Check cookie consent
    if (authentication.cookieConsent) {
      // Check, if refreshing token is needed
      if (result >= 30 * 1000 && result <= tokenAge) {
        try {
          fetch("/api/users/refresh", {
            method: "POST",
            body: JSON.stringify(authentication.credentials),
            credentials: "include",
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (!data.error) {
                const current = new Date();
                setAuthentication({
                  ...authentication,
                  isAuthenticated: true,
                  loginTime: current,
                });
              } else {
                setMessage({
                  show: true,
                  message: data.error,
                });
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setMessage({
        show: true,
        message: "Cookies are required for using the service",
      });
    }
  };

  const loadSets = (e) => {
    middleware();
    try {
      fetch(`/api/v1/sets?skip=${result.skip}&limit=${result.limit}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 401) {
            setAuthentication({
              ...authentication,
              isAuthenticated: false,
            });
          }
          return res.json();
        })
        .then((data) => {
          if (!data.error) {
            if (data.sets.length === 0) {
              setMessage({
                show: true,
                message: "No more sets found",
              });
            } else {
              const newSets = result.sets.concat(data.sets);
              setResult({
                ...result,
                sets: newSets,
                skip: newSets.length,
              });
            }
          } else {
            setMessage({
              show: true,
              message: data.error,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSet = (id) => {
    middleware();
    try {
      fetch(`/api/v1/sets/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 401) {
            setAuthentication({
              ...authentication,
              isAuthenticated: false,
            });
          }
          return res.json();
        })
        .then((data) => {
          if (!data.error) {
            setResult(
              (result) =>
                (result = {
                  ...result,
                  sets: result.sets.filter((set) => set.id !== id),
                  skip: result.sets.length - 1,
                })
            );
          } else {
            setMessage({
              show: true,
              message: data.error,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSet({ ...set, [name]: value });
  };

  const addSet = (e) => {
    e.preventDefault();
    middleware();
    if (set.exercise && set.weight && set.repetitions) {
      try {
        fetch("/api/v1/sets", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            exercise: set.exercise,
            weight: parseFloat(set.weight),
            repetitions: parseInt(set.repetitions),
          }),
        })
          .then((res) => {
            if (res.status === 401) {
              setAuthentication({
                ...authentication,
                isAuthenticated: false,
              });
            }
            return res.json();
          })
          .then((data) => {
            if (!data.error) {
              const newSet = [
                {
                  id: data.id,
                  exercise: data.exercise,
                  weight: data.weight,
                  repetitions: data.repetitions,
                  created: data.created,
                },
              ];

              setResult(
                (result) =>
                  (result = {
                    sets: newSet.concat(result.sets),
                    skip: result.sets.length + 1,
                    limit: 5,
                  })
              );
            } else {
              setMessage({
                show: true,
                message: data.error,
              });
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const editSet = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {authentication.isAuthenticated ? (
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
            {result.sets.map((set) => {
              const { id, exercise, weight, repetitions, created } = set;
              return (
                <li key={id}>
                  {exercise} {weight} {repetitions} {created}{" "}
                  <button
                    onClick={() => {
                      deleteSet(id);
                    }}
                  >
                    Delete
                  </button>
                  <button onClick={editSet}>Edit</button>
                </li>
              );
            })}
            <button className="btn" onClick={loadSets}>
              Show more...
            </button>
            {message.show ? <p>{message.message}</p> : ""}
          </ul>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

const EditSet = (show, set) => {
  <p>Edit set here</p>;
};

export default Dashboard;
