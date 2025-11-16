import { useState, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import TimePicker from 'react-time-picker';
import Select from "react-select";

import def from "../images/default.png";
import dirty from "../images/dirty.png";
import hungry from "../images/hungry.png";
import sleepy from "../images/sleepy.png";
import thirsty from "../images/thirsty.png";

export const Dashboard = (user) => {
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [timeDisplay, setTimeDisplay] = useState(new Date().toLocaleTimeString());
    const [goals, setGoals] = useLocalStorage("goals", []);
    const [timeInput, setTimeInput] = useState('10:00');
    const [goalInput, setGoalInput] = useState("");
    const [avatar, setAvatar] = useState(def);
    const [ava, setAva] = useState(null);

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

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeDisplay(new Date().toLocaleTimeString());
            setDate(new Date().toLocaleDateString());
        }, 1000);
        return () => clearInterval(interval);
    }, [])

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


    return (
        <div>

            <div>Welcome back, {user.name}!</div>
            <div className="date">{date}</div>
            <div className="time">{timeDisplay}</div>
            <div className="quote">Quote: If you want the rainbow, you gotta put up with the rain.</div>
            <img src={avatar} height="300px"></img>

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
                        setAva(option.ava);
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

            <ul>
                {statsState.map((stat) => (
                    <li key={stat.name}>
                        <div>{stat.name}</div>
                        <progress value={stat.percentage} max="1" />
                    </li>
                ))}
            </ul>
        </div>
    )
}
