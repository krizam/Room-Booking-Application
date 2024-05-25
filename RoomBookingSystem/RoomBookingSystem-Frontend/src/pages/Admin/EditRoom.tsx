import AdminSidebar from "./AdminSidebar.tsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

const EditRoom = () => {
    const navigate = useNavigate();
    const { pk_id } = useParams();

    const useApiCall = useMutation({
        mutationKey: ["POST_ROOM_MANAGEROOM"],
        mutationFn: (payload: any) => {
            return axios.post("http://localhost:8080/room/save", payload);
        },
        onSuccess: () => {
            reset();
            navigate("/ManageRoom");
        }
    });

    const onSubmit = (value: any) => {
        const fd = new FormData();
        fd.append("roomId", pk_id); // Pass the room ID to identify the room to update
        fd.append("roomName", value?.roomName);
        fd.append("roomPrice", value?.roomPrice);
        fd.append("roomImage", value?.roomImage);
        fd.append("categoryId", value?.categoryId);
        useApiCall.mutate(fd);
    };

    const { data: getRoomByIdApi } = useQuery({
        queryKey: ["GET_BY_ID_CATEGORY_API"],
        queryFn() {
            return axios.get("http://localhost:8080/room/findById/" + pk_id);
        },
        enabled: !!pk_id
    });

    const { register, handleSubmit, formState, reset } = useForm({ defaultValues: getRoomByIdApi?.data });
    const { errors } = formState;

    const location = useLocation();
    const currentLocation = location.pathname;

    return (
        <>
            <AdminSidebar activePage={currentLocation} />
            <div className="add-room-modal">
                <div className="add-room-modal-content">
                    <h2>Edit Room</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={"room-name"}>
                            <label>Room Name</label>
                            <input type={"text"} placeholder={"Enter room Name"} {...register("roomName", { required: "Room Name is required!!" })} />
                            <h6 style={{ paddingLeft: "3px" }}>{errors?.roomName?.message}</h6>
                        </div>
                        <div className={"room-price"}>
                            <label>Price</label>
                            <input type={"number"} placeholder={"Enter the Price"} {...register("roomPrice", { required: "Price is required!!" })} />
                            <h6 style={{ paddingLeft: "3px" }}>{errors?.roomPrice?.message}</h6>
                        </div>
                        <div className={"room-image"}>
                            <label>Image URL</label>
                            <input type={"text"} placeholder={"Enter the Image URL"} {...register("roomImage", { required: "Image URL is required!!" })} />
                            <h6 style={{ paddingLeft: "3px" }}>{errors?.roomImage?.message}</h6>
                        </div>
                        <div className={"room-name-add-btn"}>
                            <button type={"submit"}>Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditRoom;
