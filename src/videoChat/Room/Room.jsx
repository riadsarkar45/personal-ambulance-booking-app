import { useParams } from "react-router-dom";
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt';
const Room = () => {
    const {roomId} = useParams();
    const myMeeting = async(element) => {
        const appId = 2031269989;
        const serverSecret = "291f7e05c9ef7b572e1f7625eb6edd5f";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret,roomId, Date.now().toString(), "Riad Sarkar");
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `ambulance-booking-app.surge.sh/room/${roomId}`
                }
            ],
            scenario: {
                mode:ZegoUIKitPrebuilt.OneONoneCall,  
            },
            showScreenSharingButton: false
        })
    }
    return (
        <div className="text-white">
            <div ref={myMeeting}></div>
        </div>
    );
};

export default Room;