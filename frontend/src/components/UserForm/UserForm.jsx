import "./UserForm.css";
import {useState} from 'react';
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom";

const UserForm = ({setPlan}) => {
    const [topic, setTopic] = useState('Null');
    const [current_level, setCurrent_level] = useState('Null');
    const [goal_level, setGoal_level] = useState('Null');
    const [timeframe, setTimeframe] = useState('Null');
    const [dailyAvailability, setDailyAvailability] = useState('Null');
    const [userPreference, setUserPreference] = useState('Null');
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        const inputData = {
            topic,
            current_level,
            goal_level,
            timeframe,
            dailyAvailability,
            userPreference
        };
        console.log(JSON.stringify(inputData))
        const res = await fetch("http://localhost:8000/api/getPlan", {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });



        if (!res.ok) {
            throw new Error('Request failed: ' + res.status);
        }
        const rawPlan = await res.json()
        setPlan(rawPlan);
        navigate("/preview");
    };

    return (<section className="skill-form__wrapper">
        <div>
            <div>
                <form onSubmit={submitForm}>
                    <h2 className='-3xl text-center font-semibold mb-6'>Create plan</h2>


                    <div className="field">
                        <label>What topic do you want to learn?</label>
                        <input
                            type='Text'
                            id='topic'
                            name='topic'
                            className=' mb-2'
                            placeholder='eg. Chess, Python...'
                            required
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor='type'>Current level</label>
                        <select
                            id='current_level'
                            name='current_level'
                            className=''
                            required
                            onChange={(e) => setCurrent_level(e.target.value)}
                        >
                            <option value='First-timer'>First-timer</option>
                            <option value='Beginner'>Beginner</option>
                            <option value='Intermediate'>Intermediate</option>
                            <option value='Advanced'>Advanced</option>
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor='type'>Goal level</label>
                        <select
                            id='goal_level'
                            name='goal_level'
                            className=''
                            required
                            onChange={(e) => setGoal_level(e.target.value)}
                        >
                            <option value='Beginner'>Beginner</option>
                            <option value='Intermediate'>Intermediate</option>
                            <option value='Advanced'>Advanced</option>

                        </select>
                    </div>
                    <div className="field">
                        <label className='k text-gray-700 font-bold mb-2'>Timeframe</label>
                        <input
                            type='text'
                            id='goal_level'
                            name='goal_level'
                            className=' mb-2'
                            placeholder='eg. 30 days (optional)'
                            onChange={(e) => setTimeframe(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className='k text-gray-700 font-bold mb-2'>Daily availability</label>
                        <input
                            type='text'
                            id='dailyAvailability'
                            name='dailyAvailability'
                            className=' mb-2'
                            placeholder='eg. 60 minutes (optional)'
                            onChange={(e) => setDailyAvailability(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className='k text-gray-700 font-bold mb-2'>User preferences</label>
                        <input
                            type='text'
                            id='userPreferences'
                            name='userPreferences'
                            placeholder='eg. I like to watch video tutorials (optional)'
                            className=' mb-2'
                            onChange={(e) => setUserPreference(e.target.value)}
                        />
                    </div>
                    <div className="primary">
                        <button type='submit'>Generate plan</button>
                    </div>
                </form>
            </div>
        </div>
    </section>);
};
export default UserForm;
