import { useContext, useState } from "react";
import useAxiosPublic from "../../../Hooks/BaseUrl/useAxiosPublic";
import { useParams } from "react-router-dom";
import AmbulanceDetail from "./AmbulanceDetail";
import { useQuery } from "@tanstack/react-query";
import { Box, LinearProgress } from "@mui/material";
import { AuthContext } from "../../../Auth/AuthProvider/AuthProvider";
import toast from "react-hot-toast";



const AmbulanceDetails = () => {
    const [filteredData, setFilteredData] = useState({});
    const [comments, setComments] = useState([])
    const [isShowComments, setIsShowComments] = useState(true)
    const [commentToInsert, setCommentToInsert] = useState('')
    const [replyId, setReplyId] = useState('')
    const [repliesComment, setRepliesComment] = useState([])
    const [loading, setLoading] = useState(true)
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const { user } = useContext(AuthContext)

    const { refetch } = useQuery({
        queryKey: ["data"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/ambulance/detail/${id}`);
            setFilteredData(res.data.ambulanceDetails)
            setComments(res.data.comments)
            setRepliesComment(res.data.replyComments)
            setLoading(false)
            return res.data;
        },
    });


    const handleGetLocation = (location) => {
        setLocation(location)
    }

    const handleGetDate = (date) => {
        setDate(date)
    }

    const handleBookingAmbulance = (id, bookingReason) => {
        // for booking purpose only
        const dataToInsert = {
            id: id,
            location: location,
            date: date,
            bookingReason,
            bookerEmail: user?.email
        }
        axiosPublic.post(`/api/book/ambulance`, dataToInsert).then(()=> toast.success("Ambulance booked"))
    }

    const handleShowComments = () => {
        setIsShowComments(prevIsShowComments => !prevIsShowComments);
    };

    const handleGetCommentText = (e) => {
        setCommentToInsert(e)
    }

    const handleReplyComment = (commentId) => {
        setReplyId(commentId)
    }

    const handleSubmitComment = (commentType, parentCommentId) => {
        console.log(parentCommentId)
        const dataToInsert = { text: commentToInsert, postId: id, commentType: commentType, replyId: parentCommentId }
        axiosPublic.post('/api/submit/com', dataToInsert)
            .then(() => {
                refetch()
            })
    }

    const handleNewComment = (type, parent_Id, ml, repliedUserName) => {
        let number = ml + 10
        console.log(repliedUserName)
        const newComment = {
            userName: user?.email,
            texts: commentToInsert,
            postId: id,
            type: type, parent_Id: parent_Id,
            ml: number,
            repliedUserName: repliedUserName
        }
        console.log(newComment)
        axiosPublic.post('/api/new/comment', newComment)
            .then(res => console.log(res.data), refetch())
    }
    return (
        <div className="font-serif bg-white bg-opacity-20 text-white w-full">
            {
                loading ? (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                ) : (
                    <AmbulanceDetail
                        filteredData={filteredData}
                        handleBookingAmbulance={handleBookingAmbulance}
                        comments={comments}
                        handleShowComments={handleShowComments}
                        isShowComments={isShowComments}
                        handleGetCommentText={handleGetCommentText}
                        handleSubmitComment={handleSubmitComment}
                        handleReplyComment={handleReplyComment}
                        replyId={replyId}
                        handleNewComment={handleNewComment}
                        repliesComment={repliesComment}
                        handleGetLocation={handleGetLocation}
                        handleGetDate={handleGetDate}
                    />
                )
            }


        </div>
    );
};

export default AmbulanceDetails;