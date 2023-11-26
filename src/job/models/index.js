import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../../config/supabase"


export function FetchAllJobs() {
    return supabase.from("jobs")
        .select("*")
        .eq("isActive", true)
}

export function AddJobsController(data) {
    return supabase
        .from("jobs")
        .insert({
            deadline: data.deadline,
            poster: data.poster,
            meta: data,
            poster_id: data.poster_id,
            isActive: true
        })
}

export function ApplyForJob(payload) {
    return supabase
        .from("jobs")
        .update({ applications: payload.application })
        .eq('id', payload.job)
}