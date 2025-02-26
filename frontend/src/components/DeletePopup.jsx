import { Button, Card, IconButton, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../App";
import { getAccessToken } from "../utils/tokenUtilities";
import { useNavigate } from "react-router-dom";
import "../styles/deletePopup.css";

const DeletePopup = ({ notes, setNotes, currentNote, setActiveId }) => {
	const [showPopup, setShowPopup] = useState(false);
	const handleShowPopup = () => {
		setShowPopup(true);
	};
	const navigate = useNavigate();
	const accessToken = getAccessToken();
	if (accessToken === null) navigate("/signin");

	const isSharedNote = currentNote.shared;
	const DELETE_URL = isSharedNote
		? `${BACKEND_BASE_URL}/sharedNotes/${currentNote._id}`
		: `${BACKEND_BASE_URL}/notes/${currentNote._id}`;

	const handleDelete = () => {
		setNotes(notes.filter((note) => note._id !== currentNote._id));
		setActiveId(null);

		axios
			.delete(DELETE_URL, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((result) => {
				console.log("note deleted successfully: ", result);
			})
			.catch((err) => {
				console.error("error deleting the note: ", err);
			});
	};
	const handleClosePopup = () => {
		console.log("handling closing popup");
		setShowPopup(false);
	};
	if (showPopup) {
		return (
			<>
				<div
					className="backdrop"
					style={{
						display: showPopup ? "block" : "none",
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						padding: 0,
						margin: 0,
						zIndex: 1,
					}}
					onClick={handleClosePopup}
				/>
				<Card
					style={{
						display: "flex",
						position: "fixed",
						top: "25%",
						left: "37.5%",
						justifyContent: "center",
						alignItems: "center",
						width: "25%",
						height: "15%",
						margin: "0",
						padding: "0",
						zIndex: 2,
					}}
				>
					<div className="delete-container">
						<Typography
							style={{
								textAlign: "center",
							}}
							onClick={(e) => e.stopPropagation()}
						>
							Are you sure you want to DELETE this note?
						</Typography>
						<div className="button-container">
							<Button
								className="button-cancel"
								onClick={handleClosePopup}
								style={{
									margin: "5px",
								}}
							>
								cancel
							</Button>
							<Button className="button-delete" onClick={handleDelete}>
								Delete
							</Button>
						</div>
					</div>
				</Card>
			</>
		);
	}
	return (
		<IconButton
			title="Delete"
			sx={{
				marginRight: "5px",
			}}
			onClick={handleShowPopup}
		>
			<DeleteIcon
				sx={{
					color: "black",
					fontSize: 30,
				}}
			/>
		</IconButton>
	);
};

export default DeletePopup;
