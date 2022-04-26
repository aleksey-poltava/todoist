import React from "react";

export const Checkbox = ({id}) => {    
    async function archiveTask(taskId) {
        //Get tasks by id from firebase
        //Set archived to true
    }

    return(
        <div 
            className="checkbox-holder"
            data-testid='checkbox-action'
            onClick={() => archiveTask(id)}
        >
            <span className="checkbox" />
        </div>
    );
}