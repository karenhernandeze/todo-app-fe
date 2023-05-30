import { useEffect, useState } from 'react';
import ManageTaskService from "../service/ManageTaskService";

const Metrics = () => {
    const [avgTime, setAvgTime] = useState('');
    const [avgTimeLow, setAvgTimeLow] = useState('');
    const [avgTimeMedium, setAvgTimeMedium] = useState('');
    const [avgTimeHigh, setAvgTimeHigh] = useState('');

    useEffect(() => {
        ManageTaskService.retrieveAvgTime()
            .then(response => {
                console.log(response.data)
                setAvgTime(response.data);
            });
        ManageTaskService.retrieveAvgTimeLow()
            .then(response => {
                console.log(response.data)
                setAvgTimeLow(response.data);
            });
        ManageTaskService.retrieveAvgTimeMedium()
            .then(response => {
                console.log(response.data)
                setAvgTimeMedium(response.data);
            });
        ManageTaskService.retrieveAvgTimeHigh()
            .then(response => {
                console.log(response.data)
                setAvgTimeHigh(response.data);
            });
    }, [])

    return (
        <div>
            <div class="card">
                <div class="card-body">
                    <div class="container">
                        <div class="row">

                            <div class="row">
                                <div class="col m-2">
                                    Average Time To Finish Tasks:
                                </div>
                                <div class="col m-2">
                                    Average Time To Finish Tasks By Priority:
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                </div>
                                <div class="col m-2">
                                    Low: {avgTimeLow} mins.
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    {avgTime} minutes
                                </div>
                                <div class="col m-2">
                                    Medium: {avgTimeMedium} mins.
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                </div>
                                <div class="col m-2">
                                    High: {avgTimeHigh} mins.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Metrics;