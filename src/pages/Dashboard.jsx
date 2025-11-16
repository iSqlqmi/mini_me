import { useState, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import TimePicker from 'react-time-picker';
import Select from "react-select";

import Weather from "../components/Weather"
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
                    percentage: Math.max(stat.percentage - 0.02, 0)
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

    return (
        <div>
            <div className="green-rect1">
                <div className="name">Welcome back, {name}!</div>
                <div className="date">{date}</div>
                <div className="time">{timeDisplay}</div>
            </div>
            <Weather />
            <div className="quote">Quote: If you want the rainbow, you gotta put up with the rain.</div>
            <div
                style={{
                    position: "relative",
                    width: "200px",     // FIXED WIDTH → no more long stretch
                    height: "350px",    // FIXED HEIGHT
                    overflow: "hidden",
                }}
            >
                <img
                    src={isDaytime() ? bgday : bgnight}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />

                <img
                    src={avatar}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        height: "85%",
                        width: "auto",
                        objectFit: "contain",
                        zIndex: 2,
                    }}
                />
            </div>

            <div className="statsBar">
                <ul>
                    {statsState.map((stat) => (
                        <li key={stat.name}>
                            <div>{stat.name}</div>
                            <progress value={stat.percentage} max="1" />
                        </li>
                    ))}
                </ul>
            </div>

            <form onSubmit={addGoal}>
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
                    value={timeInput} />
                <button type="submit" style={{ background: "green" }}>Add new goal</button>
            </form>

            <ul>
                {goals.map((goal) => (
                    <li key={goal.id}>
                        <div>
                            {goal.time} — {goal.name}
                        </div>
                        <div>Status: {goal.completed ? "Completed" : "Not completed"}</div>
                        <button onClick={() => completeGoal(goal.id, goal.ava)} style={{ color: "green" }}>Mark complete</button>
                    </li>
                ))}
            </ul>

            {/* <div className="statsBar">    
            <ul>
                {statsState.map((stat) => (
                    <li key={stat.name}>
                        <div>{stat.name}</div>
                        <progress value={stat.percentage} max="1" />
                    </li>
                ))}
            </ul>
            </div>   */}
        </div>
    )
}
