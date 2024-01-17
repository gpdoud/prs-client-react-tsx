import axios from "axios";

export default function UserService() {

    const baseurl = "http://localhost:5555/api/users";

    const list = async () => {
        const data = await axios.get(`${baseurl}`)
            .then(promise => {
                return promise.data;
            })
            .catch(e => {
                console.error(e);
            })
            return data;
    }
}