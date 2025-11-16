import { useState, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import TimePicker from 'react-time-picker';

export const Dashboard = (user) => {
    const [timeDisplay, setTimeDisplay] = useState(new Date().toLocaleString());
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [timeInput, setTimeInput] = useState('10:00');
    const [nameInput, setNameInput] = useState("");

    const addTask = (e) => {
        e.preventDefault();
        if (!nameInput.trim()) return; // prevent empty tasks

        const newTask = {
            id: crypto.randomUUID(),
            name: nameInput,
            time: timeInput,
            completed: false,
        };

        setTasks([...tasks, newTask]);

        // reset inputs
        setTaskName("");
        setTimeInput("10:00");
    }

    const deleteTask = () => {

    }
    useEffect(() => {
        const interval = setInterval(() => setTimeDisplay(new Date().toLocaleString()), 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div>
            <div>Welcome back, {user.name}!</div>
            <div>Time right now is: {timeDisplay}</div>
            <form onSubmit={addTask}>
                <input
                    type="name"
                    name="taskName"
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="name" />
                <input 
                    aria-label="Time" 
                    name="taskTime"
                    type="time" 
                    onChange={(e) => setTimeInput(e.target.value)} 
                    value={timeInput} />
                <button type="submit">Add new task</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <div>
                        {task.time} — {task.name}
                        </div>
                        <div>Status: {task.completed ? "Completed" : "Not completed"}</div>
                        <button onClick={deleteTask}>Delete task</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}