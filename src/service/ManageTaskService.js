import axios from 'axios'
const apiKey = process.env.REACT_APP_API_KEY;

export class ManageTaskService {

    async retrieveAllTasks() {
        try {
            const data = axios.get(apiKey, { crossdomain: true })
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

    async markTaskAsDone(id, task) {
        try {
            const data = axios.post(`${apiKey}/${id}/done`, task, { crossdomain: true })
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

    async markTaskAsUndone(id, task) {
        try {
            const data = axios.put(`${apiKey}/${id}/undone`, task, { crossdomain: true })
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

    async filterTasks(filters) {
        try {
            console.log("filters")
            console.log(filters)
            const data = axios.post(`${apiKey}/filter`, filters, { crossdomain: true })
            console.log(data)
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }
};

export default new ManageTaskService();