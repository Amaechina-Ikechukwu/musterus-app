import { supabase } from "../../config/supabase";

export function FetchAllDonations() {
    return supabase.from("donations")
        .select("*")
    // .eq("isActive", true)
}

export function FetchAllDonationsByID(id) {
    return supabase.from("donations")
        .select("*")
        .eq("id", id)
}

export function AddDonation(payload) {
    return supabase
        .from("donations")
        .update({ donations: payload.donations })
        .eq('id', payload.id)
}



export function AddCampaign(data) {
    return supabase
        .from("donations")
        .insert({
            deadline: data.deadline,
            poster: data.poster,
            meta: data,
            poster_id: data.poster_id, isActive: true
        })
}