import { AddJobsController } from "../models"

export function CreateJobs(
    {
        title,
        employerType,
        company,
        location,
        worktplaceype,
        jobtype,
        date,
        salary,
        description,
        Alert, User,AvailableJobs
    }
) {
    if (!title || !employerType || !company || !location || !worktplaceype || !jobtype || !date || !salary || !description) {
        Alert.alert("Error", "Fill out all fields")
    } else {
        let newData = {
            title,
            employerType,
            company,
            location,
            worktplaceype,
            jobtype,
            deadline:date,
            salary,
            description,
            poster: User.name,
            poster_id: User.meta.email
        }
        AddJobsController(newData)
            .then(res => { 
                AvailableJobs()
                Alert.alert("Success", "Job posted successfully.")
            })
    }
}