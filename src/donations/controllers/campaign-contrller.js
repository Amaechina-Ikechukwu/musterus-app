import { Alert } from "react-native";
import { FetchAllDonations } from "../models";

export const GetApp_Campaigns = ({
    setData,
    setLoading,
    drawerState,
    setDrawerState,
    setcomponent,
    component,
    setDataDefalt,

    seterror,
    handleSnapPress,
    setsupportRequestDrawer,
    disp_events
}) => {
    setLoading(true)
    console.log("started fetching")
    FetchAllDonations()
        .then(res => {
            if (res.error != null) {
                if (seterror) {
                    seterror({
                        msg: "Make sure you are connected to the internet",
                        type: "Network Error",
                        status: true
                    })
                } else {
                    Alert.alert("Network error", "Make sure you are connected to the internet")
                }
                setLoading(false)
            } else {
                if (res.data.length < 1) {
                    setData([])

                    if (seterror) {
                        seterror({
                            msg: "Use the add button (+) to create a campaign.",
                            type: "No active campaign.",
                            status: true
                        })
                    }
                    setLoading(false)
                } else {
                    let ActiveCampaign = res.data.filter(e => new Date(e.deadline) > new Date())
                    // setData(res.data)
                    setData(ActiveCampaign) 
                    if (disp_events) { disp_events(ActiveCampaign) }
                    if (handleSnapPress) { handleSnapPress(1) }
                    if (setsupportRequestDrawer) { setsupportRequestDrawer(true) }

                    if (setDataDefalt) { setDataDefalt(res.data.slice(0, 4)) }

                    if (seterror) {
                        seterror({
                            msg: "",
                            type: "",
                            status: false
                        })
                    }
                }
                if (setcomponent) { setcomponent(component) }
                setLoading(false)
            }
        })
        .catch(error => {
            if (seterror) {
                seterror({
                    msg: "Make sure you are connected to the internet",
                    type: "Network Error",
                    status: true
                })
            }
            setLoading(false)
        })
}
