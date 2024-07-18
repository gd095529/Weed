import {useState} from "react";
import PromptPW2 from "../components/PromptPW2";
import {removeAPI} from "../api/removeAPI";

function MemberOut() {
    const putPassword = async (pwd) => {
        const response = await removeAPI(pwd);
        console.log(response);
    }

    return (
        <div>
            <PromptPW2 putPassword={putPassword}/>
        </div>
    )
}

export default MemberOut;