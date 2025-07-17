import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, Paper, } from "@mui/material";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import dayjs from "dayjs";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectWebsiteSettings } from "../../../Redux/Slices/websiteSettingsSlice";
import { FindExamTimeTable, FindTimeTable, GettingGrades, postMessage, postNews, postTimeTable, sectionsDropdown, TimeTableFetch, updateExamTimeTable, updateTimeTable } from "../../../Api/Api";
import SnackBar from "../../SnackBar";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CancelIcon from "@mui/icons-material/Cancel";
import { selectGrades } from "../../../Redux/Slices/DropdownController";
import Loader from "../../Loader";

export default function EditExamTimeTablesPage() {
    const navigate = useNavigate();
    const token = "123";
    const user = useSelector((state) => state.auth);
    const rollNumber = user.rollNumber
    const userType = user.userType
    const userName = user.name
    const todayDateTime = dayjs().format('DD-MM-YYYY HH:mm');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState('');
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const grades = useSelector(selectGrades);
    const [selectedGradeId, setSelectedGradeId] = useState(0);
    const [selectedSection, setSelectedSection] = useState(null);
    const websiteSettings = useSelector(selectWebsiteSettings);
    const [selectedExam, setSelectedExam] = useState([]);
    const [examOptions, setExamOptions] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const location = useLocation();
    const { id } = location.state || {};


    const handleGradeChange = (newValue) => {
        setSelectedGrade(newValue?.id || null);
        setSelectedSection(null);
    };

    const handleSectionChange = (event, newValue) => {
        setSelectedSection(newValue?.sectionName || null);
    };
    const [previewData, setPreviewData] = useState({
        uploadedFiles: [],
    });

    const handlePreview = () => {
        setPreviewData({
            uploadedFiles,
        });
    };

    const handleExamChange = (event, newValue) => {
        setSelectedExam(newValue);
        console.log("Selected Exam:", newValue);
    };

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const validFormats = ['image/jpeg', 'image/webp', 'image/png'];

            const validFiles = acceptedFiles.filter(file => validFormats.includes(file.type));

            if (validFiles.length > 0) {
                setUploadedFiles([validFiles[0]]);
            } else {
                alert("Only JPEG, WebP, or PNG files are allowed.");
            }
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ".jpg, .jpeg, .webp, .png"
    });

    const handleImageClose = () => {
        setUploadedFiles([]);
    };

    useEffect(() => {
        if (id) {
            handleInsertData(id)
        }
    }, []);

    const handleInsertData = async (id) => {
        setIsLoading(true);
        try {
            const res = await axios.get(FindExamTimeTable, {
                params: {
                    Id: id
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSelectedExam(res.data.exam)
            setSelectedGrade(res.data.gradeId)
        } catch (error) {
            console.error('Error deleting news:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async () => {

        if (uploadedFiles.length === 0) {
            setMessage("Please upload a file before updating.");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        setIsLoading(true);

        try {
            const sendData = new FormData();
            sendData.append("Id", id);
            sendData.append("UserType", userType);
            sendData.append("RollNumber", rollNumber);
            sendData.append("Exam", selectedExam);
            sendData.append("FileType", "image");
            sendData.append("File", uploadedFiles[0] || '');
            sendData.append("UpdatedOn", todayDateTime);

            const res = await axios.put(updateExamTimeTable, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage("Exam Time table updated successfully");
            setOpen(true);
            setColor(true);
            setStatus(true);

            setTimeout(() => {
                navigate("/dashboardmenu/examtimetables");
            }, 500);

            console.log("Response:", res.data);
        } catch (error) {
            console.error("Error while updating exam time table data:", error);
            setMessage("An error occurred while updating the exam time table.");
            setOpen(true);
            setColor(false);
            setStatus(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (userType !== "superadmin" && userType !== "admin" && userType !== "staff") {
        return <Navigate to="/dashboardmenu/examtimetables" replace />;
    }

    return (
        <Box sx={{ width: "100%" }}>
            <SnackBar open={open} color={color} setOpen={setOpen} status={status} message={message} />
            {isLoading && <Loader />}
            <Box sx={{
                position: "fixed",
                zIndex: 100,
                backgroundColor: "#f2f2f2",
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                width: "100%",
                px: 2,
                py: 1.5,
                marginTop: "-2px"
            }}>
                <Link style={{ textDecoration: "none" }} to="/dashboardmenu/examtimetables">
                    <IconButton sx={{ width: "27px", height: "27px", marginTop: '2px' }}>
                        <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                    </IconButton>
                </Link>
                <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>Edit Exam Time Tables</Typography>
            </Box>
            <Grid container >
                <Grid item xs={12} sm={12} md={6} lg={6} mt={2} p={2}>
                    <Box sx={{ border: "1px solid #E0E0E0", backgroundColor: "#fbfbfb", py: 2, borderRadius: "7px", mt: 4.5, height: "75.6vh", overflowY: "auto", position: "relative" }}>
                        <Grid container spacing={2} sx={{ px: 2 }}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Typography sx={{ mb: 0.5 }}>Select Recipient</Typography>
                                <Autocomplete
                                    disablePortal
                                    disabled
                                    options={grades}
                                    getOptionLabel={(option) => option.sign}
                                    value={grades.find((item) => item.id === selectedGrade) || null}
                                    onChange={(event, newValue) => handleGradeChange(newValue)}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    sx={{ width: "100%" }}
                                    PaperComponent={(props) => (
                                        <Paper
                                            {...props}
                                            style={{
                                                ...props.style,
                                                maxHeight: "150px",
                                                backgroundColor: "#000",
                                                color: "#fff",
                                                fontSize: "13px"
                                            }}
                                        />
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Select Class"
                                            fullWidth
                                            InputProps={{
                                                ...params.InputProps,
                                                sx: {
                                                    paddingRight: 0,
                                                    height: "33px",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    backgroundColor: "#fff"
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Typography sx={{ mb: 0.5, ml: 1 }}>Select Class</Typography>
                                <Autocomplete
                                    disablePortal
                                    options={examOptions}
                                    getOptionLabel={(option) => option}
                                    onChange={handleExamChange}
                                    value={selectedExam}
                                    sx={{ width: "100%" }}
                                    PaperComponent={(props) => (
                                        <Paper
                                            {...props}
                                            style={{
                                                ...props.style,
                                                maxHeight: "150px",
                                                backgroundColor: "#000",
                                                color: "#fff",
                                                fontSize: "14px"
                                            }}
                                        />
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Select Exam"
                                            fullWidth
                                            InputProps={{
                                                ...params.InputProps,
                                                sx: {
                                                    paddingRight: 0,
                                                    height: "33px",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    backgroundColor: "#fff"
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item lg={12}>
                                <Typography sx={{ mb: 0.5, mt: 3, }}>Select Recipient</Typography>
                                <Box sx={{ mt: 1, textAlign: "center" }}>
                                    <Box
                                        {...getRootProps()}
                                        sx={{
                                            border: "2px dashed #1976d2",
                                            borderRadius: "8px",
                                            p: 1,
                                            backgroundColor: isDragActive ? "#e3f2fd" : "#e3f2fd",
                                            textAlign: "center",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <input {...getInputProps()} accept=".jpg, .jpeg, .webp, .png" />
                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                        <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                                            Drag and drop files here, or click to upload.
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            Supported formats: JPG, JPEG, WebP, PNG
                                        </Typography>
                                        <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
                                            Max file size: 25MB
                                        </Typography>
                                    </Box>
                                    {uploadedFiles.length > 0 && (
                                        <Box
                                            sx={{
                                                mt: 1,
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                gap: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    width: "100px",
                                                    height: "100px",
                                                    border: "1px solid #ddd",
                                                    borderRadius: "8px",
                                                }}
                                            >
                                                <img
                                                    src={uploadedFiles[0] instanceof File ? URL.createObjectURL(uploadedFiles[0]) : uploadedFiles[0].url || uploadedFiles[0]}
                                                    alt="Selected"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                {/* Remove Icon */}
                                                <IconButton
                                                    sx={{
                                                        position: "absolute",

                                                        top: -15,
                                                        right: -15,
                                                    }}
                                                    onClick={handleImageClose}
                                                >
                                                    <CancelIcon style={{ backgroundColor: "#777", color: "#fff", borderRadius: "30px" }} />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    )}

                                </Box>
                            </Grid>
                        </Grid>


                        <Box sx={{ mt: 3, }}>
                            <Grid container spacing={2} sx={{ position: "absolute", bottom: "10px", px: 2 }}>
                                <Grid item xs={6} sm={6} md={6} lg={5}>

                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={2.3}>

                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={2.3}>
                                    <Button
                                        sx={{
                                            textTransform: 'none',
                                            width: "100%",
                                            borderRadius: '30px',
                                            fontSize: '12px',
                                            py: 0.2,
                                            color: 'black',
                                            fontWeight: "600",
                                        }}
                                        onClick={handlePreview}>
                                        Preview
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={2.4}>
                                    <Button
                                        sx={{
                                            textTransform: 'none',
                                            backgroundColor: websiteSettings.mainColor,
                                            width: "100%",
                                            borderRadius: '30px',
                                            fontSize: '12px',
                                            py: 0.2,
                                            color: websiteSettings.textColor,
                                            fontWeight: "600",
                                        }}
                                        onClick={handleUpdate}>
                                        Update
                                    </Button>
                                </Grid>

                            </Grid>
                        </Box>

                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ py: 2, mt: 6.5, pr: 2 }}>
                    <Box sx={{ border: "1px solid #E0E0E0", backgroundColor: "#fbfbfb", p: 2, borderRadius: "6px", height: "75.6vh", overflowY: "auto" }}>
                        <Typography sx={{ fontSize: "14px", color: "rgba(0,0,0,0.7)" }}>Live Preview</Typography>
                        <hr style={{ border: "0.5px solid #CFCFCF" }} />
                        <Box>
                            <Grid container spacing={2}>
                                {previewData.uploadedFiles.map((file, index) => (
                                    <Grid key={index} item xs={12} sm={12} md={5} lg={12} sx={{ display: "flex", py: 1 }}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            width={'273px'}
                                            height={'210px'}
                                            alt={`Uploaded file ${index + 1}`}
                                        />
                                    </Grid>
                                ))}
                            </Grid>

                        </Box>
                    </Box>
                </Grid>



            </Grid>
        </Box>
    );
}
