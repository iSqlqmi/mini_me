import { useState, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import TimePicker from 'react-time-picker';
import Select from "react-select";

import WeatherTemp from "../components/WeatherTemp"
import WeatherPicture from "../components/WeatherPicture"
import Alert from "../components/Alert"

import def from "../images/default.png";
import dirty from "../images/dirty.png";
import hungry from "../images/hungry.png";
import sleepy from "../images/sleepy.png";
import thirsty from "../images/thirsty.png";

import bgday from "../images/daybg.png";
import bgnight from "../images/nightbg.png";

export const Dashboard = (user) => {
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [timeDisplay, setTimeDisplay] = useState(new Date().toLocaleTimeString());
    const [goals, setGoals] = useLocalStorage("goals", []);
    const [timeInput, setTimeInput] = useState('10:00');
    const [weather, setWeather] = useState(null);

    const [goalInput, setGoalInput] = useState("");
    const [avatar, setAvatar] = useState(def);
    const [statsState, setStatsState] = useState([
        {
            name: "hunger",
            percentage: 1,
            ava: hungry,
            task: ["Have Dinner", "Have Lunch"]
        },
        {
            name: "thirst",
            percentage: 1,
            ava: thirsty,
            task: ["Drink Water"]
        },
        {
            name: "energy",
            percentage: 1,
            ava: sleepy,
            task: ["Go to bed"]
        },
        {
            name: "cleanliness",
            percentage: 1,
            ava: dirty,
            task: ["Take a shower"]
        }
    ]);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const addGoal = (e) => {
        e.preventDefault();

        if (!goalInput) return;

        const newGoal = {
            id: crypto.randomUUID(),
            name: goalInput,
            time: timeInput,
            // FIXED: use statsState instead of stats
            ava: statsState.find(stat => stat.task.includes(goalInput))?.ava,
            completed: false,
            triggered: false,
        };

        setGoals([...goals, newGoal]);

        // FIXED: correct setter name
        setGoalInput("");
        setTimeInput("10:00");
    }

    const completeGoal = (id, ava) => {
        setGoals(goals.filter(goal => goal.id !== id));

        // FIXED: increase the correct stat percentage
        setStatsState(prev =>
            prev.map(stat =>
                stat.ava === ava
                    ? { ...stat, percentage: Math.min(stat.percentage + 0.5, 1) }
                    : stat
            )
        );
    }

    function isDaytime() {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18;
    }

    // Get the user's input from home page
    useEffect(() => {
        const saved = localStorage.getItem("userName");
        if (saved) setName(saved);
    }, []);

    // Update clock every 1s
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeDisplay(new Date().toLocaleTimeString());
            setDate(new Date().toLocaleDateString());
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    // Update statsState (depleting the stats) every 1s
    useEffect(() => {
        const interval = setInterval(() => {
            setStatsState(prev =>
                prev.map(stat => ({
                    ...stat,
                    percentage: Math.max(stat.percentage - 0.02, 0.02)
                })

                )
            )
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    // Set avatar based on current lowest stat and whether it is < 20%
    useEffect(() => {
        const interval = setInterval(() => {

            const lowest = statsState.reduce((min, stat) =>
                stat.percentage < min.percentage ? stat : min
            )

            if (lowest.percentage <= 0.2) {
                setAvatar(lowest.ava);
            } else {
                setAvatar(def);
            }

        }, 100);

        return () => clearInterval(interval);
    }, [statsState]); // FIXED dependency

    // Call weather api
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
            );
            const data = await res.json();
            setWeather(data.current_weather);
        });
    }, []);

    // Check goals every second to see changes
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const current = now.toTimeString().slice(0, 5); // "HH:MM"

            goals.forEach(goal => {
                if (!goal.triggered && goal.time === current) {
                    setAlertMessage(`Time to ${goal.name}!`);
                    setShowAlert(true);
                    setGoals(prev =>
                        prev.map(g =>
                            g.id === goal.id ? { ...g, triggered: true } : g
                        )
                    );
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [goals]);

    return (
        <div className="dashboard-grid">

            <div className="green-rect1">
                {showAlert && <Alert
                    message={alertMessage}
                    onClose={() => { setShowAlert(false) }}
                />}
                <div className="name" style={{ fontSize: "30px" }}>
                    Welcome back, <span style={{ fontWeight: "bold" }}>{name}</span>
                </div>

                <div className="datetime-wrapper">
                    <WeatherTemp />
                    <WeatherPicture />
                    <div className="date">{date}</div>
                    <div className="time">{timeDisplay}</div>
                </div>
            </div>



            <div className="avatar-stats-container">

                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(${isDaytime() ? bgday : bgnight})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                    }}
                >
                    <img src={avatar} height="300px" />
                </div>


                <div className="right-side">
                    <div className="quote" style={{

                    }}>
                        If you want the rainbow, you gotta put up with the rain.
                    </div>

                    <div className="statsBar">
                        <ul>
                            {statsState.map((stat) => (
                                <li key={stat.name}>
                                    <div>{stat.name}</div>
                                    <progress value={stat.percentage} max="1" min="0.02"
                                        style={{
                                            accentColor: stat.percentage <= 0.2 ? "red" : "green",

                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{
                        display: "flex"
                    }}>
                        <form onSubmit={addGoal} className="goalForm">
                            <Select
                                options={[
                                    { ava: dirty, goal: "Take a shower", label: "Take a shower" },
                                    { ava: sleepy, goal: "Go to bed", label: "Go to bed" },
                                    { ava: hungry, goal: "Have Lunch", label: "Have Lunch" },
                                    { ava: hungry, goal: "Have Dinner", label: "Have Dinner" },
                                    { ava: thirsty, goal: "Drink Water", label: "Drink Water" },
                                ]}
                                onChange={(option) => {
                                    setGoalInput(option.goal);
                                }}
                            />
                            <input
                                aria-label="Time"
                                name="goalTime"
                                type="time"
                                onChange={(e) => setTimeInput(e.target.value)}
                                value={timeInput}
                            />
                            <button type="submit">Add new goal</button>
                        </form>

                        <ul className="goalsList">
                            {goals.map((goal) => (
                                <li key={goal.id}>
                                    <div>
                                        {goal.time} — {goal.name}
                                    </div>
                                    <div>Status: {goal.completed ? "Completed" : "Not completed"}</div>
                                    <button onClick={() => completeGoal(goal.id, goal.ava)}>Mark complete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    );

}
