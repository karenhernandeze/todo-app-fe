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
            const data = axios.post(`${apiKey}/filter`, filters, { crossdomain: true })
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

    async createTasks(task) {
        try {
            const data = axios.post(`${apiKey}`, task, { crossdomain: true })
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

    async deleteTasks(id) {
        try {
            const data = axios.delete(`${apiKey}/${id}`, { crossdomain: true })
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

    async updateTask(task, id) {
        try {
            const data = axios.put(`${apiKey}/${id}`, task, { crossdomain: true })
            console.log(data)
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }
};

export default new ManageTaskService();