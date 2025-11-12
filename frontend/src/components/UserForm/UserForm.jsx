import "./UserForm.css";
import {useState} from 'react';
import {toast} from 'react-toastify';

const UserForm = () => {
    const [topic, setTopic] = useState('Null');
    const [current_level, setCurrent_level] = useState('Null');
    const [goal_level, setGoal_level] = useState('Null');
    const [timeframe, setTimeframe] = useState('Null');
    const [dailyAvailability, setDailyAvailability] = useState('Null');
    const [userPreference, setUserPreference] = useState('Null');


    const submitForm = (e) => {
        e.preventDefault();

        const inputData = {
            topic,
            current_level,
            goal_level,
            timeframe,
            dailyAvailability,
            userPreference
        };
        const plan = fetch("http://localhost:8000/api/getPlan", {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });
        console.log(JSON.stringify(plan))
        toast.success('Job Added Successfully');

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
                            value={topic}
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
                            value={current_level}
                            onChange={(e) => setCurrent_level(e.target.value)}
                        >
                            <option value='First-timer'>First-timer</option>
                            <option value='Beginner'>Beginner</option>
                            <option value='Intermediate'>Intermediate</option>
                            <option value='Advanced'>Advanced</option>
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor='type'>Timeframel</label>
                        <select
                            id='timeframe'
                            name='timeframe'
                            className=''
                            required
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
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
                            placeholder='eg. Chess, Python...'
                            required
                            value={goal_level}
                            onChange={(e) => setGoal_level(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className='k text-gray-700 font-bold mb-2'>Daily availability</label>
                        <input
                            type='text'
                            id='dailyAvailability'
                            name='dailyAvailability'
                            placeholder='eg. Chess, Python...'
                            required
                            value={dailyAvailability}
                            onChange={(e) => setDailyAvailability(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className='k text-gray-700 font-bold mb-2'>User preferences</label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            className=' mb-2'
                            placeholder='eg. Chess, Python...'
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
