import { useState, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import TimePicker from 'react-time-picker';
import Select from "react-select";

import def from "../images/default.png";
import dirty from "../images/dirty.png";
import hungry from "../images/hungry.png";
import sleepy from "../images/sleepy.png";
import thirsty from "../images/thirsty.png";
const stats = [
    {
        name: "hunger",
        percentage: 0.2
    },
    {
        name: "thirst",
        percentage: 0.3
    },
    {
        name: "energy",
        percentage: 0.1
    },
    {
        name: "cleanliness",
        percentage: 0.7
    }
]
export const Dashboard = (user) => {
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [timeDisplay, setTimeDisplay] = useState(new Date().toLocaleTimeString());
    const [goals, setGoals] = useLocalStorage("goals", []);
    const [timeInput, setTimeInput] = useState('10:00');
    const [goalInput, setGoalInput] = useState("");
    const [avatar, setAvatar] = useState(def);
    const [ava, setAva] = useState(null);

    const addGoal = (e) => {
        e.preventDefault();

        const newGoal = {
            id: crypto.randomUUID(),
            name: goalInput,
            time: timeInput,
            completed: false,
        };

        setGoals([...goals, newGoal]);
        setAvatar(ava);

        // reset inputs
        setgoalInput("");
        setTimeInput("10:00");
    }

    const completeGoal = (id) => {
        setGoals(goals.filter(goal => goal.id !== id));
        setAvatar(def);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeDisplay(new Date().toLocaleTimeString());
            setDate(new Date().toLocaleDateString())
        }, 1000);
        return () => clearInterval(interval);
    }, [])

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
                        { ava: dirty, goal: "Take a shower", label: "Take a shower"},
                        { ava: sleepy, goal: "Go to bed", label: "Go to bed" },
                        { ava: hungry, goal: "Have Lunch", label: "Have Lunch"},
                        { ava: hungry, goal: "Have Dinner", label: "Have Dinner"},
                        { ava: thirsty, goal: "Drink Water", label: "Drink Water"},
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
                        <button onClick={() => completeGoal(goal.id)} style={{ color: "green" }}>Mark complete</button>
                    </li>
                ))}
            </ul>
            <ul>
                {stats.map((stat) => (
                    <li key={stat.name}>
                        <div>{stat.name}</div>
                        <progress value={stat.percentage} />
                    </li>
                ))}
            </ul>
        </div>
    )
}