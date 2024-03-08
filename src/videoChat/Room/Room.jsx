import { useParams } from "react-router-dom";
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt';
const Room = () => {
    const {roomId} = useParams();
    const myMeeting = async(element) => {
        const appId = 2131302028;
        const serverSecret = "742b1249f67cddd0a0edf66a36623d8e";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret,roomId, Date.now().toString(), "Riad Sarkar");
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `http://localhost:5173/dashboard/room/${roomId}`
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