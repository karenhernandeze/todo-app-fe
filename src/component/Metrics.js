import { useEffect, useState } from 'react';
import ManageTaskService from "../service/ManageTaskService";

const Metrics = ( {avgTime, avgTimeLow, avgTimeMedium, avgTimeHigh} ) => {
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