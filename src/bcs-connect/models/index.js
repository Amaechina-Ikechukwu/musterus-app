import {supabase} from '../../config/supabase';
import {PushNotification} from '../../services/triggerNotifications';

export function FetchAllUsers() {
  return supabase.from('abasites').select('*');
  // .eq("isActive", true)
}

//  invite user to support campaign
export function NotificationController(payload) {
  supabase
    .from('notifications')
    .insert({
      user: payload.user.id,
      invitee: payload.invitee.id,
      meta: payload.meta,
      type: payload.type,
    })
    .then(res => {
      payload.setLoading(false);
      payload.Alert.alert(
        'Success',
        `You have successfully invited ${payload.invitee.name} to support ${payload.meta.campaign.meta.title}`,
      );
      PushNotification({
        name: payload.user.name,
        message: `${payload.user.name} has invited you to support the ${payload.meta.campaign.meta.title} via the Upendo App`,
        token: payload.invitee.meta.Fcmoken,
        title: 'Donation Campaign',
        largeImg: `https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/${payload.user.img}`,
        id: payload.meta.campaign.id,
        type: 'CAMPAIGN',
      });
    })
    .catch(error => {
      payload.setLoading(false);
      alert('An error occured');

      // payload.setAlert(true)
    });
}
