import axios from "axios";

export async function findID(email, name) {
    try {
        const data = {
            email: email,
            name: name
        };

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        };

        const response = await axios.post('/join/find_id', data, config);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function findPW(email, name, id) {
    // 비밀번호 인증 받음
    const data = {
        email: email,
        name: name,
        id: id
    }

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    };

    try {
        const response = await axios.post('/join/find_pwd', data, config);

        return response;
    } catch (error) {
        console.log(error);
    }
}
