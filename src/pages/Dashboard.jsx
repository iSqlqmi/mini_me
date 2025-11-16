import { useState, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import TimePicker from 'react-time-picker';
import Select from "react-select";

import def from "../images/default.png";
import dirty from "../images/dirty.png";
import hungry from "../images/hungry.png";
import sleepy from "../images/sleepy.png";


export const Dashboard = (user) => {
    const [timeDisplay, setTimeDisplay] = useState(new Date().toLocaleString());
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

    const deleteGoal = () => {

    }
    useEffect(() => {
        const interval = setInterval(() => setTimeDisplay(new Date().toLocaleString()), 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div>
            <div>Welcome back, {user.name}!</div>
            <div>Time right now is: {timeDisplay}</div>
            <img src={avatar} height="300px"></img>
            <form onSubmit={addGoal}>
                <Select
                    options={[
                        { ava: dirty, goal: "Take a shower", label: "Take a shower"},
                        { ava: sleepy, goal: "Go to bed", label: "Go to bed" },
                        { ava: hungry, goal: "Have Lunch", label: "Have Lunch"},
                        { ava: hungry, goal: "Have Dinner", label: "Have Dinner"}
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
                        <button onClick={deleteGoal} style={{ color: "green" }}>Delete goal</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}