import { React, useState } from "react";
import { formatDate } from "../utils/format";
import Login from "./Login";
import { useAuthentication } from "./providers/AuthenticationProvider";
import { useResult } from "./providers/ResultProvider";
import styled from "styled-components";

const StyledDashboard = styled.div`
  display: grid;
  margin-top: 50px;
  font-family: Arial;
  // width: 90vw;
  max-width: 700px;
  justify-content: left;
  z-index: 5;
  background: white;
`;

const StyledForm = styled.form`
  margin-top: 10px;
`;

const StyledLabel = styled.label`
  display: inline-block;
  margin-top: 10px;
  margin-right: 5px;
`;

const StyledInputText = styled.input`
  display: inline-block;
  width 80px;
  margin-right: 10px;
`;

const StyledInputNumber = styled.input`
  display: inline-block;
  width 40px;
  margin-right: 10px;
`;

const StyledButton = styled.button`
  margin-top: 10px;
  background-color: #0388fc;
  color: white;
  font-size: 16px;
  border: 2px solid #034282;
  border-radius: 5px;
`;

const StyledDeleteButton = styled.button`
  background-color: red;
  border: none;
  color: white;
  font-size: 16px;
  border: 2px solid red;
  border-radius: 5px;
`;

const StyledErrorMessage = styled.p`
  color: red;
`;

const StyledTable = styled.table`
  margin-top: 20px;
`;

const StyledTableHead = styled.thead``;
const StyledTableHeader = styled.th`
  padding-right: 20px;
  text-align: left;
`;
const StyledTableRow = styled.tr``;
const StyledTableData = styled.td`
  padding-right: 20px;
`;

const Dashboard = () => {
  const [result, setResult] = useResult();
  const [set, setSet] = useState({
    exercise: "",
    weight: 0.0,
    repetitions: 0,
  });
  const [bottomMessage, setBottomMessage] = useState({
    show: false,
    message: "",
  });
  const [addSetMessage, setAddSetMessage] = useState({
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
                setBottomMessage({
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
      setBottomMessage({
        show: true,
        message: "Cookies are required for using the service",
      });
    }
  };

  const getSets = (e) => {
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
              setBottomMessage({
                show: true,
                message: "No more sets found",
              });
            } else {
              //   const foo = data.sets.reduce(
              //     (entryMap, set) =>
              //       entryMap.set(set.created.substring(0, 10), [
              //         ...(entryMap.get(set.created.substring(0, 10)) || []),
              //         set,
              //       ]),
              //     new Map()
              //   );
              //   for (const [key, value] of foo.entries()) {
              //     console.log(key);
              //     foo.get(key).map((set) => console.log(set));
              //   }

              const newSets = result.sets.concat(data.sets);
              setResult({
                ...result,
                sets: newSets,
                skip: newSets.length,
              });
              setBottomMessage({
                ...bottomMessage,
                show: false,
                message: "",
              });
            }
          } else {
            setBottomMessage({
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
            setBottomMessage({
              ...bottomMessage,
              show: false,
              message: "",
            });
          } else {
            setBottomMessage({
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
              setAddSetMessage({
                ...addSetMessage,
                show: false,
              });
            } else {
              setAddSetMessage({
                show: true,
                message: data.error,
              });
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setAddSetMessage({
        show: true,
        message: "All fields required",
      });
    }
  };

  const renderSets = (sets) => {
    return sets.map((set) => {
      const { id, exercise, weight, repetitions, created } = set;
      const timestamp = formatDate(created);
      return (
        <StyledTableRow key={id}>
          <StyledTableData>{exercise}</StyledTableData>
          <StyledTableData>{weight}</StyledTableData>
          <StyledTableData>{repetitions}</StyledTableData>
          <StyledTableData>{timestamp.date}</StyledTableData>
          <StyledTableData>{timestamp.time}</StyledTableData>
          <StyledTableData>
            <StyledDeleteButton
              onClick={() => {
                deleteSet(id);
              }}
            >
              Delete
            </StyledDeleteButton>
            {/* <td>
            <button onClick={editSet}>Edit</button>
          </td> */}
          </StyledTableData>
        </StyledTableRow>
      );
    });
  };

  return (
    <StyledDashboard>
      {authentication.isAuthenticated ? (
        <div>
          <StyledForm>
            <StyledLabel htlmfor="exercise">Exercise: </StyledLabel>
            <StyledInputText
              type="text"
              id="exercise"
              name="exercise"
              value={set.exercise}
              onChange={handleChange}
            />
            <StyledLabel htlmfor="weight">Weight: </StyledLabel>
            <StyledInputNumber
              type="number"
              id="weight"
              name="weight"
              value={set.weight}
              onChange={handleChange}
            />
            <StyledLabel htlmfor="repetitions">Reps: </StyledLabel>
            <StyledInputNumber
              type="number"
              id="repetitions"
              name="repetitions"
              value={set.repetitions}
              onChange={handleChange}
            />
            <StyledButton type="submit" onClick={addSet}>
              Add set
            </StyledButton>
          </StyledForm>
          {addSetMessage.show ? (
            <StyledErrorMessage>{addSetMessage.message}</StyledErrorMessage>
          ) : (
            ""
          )}

          <StyledTable>
            <StyledTableHead>
              <StyledTableRow>
                <StyledTableHeader>Exercise</StyledTableHeader>
                <StyledTableHeader>Weight</StyledTableHeader>
                <StyledTableHeader>Reps</StyledTableHeader>
                <StyledTableHeader>Date</StyledTableHeader>
                <StyledTableHeader>Time</StyledTableHeader>
              </StyledTableRow>
            </StyledTableHead>
            <tbody>{renderSets(result.sets)}</tbody>
          </StyledTable>
          <StyledButton className="btn" onClick={getSets}>
            Show more...
          </StyledButton>
          {bottomMessage.show ? (
            <StyledErrorMessage>{bottomMessage.message}</StyledErrorMessage>
          ) : (
            ""
          )}
        </div>
      ) : (
        <Login />
      )}
    </StyledDashboard>
  );
};

export default Dashboard;
