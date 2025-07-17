import React, { useEffect, useState } from "react";
import { Box, Stepper, Step, StepLabel, Typography, IconButton, useMediaQuery, Grid2, Button, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, Accordion, AccordionSummary, AccordionDetails, TextField, FormGroup, Checkbox, Autocomplete, Paper, Popper, InputAdornment, Dialog, TextareaAutosize, DialogContent, DialogActions } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectWebsiteSettings } from "../../../Redux/Slices/websiteSettingsSlice";
import { useDispatch, useSelector } from "react-redux";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useDropzone } from "react-dropzone";
import { Textarea } from "@mui/joy";
import { FindStudentManagementDetails, postNews, postStudentAcademicInformation, postStudentDocumentInformation, postStudentFamilyInformation, postStudentgeneralhealthInformation, postStudentGuardianInformation, postStudentInformation, postStudentSiblingInformation } from "../../../Api/Api";
import axios from "axios";
import DropDownList from "../../DropdownList";
import { selectGrades } from "../../../Redux/Slices/DropdownController";
import Loader from "../../Loader";
import SnackBar from "../../SnackBar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const steps = [
    "Student Academic Info",
    "Student Info",
    "Family Info",
    "Guardian Info",
    "Sibling Info",
    "Upload Documents",
    "Medical Info"
];

export default function CreateStudentInfoPage() {
    const token = "123"
    const theme = useTheme();
    const user = useSelector((state) => state.auth);
    const RollNumber = user.rollNumber
    const userType = user.userType
    const userName = user.name
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const grades = useSelector(selectGrades);
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [activeStep, setActiveStep] = useState(0);
    const [count, setCount] = useState(0);
    const websiteSettings = useSelector(selectWebsiteSettings);
    const [changesHappended, setChangesHappended] = useState(false);
    const [fileType, setFileType] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [medication, setMedication] = useState("");
    const [medicationDescription, setMedicationDescription] = useState("");
    const [allergiesDescription, setAllergiesDescription] = useState("");
    const [allergies, setAllergies] = useState("");
    const [openTextarea, setOpenTextarea] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [openPreviewImage, setOpenPreviewImage] = useState(false);

    const [fetchRollNumber, setFetchRollNumber] = useState("");

    const [applicationNo, setApplicationNo] = useState("");
    const [admissionNo, setAdmissionNo] = useState("");
    const [studentPermanentNumber, setStudentPermanentNumber] = useState("");
    const [birthCertificateNo, setBirthCertificateNo] = useState("");
    const [selectedGradeId, setSelectedGradeId] = useState("");
    const [selectedSiblingClass, setSelectedSiblingClass] = useState("");
    const [selectedSection, setSelectedSection] = useState(null);
    const [aadharNo, setAadharNo] = useState("");
    const [emisNo, setEmisNo] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [rchIdOrPicmeNumber, setRchIdOrPicmeNumber] = useState("");
    const [originalCertificateReceived, setOriginalCertificateReceived] = useState("");
    const [rteStudent, setRteStudent] = useState("");
    const [studentNameEnglish, setStudentNameEnglish] = useState("");
    const [studentNameTamil, setStudentNameTamil] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [gender, setGender] = useState("");
    const [religion, setReligion] = useState("");
    const [community, setCommunity] = useState("");
    const [motherTongue, setMotherTongue] = useState("");
    const [admissionClass, setAdmissionClass] = useState("");
    const [section, setSection] = useState("");
    const [previousSchool, setPreviousSchool] = useState("");
    const [previousBoard, setPreviousBoard] = useState("");
    const [mediumOfInstruction, setMediumOfInstruction] = useState("");
    const [secondLanguage, setSecondLanguage] = useState("");
    const [residentialAddress, setResidentialAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");

    // Father's Details
    const [fatherNameEnglish, setFatherNameEnglish] = useState("");
    const [fatherNameTamil, setFatherNameTamil] = useState("");
    const [fatherQualification, setFatherQualification] = useState("");
    const [fatherOrganization, setFatherOrganization] = useState("");
    const [fatherDesignation, setFatherDesignation] = useState("");
    const [fatherAnnualIncome, setFatherAnnualIncome] = useState("");
    const [fatherOfficeAddress, setFatherOfficeAddress] = useState("");
    const [fatherMobileNumber, setFatherMobileNumber] = useState("");
    const [fatherEmail, setFatherEmail] = useState("");

    // Mother's Details
    const [motherNameEnglish, setMotherNameEnglish] = useState("");
    const [motherNameTamil, setMotherNameTamil] = useState("");
    const [motherQualification, setMotherQualification] = useState("");
    const [motherOrganization, setMotherOrganization] = useState("");
    const [motherDesignation, setMotherDesignation] = useState("");
    const [motherAnnualIncome, setMotherAnnualIncome] = useState("");
    const [motherOfficeAddress, setMotherOfficeAddress] = useState("");
    const [motherMobileNumber, setMotherMobileNumber] = useState("");
    const [motherEmail, setMotherEmail] = useState("");

    // Guardian's Details
    const [guardianNameEnglish, setGuardianNameEnglish] = useState("");
    const [guardianNameTamil, setGuardianNameTamil] = useState("");
    const [guardianRelationship, setGuardianRelationship] = useState("");
    const [guardianOrganization, setGuardianOrganization] = useState("");
    const [guardianDesignation, setGuardianDesignation] = useState("");
    const [guardianAnnualIncome, setGuardianAnnualIncome] = useState("");
    const [guardianOfficeAddress, setGuardianOfficeAddress] = useState("");
    const [guardianMobileNumber, setGuardianMobileNumber] = useState("");
    const [guardianEmail, setGuardianEmail] = useState("");


    const [siblings, setSiblings] = useState([
        {
            id: 1,
            rollNumber,
            siblingNameInEnglish: "",
            siblingNameInTamil: "",
            siblingGender: "",
            siblingRelationship: "",
            siblingClass: "",
            siblingSection: "",
            siblingSchoolName: "",
            siblingAdmissionNo: "",
            siblingStudyingInSameSchool: "",
        }
    ]);

    const [polio, setPolio] = useState(false);
    const [dtp, setDtp] = useState(false);
    const [mmr, setMmr] = useState(false);
    const [hepatitisB, setHepatitisB] = useState(false);
    const [covid19, setCovid19] = useState(false);
    const [vacinationOthersSpecify, setVacinationOthersSpecify] = useState("");

    const [reactionSeverity, setReactionSeverity] = useState("");

    // Primary Contact Details
    const [primaryContactName, setPrimaryContactName] = useState("");
    const [primaryRelationship, setPrimaryRelationship] = useState("");
    const [primaryContactNumber, setPrimaryContactNumber] = useState("");

    // Alternate Contact Details
    const [alternateContactName, setAlternateContactName] = useState("");
    const [alternateRelationship, setAlternateRelationship] = useState("");
    const [alternateContactNumber, setAlternateContactNumber] = useState("");

    // Physician Contact Details
    const [physicianName, setPhysicianName] = useState("");
    const [physicianContactNumber, setPhysicianContactNumber] = useState("");
    const [preferredHospital, setPreferredHospital] = useState("");

    const [birthCertificate, setBirthCertificate] = useState(null);
    const [photoCertificate, setPhotoCertificate] = useState(null);
    const [academicCertificate, setAcademicCertificate] = useState(null);
    const [transferCertificate, setTransferCertificate] = useState(null);
    const [addressCertificate, setAddressCertificate] = useState(null);
    const [addressGuardianCertificate, setAddressGuardianCertificate] = useState(null);
    const [communityCertificate, setCommunityCertificate] = useState(null);
    const [incomeCertificate, setIncomeCertificate] = useState(null);
    const [medicalCertificate, setMedicalCertificate] = useState(null);
    const [specialNeedsDocument, setSpecialNeedsDocument] = useState(null);
    const [parentEmploymentProof, setParentEmploymentProof] = useState(null);
    const [affidavitDeclaration, setAffidavitDeclaration] = useState(null);
    const [aadharCard, setAadharCard] = useState(null);

    const [birthCertificateFileType, setBirthCertificateFileType] = useState(null);
    const [photoCertificateFileType, setPhotoCertificateFileType] = useState(null);
    const [academicCertificateFileType, setAcademicCertificateFileType] = useState(null);
    const [transferCertificateFileType, setTransferCertificateFileType] = useState(null);
    const [addressCertificateFileType, setAddressCertificateFileType] = useState(null);
    const [addressGuardianCertificateFileType, setAddressGuardianCertificateFileType] = useState(null);
    const [communityCertificateFileType, setCommunityCertificateFileType] = useState(null);
    const [incomeCertificateFileType, setIncomeCertificateFileType] = useState(null);
    const [medicalCertificateFileType, setMedicalCertificateFileType] = useState(null);
    const [specialNeedsDocumentFileType, setSpecialNeedsDocumentFileType] = useState(null);
    const [parentEmploymentProofFileType, setParentEmploymentProofFileType] = useState(null);
    const [affidavitDeclarationFileType, setAffidavitDeclarationFileType] = useState(null);
    const [aadharCardFileType, setAadharCardFileType] = useState(null);

    const [isDisabledAcademic, setIsDisabledAcademic] = useState(false);
    const [isDisabledStudentInfo, setIsDisabledStudentInfo] = useState(false);
    const [isDisabledFamilyInfo, setIsDisabledFamilyInfo] = useState(false);
    const [isDisabledGuardianInfo, setIsDisabledGuardianInfo] = useState(false);
    const [isDisabledSiblingInfo, setIsDisabledSiblingInfo] = useState(false);
    const [isDisabledDocument, setIsDisabledDocument] = useState(false);
    const [isDisabledHealthInfo, setIsDisabledHealthInfo] = useState(false);

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState("");
    const [allergiesSpecify, setAllergiesSpecify] = useState("");
    const [othersSpecify, setOthersSpecify] = useState("");
    const [previousMedicalConditions, setPreviousMedicalConditions] = useState("");
    const [pastSurgeries, setPastSurgeries] = useState("");
    const [medicalConditions, setMedicalConditions] = useState({
        asthma: "no",
        diabetes: "no",
        heartProblem: "no",
        epilepsy: "no",
        allergies: "no",
        others: "no"
    });

    const selectedGrade = grades.find((grade) => grade.sign === selectedGradeId);
    const sections = selectedGrade?.sections.map((section) => ({ sectionName: section })) || [];

    const selectedClass = grades.find((grade) => grade.sign === selectedSiblingClass);
    const siblingSections = selectedClass?.sections.map((section) => ({ sectionName: section })) || [];
    const [openPdf, setOpenPdf] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleOpenPdf = (pdfFile) => {
        if (pdfFile instanceof File) {
            const url = URL.createObjectURL(pdfFile);
            setPdfUrl(url);
            setOpenPdf(true);
        } else {
            console.error("Invalid file:", pdfFile);
        }
    };

    const handleClosePdf = () => {
        setOpenPdf(false);
        if (pdfUrl) {
            URL.revokeObjectURL(pdfUrl);
            setPdfUrl(null);
        }
    };
    const addSibling = () => {
        if (siblings.length < 3) {
            setSiblings([
                ...siblings,
                {
                    id: siblings.length + 1,
                    rollNumber,
                    siblingNameInEnglish: "",
                    siblingNameInTamil: "",
                    siblingGender: "",
                    siblingRelationship: "",
                    siblingClass: "",
                    siblingSection: "",
                    siblingSchoolName: "",
                    siblingAdmissionNo: "",
                    siblingStudyingInSameSchool: "",
                }
            ]);
        }
    };

    const removeSibling = (id) => {
        setSiblings(siblings.filter(sibling => sibling.id !== id));
    };

    const handleChange = (id, field, value) => {
        setSiblings(siblings.map(sibling =>
            sibling.id === id
                ? { ...sibling, [field]: value }
                : sibling
        ));
    };

    const prepareSiblingData = () => {
        return siblings.map(sibling => ({
            rollNumber: fetchRollNumber,
            siblingNameInEnglish: sibling.siblingNameInEnglish || "",
            siblingNameInTamil: sibling.siblingNameInTamil || "",
            siblingGender: sibling.siblingGender || "",
            siblingRelationship: sibling.siblingRelationship || "",
            siblingClass: sibling.siblingClass || "",
            siblingSection: sibling.siblingSection || "",
            siblingSchoolName: sibling.siblingSchoolName || "",
            siblingAdmissionNo: sibling.siblingAdmissionNo || "",
            siblingStudyingInSameSchool: sibling.siblingStudyingInSameSchool || "no",
        }));
    };

    const handleSectionChange = (event, newValue) => {
        setSelectedSection(newValue?.sectionName || null);
    };

    const handleGradeChange = (newValue) => {
        if (newValue) {
            setSelectedGradeId(newValue.sign);
            setSelectedSection(newValue.sections[0]);
        } else {
            setSelectedGradeId("");
            setSelectedSection(null);
        }
    };

    const handlesiblingClassChange = (id, field, value) => {
        if (value) {
            handleChange(id, field, value.sign)
            setSelectedSiblingClass(value.sign)
            setSelectedSection(value.sections?.[0] || null);
        } else {
            handleChange(id, field, "")
            setSelectedSection(null);
        }
    };

    const handleFileUpload = (acceptedFiles, setFileState, setFileTypeState) => {
        if (acceptedFiles.length > 0) {
            const validFormats = ['image/jpeg', 'image/webp', 'image/png', 'application/pdf'];

            const validFiles = acceptedFiles.filter(file => validFormats.includes(file.type));

            if (validFiles.length > 0) {
                const file = validFiles[0];
                setFileState(file);

                if (file.type === "application/pdf") {
                    setFileTypeState("pdf");
                } else {
                    setFileTypeState("image");
                }
            } else {
                alert("Only JPEG, WebP, PNG, or PDF files are allowed.");
            }
        }
    };
    
    const handleFileUpload1 = (acceptedFiles, setFileState, setFileTypeState) => {
        if (acceptedFiles.length > 0) {
            const validFormats = ['image/jpeg', 'image/webp', 'image/png'];
    
            const validFiles = acceptedFiles.filter(file => validFormats.includes(file.type));
    
            if (validFiles.length > 0) {
                const file = validFiles[0];
                setFileState(file);
                setFileTypeState("image");
            } else {
                alert("Only JPEG, WebP, or PNG files are allowed.");
            }
        }
    };
    
    const acceptedFileTypes = {
        "image/jpeg": [],
        "image/png": [],
        "image/webp": [],
        "application/pdf": []
    };

    const { getRootProps: getRootPropsBirth, getInputProps: getInputPropsBirth } = useDropzone({
        onDrop: (files) => handleFileUpload(files, setBirthCertificate, setBirthCertificateFileType),
        accept: acceptedFileTypes
    });

    const { getRootProps: getRootPropsPhoto, getInputProps: getInputPropsPhoto } = useDropzone({
        onDrop: (files) => handleFileUpload1(files, setPhotoCertificate, setPhotoCertificateFileType),
        accept: {
            "image/jpeg": [],
            "image/png": [],
            "image/webp": []
        }
    });
    

    const { getRootProps: getRootPropsAcademic, getInputProps: getInputPropsAcademic } = useDropzone({
        onDrop: (files) => handleFileUpload(files, setAcademicCertificate, setAcademicCertificateFileType),
        accept: acceptedFileTypes
    });

    const { getRootProps: getRootPropsTransfer, getInputProps: getInputPropsTransfer } = useDropzone({
        onDrop: (files) => handleFileUpload(files, setTransferCertificate, setTransferCertificateFileType),
        accept: acceptedFileTypes
    });

    const { getRootProps: getRootPropsAddress, getInputProps: getInputPropsAddress } = useDropzone({
        onDrop: (files) => handleFileUpload(files, setAddressCertificate, setAddressCertificateFileType),
        accept: acceptedFileTypes
    });

    const { getRootProps: getRootPropsAddressGuardian, getInputProps: getInputPropsAddressGuardian } = useDropzone({
        onDrop: (files) => handleFileUpload(files, setAddressGuardianCertificate, setAddressGuardianCertificateFileType),
        accept: acceptedFileTypes
    });

    const { getRootProps: getRootPropsCaste, getInputProps: getInputPropsCaste } = useDropzone({
        onDrop: (files) => handleFileUpload(files, setCommunityCertificate, setCommunityCertificateFileType),
        accept: acceptedFileTypes
    });

    const { getRootProps: getRootPropsIncome, getInputProps: getInputPropsIncome } = useDropzone({
        onDrop: (files) => handleFileUpload(files, setIncomeCertificate, setIncomeCertificateFileType),
        accept: acceptedFileTypes
    });

    const { getRootProps: getRootPropsMedical, getInputProps: getInputPropsMedical } = useDropzone({
        onDrop: (files) => handleFileUpload(files, setMedicalCertificate, setMedicalCertificateFileType),
        accept: acceptedFileTypes
    });

    const { getRootProps: getRootPropsSpecial, getInputProps: getInputPropsSpecial } = useDropzone({
        onDrop: (files) => handleFileUpload(files, setSpecialNeedsDocument, setSpecialNeedsDocumentFileType),
        accept: acceptedFileTypes
    });

    const { getRootProps: getRootPropsEmployment, getInputProps: getInputPropsEmployment } = useDropzone({
        onDrop: (files) => handleFileUpload(files, setParentEmploymentProof, setParentEmploymentProofFileType),
        accept: acceptedFileTypes
    });

    const { getRootProps: getRootPropsAffidavit, getInputProps: getInputPropsAffidavit } = useDropzone({
        onDrop: (files) => handleFileUpload(files, setAffidavitDeclaration, setAffidavitDeclarationFileType),
        accept: acceptedFileTypes
    });

    const { getRootProps: getRootPropsAadhar, getInputProps: getInputPropsAadhar } = useDropzone({
        onDrop: (files) => handleFileUpload(files, setAadharCard, setAadharCardFileType),
        accept: acceptedFileTypes
    });


    const handlePreview = (file) => {
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setOpenPreviewImage(true);
        }
    };

    const handleSeverityChange = (event) => {
        setSeverity(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setMedicalConditions((prev) => ({
            ...prev,
            [name]: checked ? "yes" : "no"
        }));
    };

    const formatDateToDisplay = (date) => {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    };

    const formatDateToInput = (date) => {
        if (!date) return "";
        const [day, month, year] = date.split("-");
        return `${year}-${month}-${day}`;
    };

    const handleOpenTextArea = (value) => {
        setOpenTextarea(value)
    };

    const handleAcademicSubmit = async (status) => {
        if (!applicationNo.trim()) {
            setMessage("Application no is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }

        if (!studentPermanentNumber.trim()) {
            setMessage("Roll no is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }

        if (!selectedGradeId.trim()) {
            setMessage("Class is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }

        if (!selectedSection.trim()) {
            setMessage("Section is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!aadharNo.trim()) {
            setMessage("Aadhar is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!birthCertificateNo.trim()) {
            setMessage("Birth certificate no is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!originalCertificateReceived.trim()) {
            setMessage("Orginal certificate Received is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!rteStudent.trim()) {
            setMessage("RTE Student is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        setIsLoading(true);
        try {
            const sendData = {
                applicationNo: applicationNo,
                birthCertificateNo: birthCertificateNo,
                aadharNo: aadharNo,
                emisNo: emisNo,
                rollNumber: studentPermanentNumber,
                rchiDorPICMENumber: rchIdOrPicmeNumber,
                originalCertificateReceived: originalCertificateReceived,
                admissionClass: selectedGradeId,
                section: selectedSection,
                RTEStudent: rteStudent,
            };

            const res = await axios.post(postStudentAcademicInformation, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOpen(true);
            setColor(true);
            setStatus(true);
            setMessage("User created successfully.");
            setFetchRollNumber(studentPermanentNumber)
            setIsDisabledAcademic(true)
            setActiveStep("1")
        } catch (error) {
            setOpen(true);
            setColor(false);
            setStatus(false);
            setMessage("Error while inserting data");
            setFetchRollNumber("")
        } finally {
            setIsLoading(false);
        }
    };

    const handleAcademicClear = () => {
        setApplicationNo("")
        setStudentPermanentNumber("")
        setSelectedGradeId("")
        setSelectedSection("")
        setBirthCertificateNo("")
        setAadharNo("")
        setEmisNo("")
        setRchIdOrPicmeNumber("")
        setOriginalCertificateReceived(null);
        setRteStudent(null)
    }

    const handleStudentSubmit = async (status) => {
        if (!studentNameEnglish.trim()) {
            setMessage("Student name in english is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!studentNameTamil || !studentNameTamil.trim()) {
            setMessage("Student name in tamil is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }

        if (!dateOfBirth || !dateOfBirth.trim()) {
            setMessage("Date of birth is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!gender || !gender.trim()) {
            setMessage("Gender is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!religion || !religion.trim()) {
            setMessage("Religion is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!motherTongue || !motherTongue.trim()) {
            setMessage("Mother tongue is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!secondLanguage || !secondLanguage.trim()) {
            setMessage("Second language is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!residentialAddress || !residentialAddress.trim()) {
            setMessage("Residential Address is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!city || !city.trim()) {
            setMessage("City is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!pincode || !pincode.trim()) {
            setMessage("Pincode is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!state || !state.trim()) {
            setMessage("State is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }

        if (!bloodGroup || !bloodGroup.trim()) {
            setMessage("Blood Group is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        setIsLoading(true);
        try {
            const sendData = {
                rollNumber: fetchRollNumber,
                studentNameInEnglish: studentNameEnglish,
                studentNameInTamil: studentNameTamil,
                dateOfBirth: dateOfBirth,
                gender: gender,
                religion: religion,
                community: community,
                motherTongue: motherTongue,
                previousSchool: previousSchool,
                previousBoard: previousBoard,
                mediumOfInstruction: mediumOfInstruction,
                secondLanguage: secondLanguage,
                residentialAddress: residentialAddress,
                city: city,
                pincode: pincode,
                state: state,
                country: "India",
                BloodGroup: bloodGroup
            };

            const res = await axios.post(postStudentInformation, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOpen(true);
            setColor(true);
            setStatus(true);
            setMessage("Data Added successfully.");
            setIsDisabledStudentInfo(true)
            setActiveStep("2")
        } catch (error) {
            setOpen(true);
            setColor(false);
            setStatus(false);
            setMessage("Error while inserting data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleStudentClear = () => {
        setStudentNameEnglish("");
        setStudentNameTamil("");
        setDateOfBirth(null);
        setGender(null);
        setReligion(null);
        setCommunity(null);
        setMotherTongue(null);
        setPreviousSchool("");
        setPreviousBoard(null);
        setMediumOfInstruction(null);
        setSecondLanguage(null);
        setResidentialAddress("");
        setCity("");
        setPincode("");
        setState(null);
        setBloodGroup(null);
    }

    const handleFamilyInfoSubmit = async (status) => {
        if (!fatherNameEnglish || !fatherNameEnglish.trim()) {
            setMessage("Father name in english is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }

        if (!fatherNameTamil || !fatherNameTamil.trim()) {
            setMessage("Father name in tamil is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!fatherMobileNumber || !fatherMobileNumber.trim()) {
            setMessage("Mobile number is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!motherNameEnglish || !motherNameEnglish.trim()) {
            setMessage("Mother name in english is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }

        if (!motherNameTamil || !motherNameTamil.trim()) {
            setMessage("Mother name in tamil is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!motherMobileNumber || !motherMobileNumber.trim()) {
            setMessage("Mobile number is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        setIsLoading(true);
        try {
            const sendData = {
                rollNumber: fetchRollNumber,
                fatherNameInEnglish: fatherNameEnglish,
                fatherNameInTamil: fatherNameTamil,
                fatherQualification: fatherQualification,
                fatherOrganization: fatherOrganization,
                fatherDesignation: fatherDesignation,
                fatherAnnualIncome: fatherAnnualIncome,
                fatherOfficeAddress: fatherOfficeAddress,
                fatherMobileNumber: fatherMobileNumber,
                fatherEmailID: fatherEmail,
                motherNameInEnglish: motherNameEnglish,
                motherNameInTamil: motherNameTamil,
                motherQualification: motherQualification,
                motherOrganization: motherOrganization,
                motherDesignation: motherDesignation,
                motherAnnualIncome: motherAnnualIncome,
                motherOfficeAddress: motherOfficeAddress,
                motherMobileNumber: motherMobileNumber,
                motherEmailID: motherEmail
            };

            const res = await axios.post(postStudentFamilyInformation, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOpen(true);
            setColor(true);
            setStatus(true);
            setMessage("Data Added successfully.");
            setIsDisabledFamilyInfo(true)
            setActiveStep("3")
        } catch (error) {
            setOpen(true);
            setColor(false);
            setStatus(false);
            setMessage("Error while inserting data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFamilyInfoClear = () => {

        setFatherNameEnglish("");
        setFatherNameTamil("");
        setFatherQualification(null);
        setFatherOrganization(null);
        setFatherDesignation(null);
        setFatherAnnualIncome(null);
        setFatherOfficeAddress("");
        setFatherMobileNumber("");
        setFatherEmail("");

        setMotherNameEnglish("");
        setMotherNameTamil("");
        setMotherQualification(null);
        setMotherOrganization(null);
        setMotherDesignation(null);
        setMotherAnnualIncome(null);
        setMotherOfficeAddress("");
        setMotherMobileNumber("");
        setMotherEmail("");
    }

    const handleGuardianInfoSubmit = async (status) => {
        if (!guardianNameEnglish || !guardianNameEnglish.trim()) {
            setMessage("Guardian name in english is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }

        if (!guardianNameTamil || !guardianNameTamil.trim()) {
            setMessage("Guardian name in tamil is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }

        if (!guardianRelationship || !guardianRelationship.trim()) {
            setMessage("Relationship is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }

        if (!guardianMobileNumber || !guardianMobileNumber.trim()) {
            setMessage("Mobile number is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        setIsLoading(true);
        try {
            const sendData = {
                rollNumber: fetchRollNumber,
                guardianNameInEnglish: guardianNameEnglish,
                guardianNameInTamil: guardianNameTamil,
                guardianRelationship: guardianRelationship,
                guardianMobileNumber: guardianMobileNumber,
                guardianOrganization: guardianOrganization,
                guardianDesignation: guardianDesignation,
                guardianAnnualIncome: guardianAnnualIncome,
                guardianOfficeAddress: guardianOfficeAddress,
                guardianEMail: guardianEmail,
            };

            const res = await axios.post(postStudentGuardianInformation, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOpen(true);
            setColor(true);
            setStatus(true);
            setMessage("Data Added successfully.");
            setIsDisabledGuardianInfo(true)
            setActiveStep("4")
        } catch (error) {
            setOpen(true);
            setColor(false);
            setStatus(false);
            setMessage("Error while inserting data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuardianInfoClear = () => {
        setGuardianNameEnglish("");
        setGuardianNameTamil("");
        setGuardianRelationship(null);
        setGuardianMobileNumber("");
        setGuardianOrganization(null);
        setGuardianDesignation(null);
        setGuardianAnnualIncome(null);
        setGuardianOfficeAddress("");
        setGuardianEmail("");
    }

    const handleSibilingInfoSubmit = async (status) => {
        setIsLoading(true);
        const formattedData = prepareSiblingData();

        try {
            const res = await axios.post(postStudentSiblingInformation, formattedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOpen(true);
            setColor(true);
            setStatus(true);
            setMessage("Data Added successfully.");
            setIsDisabledSiblingInfo(true)
            setActiveStep("5")
        } catch (error) {
            setOpen(true);
            setColor(false);
            setStatus(false);
            setMessage("Error while inserting data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSibilingInfoClear = () => {
        setSiblings([
            {
                id: 1,
                siblingNameInEnglish: "",
                siblingNameInTamil: "",
                siblingGender: "",
                siblingRelationship: "",
                siblingClass: "",
                siblingSection: "",
                siblingSchoolName: "",
                siblingAdmissionNo: "",
                siblingStudyingInSameSchool: "",
            },
        ]);
    }

    const handleDocumentsSubmit = async (status) => {

        if (!photoCertificate) {
            setMessage("Passport Size Photo is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!addressCertificate) {
            setMessage("Address Proof(Student) is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!communityCertificate) {
            setMessage("Community Certificate is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (!aadharCard) {
            setMessage("Aadhar Card is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        setIsLoading(true);
        try {
            const sendData = new FormData();
            sendData.append("RollNumber", fetchRollNumber);
            sendData.append("BirthCertificatefiletype", birthCertificateFileType || "");
            sendData.append("BirthCertificatefile", birthCertificate);
            sendData.append("PassportSizePhotofiletype", photoCertificateFileType || "");
            sendData.append("PassportSizePhotofile", photoCertificate);
            sendData.append("PreviousAcademicReportfiletype", academicCertificateFileType || "");
            sendData.append("PreviousAcademicReportfile", academicCertificate);
            sendData.append("TransferCertificatefiletype", transferCertificateFileType || "");
            sendData.append("TransferCertificatefile", transferCertificate);
            sendData.append("AddressProofStudentfiletype", addressCertificateFileType || "");
            sendData.append("AddressProofStudentfile", addressCertificate);
            sendData.append("AddressProofGuardianfiletype", addressGuardianCertificateFileType || "");
            sendData.append("AddressProofGuardianfile", addressGuardianCertificate);
            sendData.append("CasteCertificatefiletype", communityCertificateFileType || "");
            sendData.append("CasteCertificatefile", communityCertificate);
            sendData.append("IncomeCertificatefiletype", incomeCertificateFileType || "");
            sendData.append("IncomeCertificatefile", incomeCertificate);
            sendData.append("MedicalCertificatefiletype", medicalCertificateFileType || "");
            sendData.append("MedicalCertificatefile", medicalCertificate);
            sendData.append("SpecialNeedsDocumentfiletype", specialNeedsDocumentFileType || "");
            sendData.append("SpecialNeedsDocumentfile", specialNeedsDocument);
            sendData.append("ParentEmploymentProoffiletype", parentEmploymentProofFileType || "");
            sendData.append("ParentEmploymentProoffile", parentEmploymentProof);
            sendData.append("AffidavitDeclarationfiletype", affidavitDeclarationFileType || "");
            sendData.append("AffidavitDeclarationfile", affidavitDeclaration);
            sendData.append("Aadharfiletype", aadharCardFileType || "");
            sendData.append("Aadharfile", aadharCard);

            const res = await axios.post(postStudentDocumentInformation, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOpen(true);
            setColor(true);
            setStatus(true);
            setMessage("Data Added successfully.");
            setIsDisabledDocument(true)
            setActiveStep("6")
        } catch (error) {
            setOpen(true);
            setColor(false);
            setStatus(false);
            setMessage("Error while inserting data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDocumentsClear = () => {
        setBirthCertificate("");
        setBirthCertificateFileType("");
        setPhotoCertificate("");
        setPhotoCertificateFileType("");
        setAcademicCertificate("");
        setAcademicCertificateFileType("");
        setTransferCertificate("");
        setTransferCertificateFileType("");
        setAddressCertificate("");
        setAddressCertificateFileType("");
        setAddressGuardianCertificate("");
        setAddressGuardianCertificateFileType("");
        setCommunityCertificate("");
        setCommunityCertificateFileType("");
        setIncomeCertificate("");
        setIncomeCertificateFileType("");
        setMedicalCertificate("");
        setMedicalCertificateFileType("");
        setSpecialNeedsDocument("");
        setSpecialNeedsDocumentFileType("");
        setParentEmploymentProof("");
        setParentEmploymentProofFileType("");
        setAffidavitDeclaration("");
        setAffidavitDeclarationFileType("");
        setAadharCard("");
        setAadharCardFileType("");
    }

    const handleHealthInfoSubmit = async (status) => {
        setIsLoading(true);
        try {
            const sendData = {
                rollNumber: fetchRollNumber,
                asthma: medicalConditions.asthma || "no",
                diabetes: medicalConditions.diabetes || "no",
                heartProblem: medicalConditions.heartProblem || "no",
                epilepsy: medicalConditions.epilepsy || "no",
                allergiesSpecify: medicalConditions.allergies || "no",
                allergiesSpecifyDescription: allergiesSpecify || "",
                othersSpecify: medicalConditions.others || "no",
                othersSpecifyDescription: othersSpecify || "",
                previousMedicalConditions: previousMedicalConditions || "",
                pastSurgeries: pastSurgeries || "",
                polio: polio || "",
                dtp: dtp || "",
                mmr: mmr || "",
                hepatitisB: hepatitisB || "",
                covid19: covid19 || "",
                vacinationOthers: vacinationOthersSpecify || "",
                medicationsStatus: medication || "no",
                medicationDescription: medicationDescription || "",
                allergiesStatus: allergies || "no",
                allergiesDescription: allergiesDescription || "",
                reactionSeverity: severity || "",
                primaryContactName: primaryContactName || "",
                primaryContactRelationship: primaryRelationship || "",
                primaryContactContactNumber: primaryContactNumber || "",
                alternateContactName: alternateContactName || "",
                alternateContactRelationship: alternateRelationship || "",
                alternateContactContactNumber: alternateContactNumber || "",
                familyPhysicianName: physicianName || "",
                physicianContactNumber: physicianContactNumber || "",
                preferredHospital: preferredHospital || "",
            };

            const res = await axios.post(postStudentgeneralhealthInformation, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOpen(true);
            setColor(true);
            setStatus(true);
            setMessage("Data Added successfully.");
            setMedicalConditions({
                asthma: "no",
                diabetes: "no",
                heartProblem: "no",
                epilepsy: "no",
                allergies: "no",
                others: "no"
            });
            setIsDisabledHealthInfo(true)
            setActiveStep("7")
            setTimeout(() => {
                navigate('/dashboardmenu/student/information')
            }, 1000);
        } catch (error) {
            setOpen(true);
            setColor(false);
            setStatus(false);
            setMessage("Error while inserting data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleHealthInfoClear = () => {
        setMedicalConditions({
            asthma: "no",
            diabetes: "no",
            heartProblem: "no",
            epilepsy: "no",
            allergies: "no",
            others: "no"
        });
        setAllergiesSpecify("");
        setOthersSpecify("");
        setPreviousMedicalConditions("");
        setPastSurgeries("");
        setPolio("");
        setDtp("");
        setMmr("");
        setHepatitisB("");
        setCovid19("");
        setVacinationOthersSpecify("");
        setMedication("");
        setMedicationDescription("");
        setAllergies("");
        setAllergiesDescription("");
        setSeverity("");
        setPrimaryContactName("");
        setPrimaryRelationship("");
        setPrimaryContactNumber("");
        setAlternateContactName("");
        setAlternateRelationship("");
        setAlternateContactNumber("");
        setPhysicianName("");
        setPhysicianContactNumber("");
        setPreferredHospital("");
    }

    return (
        <Box sx={{ width: "100%" }}>
            <SnackBar open={open} color={color} setOpen={setOpen} status={status} message={message} />
            {isLoading && <Loader />}
            <Box sx={{ backgroundColor: "#f2f2f2", borderRadius: "10px 10px 10px 0px", px: 2 }}>
                <Grid2 container sx={{ py: 1.5 }}>
                    <Grid2 size={{ xs: 12, md: 6, lg: 9 }} sx={{ display: "flex", alignItems: "center" }}>
                        <Link to="/dashboardmenu/student/information" style={{ textDecoration: "none" }}>
                            <IconButton sx={{ width: "27px", height: "27px", marginTop: "3px", mr: 1 }}>
                                <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                            </IconButton>
                        </Link>
                        <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>Create Student Details</Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6, lg: 3 }} sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                       <Typography sx={{ color: "#7F7F7F", fontSize: "16px" }}>
                            Academic Year: {new Date().getFullYear()}-{new Date().getFullYear() + 1}
                        </Typography>
                    </Grid2>
                </Grid2>
            </Box>
            <Box sx={{ maxHeight: "83vh", overflowY: "auto" }}>
                <Box sx={{ mt: 4 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{isMobile ? "" : label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Box pt={1}>
                        <Accordion sx={{ boxShadow: "none" }} defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{ backgroundColor: "#fff7f7", py: 0.5, position: "relative", }}
                            >
                                <Typography sx={{ fontWeight: "600" }} component="span">Student Academic Info</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid2 container pb={1}>
                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                        <Box >
                                            <Typography sx={{ fontSize: "12px" }} component="span">Application No<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                            <TextField
                                                disabled={isDisabledAcademic}
                                                id="outlined-size-small"
                                                size="small"
                                                value={applicationNo}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                                                    if (inputValue.length <= 20) {
                                                        setApplicationNo(inputValue);
                                                    }
                                                }}
                                                sx={{ mt: 0.5 }}
                                            />
                                        </Box>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                        <Box >
                                            <Typography sx={{ fontSize: "12px" }} component="span">Roll No <span style={{ fontSize: "10px" }}>(Student Permanent Number) </span> <span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                            <TextField
                                                disabled={isDisabledAcademic}
                                                id="outlined-size-small"
                                                size="small"
                                                value={studentPermanentNumber}
                                                onChange={(e) => setStudentPermanentNumber(e.target.value)}
                                                sx={{ mt: 0.5 }}
                                            />
                                        </Box>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                        <Box >
                                            <Typography sx={{ fontSize: "12px" }} component="span">Admission Class<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                            <Autocomplete
                                                disabled={isDisabledAcademic}
                                                disablePortal
                                                options={grades}
                                                getOptionLabel={(option) => option.sign}
                                                value={grades.find((item) => item.sign === selectedGradeId) || null}
                                                onChange={(event, newValue) => handleGradeChange(newValue)}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                sx={{ width: "223px", mt: 0.5 }}
                                                PopperComponent={(props) => (
                                                    <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                )}
                                                componentsProps={{
                                                    popper: {
                                                        sx: {
                                                            maxHeight: "180px",
                                                            overflowY: "auto",
                                                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                            borderRadius: "6px",
                                                        },
                                                    },
                                                    listbox: {
                                                        sx: {
                                                            fontSize: "14px",
                                                            padding: "5px",
                                                        },
                                                    },
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            sx: {
                                                                paddingRight: 0,
                                                                height: "41px",
                                                                width: "100%",
                                                                fontSize: "14px",
                                                            },
                                                        }}
                                                    />
                                                )}
                                            />

                                        </Box>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                        <Box >
                                            <Typography sx={{ fontSize: "12px" }} component="span">Section<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                            <Autocomplete
                                                disabled={isDisabledAcademic}
                                                disablePortal
                                                options={sections}
                                                getOptionLabel={(option) => option.sectionName}
                                                value={sections.find((option) => option.sectionName === selectedSection) || null}
                                                onChange={handleSectionChange}
                                                isOptionEqualToValue={(option, value) => option.sectionName === value.sectionName}
                                                sx={{ width: "223px", mt: 0.5 }}
                                                PopperComponent={(props) => (
                                                    <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                )}
                                                componentsProps={{
                                                    popper: {
                                                        sx: {
                                                            maxHeight: "180px",
                                                            overflowY: "auto",
                                                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                            borderRadius: "6px",
                                                        },
                                                    },
                                                    listbox: {
                                                        sx: {
                                                            fontSize: "14px",
                                                            padding: "5px",
                                                        },
                                                    },
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            sx: {
                                                                paddingRight: 0,
                                                                height: "41px",
                                                                fontSize: "14px",
                                                            },
                                                        }}
                                                    />
                                                )}
                                            />

                                        </Box>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                        <Box >
                                            <Typography sx={{ fontSize: "12px" }} component="span">Aadhar No<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                            <TextField
                                                disabled={isDisabledAcademic}
                                                id="outlined-size-small"
                                                size="small"
                                                sx={{ mt: 0.5 }}
                                                value={aadharNo}
                                                onChange={(e) => {
                                                    let numericValue = e.target.value.replace(/\D/g, "").slice(0, 12);
                                                    let formattedValue = numericValue.replace(/(\d{4})/g, "$1 ").trim();
                                                    setAadharNo(formattedValue);
                                                }}
                                                inputProps={{
                                                    maxLength: 14,
                                                    inputMode: "numeric",
                                                    pattern: "[0-9 ]*"
                                                }}
                                                error={aadharNo.replace(/\s/g, "").length > 0 && aadharNo.replace(/\s/g, "").length < 12}
                                                helperText={
                                                    aadharNo.replace(/\s/g, "").length > 0 && aadharNo.replace(/\s/g, "").length < 12
                                                        ? "Enter a valid Aadhar number"
                                                        : ""
                                                }
                                            />
                                        </Box>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                        <Box >
                                            <Typography sx={{ fontSize: "12px" }} component="span">EMIS No</Typography><br />
                                            <TextField
                                                disabled={isDisabledAcademic}
                                                id="outlined-required"
                                                size="small"
                                                value={emisNo}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (/^\d{0,10}$/.test(value)) {
                                                        setEmisNo(value);
                                                    }
                                                }}
                                                inputProps={{
                                                    maxLength: 10,
                                                    pattern: "[0-9]*",
                                                }}
                                                sx={{ mt: 0.5 }}
                                            />
                                        </Box>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                        <Box >
                                            <Typography sx={{ fontSize: "12px" }} component="span">Birth Certificate No<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                            <TextField
                                                disabled={isDisabledAcademic}
                                                id="outlined-size-small"
                                                size="small"
                                                sx={{ mt: 0.5 }}
                                                value={birthCertificateNo}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                                                    if (inputValue.length <= 15) {
                                                        setBirthCertificateNo(inputValue);
                                                    }
                                                }}
                                            />

                                        </Box>
                                    </Grid2>

                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                        <Box >
                                            <Typography sx={{ fontSize: "12px" }} component="span">RCH ID or PICME Number</Typography><br />
                                            <TextField
                                                disabled={isDisabledAcademic}
                                                id="outlined-size-small"
                                                size="small"
                                                value={rchIdOrPicmeNumber}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                                                    if (inputValue.length <= 15) {
                                                        setRchIdOrPicmeNumber(inputValue);
                                                    }
                                                }}
                                                sx={{ mt: 0.5 }}
                                            />
                                        </Box>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ px: 1.5, pt: 2 }}>
                                        <Box>
                                            <Typography sx={{ color: "#B0B0B0", fontSize: "12px", }}>Original Certificate Recived<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography>
                                            <Box sx={{ border: "1px solid #0000001A", display: "flex", justifyContent: "center", mt: 1, borderRadius: "5px", width: "110px" }}>
                                                <FormControl disabled={isDisabledAcademic}>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        value={originalCertificateReceived || ""}
                                                        name="radio-buttons-group"
                                                        onChange={(event) => setOriginalCertificateReceived(event.target.value)}
                                                        row
                                                    >
                                                        <FormControlLabel
                                                            value="yes"
                                                            control={<Radio sx={{ color: "gray", p: 0.3, mr: 0.5, '&.Mui-checked': { color: "gray" } }} size="small" />}
                                                            label="Yes"
                                                            sx={{ my: 0, ml: 0, mr: 0.5, '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
                                                        />
                                                        <FormControlLabel
                                                            value="no"
                                                            control={<Radio sx={{ color: "gray", p: 0.3, mr: 0.5, '&.Mui-checked': { color: "gray" } }} size="small" />}
                                                            label="No"
                                                            sx={{ m: 0, '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ px: 1.5, py: 2 }}>
                                        <Box>
                                            <Typography sx={{ color: "#B0B0B0", fontSize: "12px", }}>RTE Student<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography>
                                            <Box sx={{ border: "1px solid #0000001A", display: "flex", justifyContent: "center", mt: 1, borderRadius: "5px", width: "110px" }}>
                                                <FormControl disabled={isDisabledAcademic}>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        value={rteStudent || ""}
                                                        name="radio-buttons-group"
                                                        onChange={(event) => setRteStudent(event.target.value)}
                                                        row
                                                    >
                                                        <FormControlLabel
                                                            value="yes"
                                                            control={<Radio sx={{ color: "gray", p: 0.3, mr: 0.5, '&.Mui-checked': { color: "gray" } }} size="small" />}
                                                            label="Yes"
                                                            sx={{ my: 0, ml: 0, mr: 0.5, '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
                                                        />
                                                        <FormControlLabel
                                                            value="no"
                                                            control={<Radio sx={{ color: "gray", p: 0.3, mr: 0.5, '&.Mui-checked': { color: "gray" } }} size="small" />}
                                                            label="No"
                                                            sx={{ m: 0, '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </Grid2>
                                    <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
                                        {!isDisabledAcademic &&
                                            <>
                                                <Button onClick={handleAcademicClear} sx={{ textTransform: "none", color: "#000", py: 0.2, fontSize: "12px", px: 2.5, borderRadius: "20px" }}>
                                                    Clear
                                                </Button>
                                                <Button onClick={handleAcademicSubmit} sx={{ textTransform: "none", color: "#000", py: 0.2, px: 2.5, fontSize: "12px", borderRadius: "20px", backgroundColor: websiteSettings.mainColor }}>
                                                    Save
                                                </Button>
                                            </>
                                        }
                                        {isDisabledAcademic &&
                                            <Box sx={{ fontSize: "13px", color: "green", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center" }}><CheckCircleIcon style={{ fontSize: "20px" }} />&nbsp; Saved</Box>
                                        }
                                    </Box>

                                </Grid2>
                            </AccordionDetails>
                        </Accordion>

                        <Box sx={{ mt: 2 }}>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel2-header"
                                    sx={{ backgroundColor: "#fff7f7", py: 0.5, position: "relative" }}
                                >
                                    <Typography sx={{ fontWeight: "600" }} component="span">Student Info</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid2 container pb={1}>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Student Name In English<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledStudentInfo}
                                                    id="outlined-size-small"
                                                    size="small"
                                                    value={studentNameEnglish}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                        setStudentNameEnglish(inputValue);
                                                    }}
                                                    inputProps={{
                                                        maxLength: 25,
                                                        pattern: "[A-Za-z ]*"
                                                    }}
                                                    sx={{ mt: 0.5 }}
                                                />

                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Student Name In Tamil<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledStudentInfo}
                                                    id="outlined-size-small"
                                                    size="small"
                                                    value={studentNameTamil}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                        setStudentNameTamil(inputValue);
                                                    }}
                                                    inputProps={{
                                                        maxLength: 25,
                                                        pattern: "[A-Za-z ]*"
                                                    }}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Date Of Birth<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        disabled={isDisabledStudentInfo}
                                                        value={dateOfBirth ? dayjs(dateOfBirth, "DD-MM-YYYY") : null}
                                                        onChange={(newValue) => {
                                                            setDateOfBirth(newValue ? newValue.format("DD-MM-YYYY") : "");
                                                        }}
                                                        slotProps={{
                                                            textField: {
                                                                size: "small",
                                                                sx: { width: "223px", mt: 0.5 }
                                                            }
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Gender<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledStudentInfo}
                                                    disablePortal
                                                    options={["Male", "Female"]}
                                                    value={gender}
                                                    onChange={(event, newValue) => setGender(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />

                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
                                            <Box>
                                                <Typography sx={{ fontSize: "12px" }} component="span">
                                                    Religion<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span>
                                                </Typography>
                                                <br />
                                                <Autocomplete
                                                    disabled={isDisabledStudentInfo}
                                                    disablePortal
                                                    size="small"
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    options={DropDownList.religion}
                                                    value={religion}
                                                    onChange={(e, newValue) => {
                                                        setReligion(newValue);
                                                        setCommunity(null);
                                                    }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>

                                        {religion !== "Not Willing to Disclose" &&
                                            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
                                                <Box>
                                                    <Typography sx={{ fontSize: "12px" }} component="span">
                                                        Community<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span>
                                                    </Typography>
                                                    <br />
                                                    <Autocomplete
                                                        disabled={isDisabledStudentInfo}
                                                        disablePortal
                                                        size="small"
                                                        sx={{ width: "223px", mt: 0.5 }}
                                                        options={religion && DropDownList.communities[religion] ? DropDownList.communities[religion] : []}
                                                        value={community}
                                                        onChange={(e, newValue) => setCommunity(newValue)}
                                                        PopperComponent={(props) => (
                                                            <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                        )}
                                                        componentsProps={{
                                                            popper: {
                                                                sx: {
                                                                    maxHeight: "180px",
                                                                    overflowY: "auto",
                                                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                    borderRadius: "6px",
                                                                },
                                                            },
                                                            listbox: {
                                                                sx: {
                                                                    fontSize: "14px",
                                                                    padding: "5px",
                                                                },
                                                            },
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                fullWidth
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    sx: {
                                                                        paddingRight: 0,
                                                                        height: "41px",
                                                                        fontSize: "14px",
                                                                    },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Box>
                                            </Grid2>
                                        }
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Mother Tongue<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />

                                                <Autocomplete
                                                    disabled={isDisabledStudentInfo}
                                                    disablePortal
                                                    size="small"
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    options={DropDownList.motherTongue}
                                                    value={motherTongue}
                                                    onChange={(e, newValue) => {
                                                        setMotherTongue(newValue);
                                                    }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />

                                            </Box>
                                        </Grid2>

                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Previous School</Typography><br />
                                                <TextField
                                                    disabled={isDisabledStudentInfo}
                                                    id="outlined-size-small"
                                                    size="small"
                                                    value={previousSchool}
                                                    onChange={(e) => setPreviousSchool(e.target.value)}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Previous Board</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledStudentInfo}
                                                    disablePortal
                                                    options={["State Board", "CBSE", "ICSE", "IB", "NIOS", "AISSCE"]}
                                                    value={previousBoard}
                                                    onChange={(event, newValue) => setPreviousBoard(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Medium Of Instruction</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledStudentInfo}
                                                    disablePortal
                                                    options={["Tamil", 'English', 'Hindi']}
                                                    value={mediumOfInstruction}
                                                    onChange={(event, newValue) => setMediumOfInstruction(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Second Languge<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledStudentInfo}
                                                    disablePortal
                                                    options={["Tamil", 'English', 'Hindi', 'Sanskrit']}
                                                    value={secondLanguage}
                                                    onChange={(event, newValue) => setSecondLanguage(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Residential Address<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled
                                                    id="outlined-size-small"
                                                    value={residentialAddress}
                                                    size="small"
                                                    sx={{ mt: 0.5, width: "223px" }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={() => handleOpenTextArea(2)} edge="end">
                                                                    <AddIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Box>
                                            <Dialog
                                                open={openTextarea === 2}
                                                onClose={() => setOpenTextarea(null)}
                                                maxWidth="sm"
                                                fullWidth
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        minHeight: '200px',
                                                        padding: 2,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            backgroundColor: '#fff',
                                                            pr: 3,
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: "14px",
                                                                fontWeight: 'bold',
                                                                marginBottom: 1,
                                                                pb: 1,
                                                                borderBottom: "1px solid #AFAFAF",
                                                            }}
                                                        >
                                                            Add Residential Address
                                                        </Typography>
                                                        <TextareaAutosize
                                                            disabled={isDisabledStudentInfo}
                                                            minRows={6}
                                                            placeholder="Type here..."
                                                            value={residentialAddress}
                                                            onChange={(e) =>
                                                                setResidentialAddress(e.target.value)
                                                            }
                                                            style={{
                                                                width: '100%',
                                                                padding: '12px',
                                                                borderRadius: '6px',
                                                                border: '1px solid #ccc',
                                                                fontSize: '14px',
                                                                marginBottom: '20px',
                                                                resize: 'none',
                                                                border: "none",
                                                                outline: 'none',
                                                            }}
                                                        />
                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Button
                                                                onClick={() => setOpenTextarea(null)}
                                                                sx={{
                                                                    textTransform: 'none',
                                                                    backgroundColor: websiteSettings.mainColor,
                                                                    color: websiteSettings.textColor,
                                                                    borderRadius: '30px',
                                                                    fontSize: '16px',
                                                                    padding: '0px 35px',
                                                                    '&:hover': {
                                                                        backgroundColor: websiteSettings.mainColor || '#0056b3',
                                                                    },
                                                                }}
                                                            >
                                                                Save
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Dialog>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">City<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledStudentInfo}
                                                    id="outlined-size-small"
                                                    size="small"
                                                    value={city}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (/^[A-Za-z]{0,20}$/.test(value)) {
                                                            setCity(value);
                                                        }
                                                    }}
                                                    inputProps={{ maxLength: 20 }}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Pincode<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledStudentInfo}
                                                    id="outlined-size-small"
                                                    size="small"
                                                    value={pincode}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (/^\d{0,6}$/.test(value)) {
                                                            setPincode(value);
                                                        }
                                                    }}
                                                    inputProps={{
                                                        maxLength: 6,
                                                        pattern: "[0-9]*",
                                                    }}
                                                    sx={{ mt: 0.5 }}
                                                />

                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">State<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledStudentInfo}
                                                    disablePortal
                                                    options={DropDownList.state}
                                                    value={state}
                                                    onChange={(event, newValue) => setState(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Country<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled
                                                    id="outlined-size-small"
                                                    size="small"
                                                    value={"India"}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Blood Group<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledStudentInfo}
                                                    disablePortal
                                                    options={DropDownList.bloodGroup}
                                                    value={bloodGroup}
                                                    onChange={(event, newValue) => setBloodGroup(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
                                            {!isDisabledStudentInfo &&
                                                <>
                                                    <Button onClick={handleStudentClear} sx={{ textTransform: "none", color: "#000", py: 0.2, fontSize: "12px", px: 2.5, borderRadius: "20px" }}>
                                                        Clear
                                                    </Button>
                                                    <Button onClick={handleStudentSubmit} sx={{ textTransform: "none", color: "#000", py: 0.2, px: 2.5, fontSize: "12px", borderRadius: "20px", backgroundColor: websiteSettings.mainColor }}>
                                                        Save
                                                    </Button>
                                                </>
                                            }
                                            {isDisabledStudentInfo &&
                                                <Box sx={{ fontSize: "13px", color: "green", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center" }}><CheckCircleIcon style={{ fontSize: "20px" }} />&nbsp; Saved</Box>
                                            }
                                        </Box>
                                    </Grid2>
                                </AccordionDetails>
                            </Accordion>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel3-header"
                                    sx={{ backgroundColor: "#fff7f7", py: 0.5, position: "relative" }}
                                >
                                    <Typography sx={{ fontWeight: "600" }} component="span">Family Info</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ backgroundColor: "#8600BB", width: "150px", textAlign: "center", borderRadius: "0px 50px 50px 0px", py: 0.5, ml: 1.3, mt: 1 }}>
                                        <Typography sx={{ fontSize: "14px", color: "#fff" }} component="span">Fill Father Details</Typography>
                                    </Box>
                                    <Grid2 container pb={2.5} sx={{ borderBottom: "1px dotted black" }}>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Father’s Name In English<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledFamilyInfo}
                                                    id="outlined-size-small"
                                                    size="small"
                                                    value={fatherNameEnglish}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                        setFatherNameEnglish(inputValue);
                                                    }}
                                                    inputProps={{
                                                        maxLength: 25,
                                                        pattern: "[A-Za-z ]*"
                                                    }}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Father’s Name In Tamil<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledFamilyInfo}
                                                    id="outlined-size-small"
                                                    size="small"
                                                    value={fatherNameTamil}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                        setFatherNameTamil(inputValue);
                                                    }}
                                                    inputProps={{
                                                        maxLength: 25,
                                                        pattern: "[A-Za-z ]*"
                                                    }}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Qualification</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledFamilyInfo}
                                                    disablePortal
                                                    options={DropDownList.qualification}
                                                    value={fatherQualification}
                                                    onChange={(event, newValue) => setFatherQualification(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Organization</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledFamilyInfo}
                                                    disablePortal
                                                    options={DropDownList.organization}
                                                    value={fatherOrganization}
                                                    onChange={(event, newValue) => setFatherOrganization(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Designation</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledFamilyInfo}
                                                    disablePortal
                                                    options={DropDownList.designation}
                                                    value={fatherDesignation}
                                                    onChange={(event, newValue) => setFatherDesignation(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Annual Income</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledFamilyInfo}
                                                    disablePortal
                                                    options={DropDownList.annualIncome}
                                                    value={fatherAnnualIncome}
                                                    onChange={(event, newValue) => setFatherAnnualIncome(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Office Address</Typography><br />
                                                <TextField
                                                    disabled
                                                    id="outlined-size-small"
                                                    value={fatherOfficeAddress}
                                                    size="small"
                                                    sx={{ mt: 0.5, width: "223px" }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={() => handleOpenTextArea(1)} edge="end">
                                                                    <AddIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Box>
                                            <Dialog
                                                open={openTextarea === 1}
                                                onClose={() => setOpenTextarea(null)}
                                                maxWidth="sm"
                                                fullWidth
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        minHeight: '200px',
                                                        padding: 2,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            backgroundColor: '#fff',
                                                            pr: 3,
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: "14px",
                                                                fontWeight: 'bold',
                                                                marginBottom: 1,
                                                                pb: 1,
                                                                borderBottom: "1px solid #AFAFAF",
                                                            }}
                                                        >
                                                            Add Office Address
                                                        </Typography>
                                                        <TextareaAutosize
                                                            disabled={isDisabledFamilyInfo}
                                                            minRows={6}
                                                            placeholder="Type here..."
                                                            value={fatherOfficeAddress}
                                                            onChange={(e) =>
                                                                setFatherOfficeAddress(e.target.value)
                                                            }
                                                            style={{
                                                                width: '100%',
                                                                padding: '12px',
                                                                borderRadius: '6px',
                                                                border: '1px solid #ccc',
                                                                fontSize: '14px',
                                                                marginBottom: '20px',
                                                                resize: 'none',
                                                                border: "none",
                                                                outline: 'none',
                                                            }}
                                                        />
                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Button
                                                                onClick={() => setOpenTextarea(null)}
                                                                sx={{
                                                                    textTransform: 'none',
                                                                    backgroundColor: websiteSettings.mainColor,
                                                                    color: websiteSettings.textColor,
                                                                    borderRadius: '30px',
                                                                    fontSize: '16px',
                                                                    padding: '0px 35px',
                                                                    '&:hover': {
                                                                        backgroundColor: websiteSettings.mainColor || '#0056b3',
                                                                    },
                                                                }}
                                                            >
                                                                Save
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Dialog>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Mobile Number<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledFamilyInfo}
                                                    id="outlined-required"
                                                    size="small"
                                                    value={fatherMobileNumber}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (/^\d{0,10}$/.test(value)) {
                                                            setFatherMobileNumber(value);
                                                        }
                                                    }}
                                                    inputProps={{
                                                        maxLength: 10,
                                                        pattern: "[0-9]*",
                                                    }}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Email ID</Typography><br />
                                                <TextField
                                                    disabled={isDisabledFamilyInfo}
                                                    id="outlined-size-small"
                                                    type="email"
                                                    size="small"
                                                    value={fatherEmail}
                                                    sx={{ mt: 0.5 }}
                                                    onChange={(e) => setFatherEmail(e.target.value)}
                                                    error={fatherEmail !== "" && !fatherEmail.includes("@")}
                                                    helperText={fatherEmail !== "" && !fatherEmail.includes("@") ? "Enter a valid email address" : ""}
                                                />

                                            </Box>
                                        </Grid2>
                                    </Grid2>

                                    <Box sx={{ backgroundColor: "#8600BB", width: "150px", textAlign: "center", borderRadius: "0px 50px 50px 0px", py: 0.5, ml: 1.3, mt: 2 }}>
                                        <Typography sx={{ fontSize: "14px", color: "#fff" }} component="span">Fill Mother Details</Typography>
                                    </Box>
                                    <Grid2 container pb={1} >
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Mother's Name In English<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledFamilyInfo}
                                                    id="outlined-size-small"
                                                    size="small"
                                                    value={motherNameEnglish}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                        setMotherNameEnglish(inputValue);
                                                    }}
                                                    inputProps={{
                                                        maxLength: 25,
                                                        pattern: "[A-Za-z ]*"
                                                    }}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Mother's Name In Tamil<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledFamilyInfo}
                                                    id="outlined-size-small"
                                                    size="small"
                                                    value={motherNameTamil}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                        setMotherNameTamil(inputValue);
                                                    }}
                                                    inputProps={{
                                                        maxLength: 25,
                                                        pattern: "[A-Za-z ]*"
                                                    }}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Qualification</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledFamilyInfo}
                                                    disablePortal
                                                    options={DropDownList.qualification}
                                                    value={motherQualification}
                                                    onChange={(event, newValue) => setMotherQualification(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Organization</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledFamilyInfo}
                                                    disablePortal
                                                    options={DropDownList.organization}
                                                    value={motherOrganization}
                                                    onChange={(event, newValue) => setMotherOrganization(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Designation</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledFamilyInfo}
                                                    disablePortal
                                                    options={DropDownList.designation}
                                                    value={motherDesignation}
                                                    onChange={(event, newValue) => setMotherDesignation(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Annual Income</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledFamilyInfo}
                                                    disablePortal
                                                    options={DropDownList.annualIncome}
                                                    value={motherAnnualIncome}
                                                    onChange={(event, newValue) => setMotherAnnualIncome(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Office Address</Typography><br />
                                                <TextField
                                                    disabled
                                                    id="outlined-size-small"
                                                    value={motherOfficeAddress}
                                                    size="small"
                                                    sx={{ mt: 0.5, width: "223px" }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={() => handleOpenTextArea(3)} edge="end">
                                                                    <AddIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Box>
                                            <Dialog
                                                open={openTextarea === 3}
                                                onClose={() => setOpenTextarea(null)}
                                                maxWidth="sm"
                                                fullWidth
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        minHeight: '200px',
                                                        padding: 2,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            backgroundColor: '#fff',
                                                            pr: 3,
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: "14px",
                                                                fontWeight: 'bold',
                                                                marginBottom: 1,
                                                                pb: 1,
                                                                borderBottom: "1px solid #AFAFAF",
                                                            }}
                                                        >
                                                            Add Office Address
                                                        </Typography>
                                                        <TextareaAutosize
                                                            disabled={isDisabledFamilyInfo}
                                                            minRows={6}
                                                            placeholder="Type here..."
                                                            value={motherOfficeAddress}
                                                            onChange={(e) =>
                                                                setMotherOfficeAddress(e.target.value)
                                                            }
                                                            style={{
                                                                width: '100%',
                                                                padding: '12px',
                                                                borderRadius: '6px',
                                                                border: '1px solid #ccc',
                                                                fontSize: '14px',
                                                                marginBottom: '20px',
                                                                resize: 'none',
                                                                border: "none",
                                                                outline: 'none',
                                                            }}
                                                        />
                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Button
                                                                onClick={() => setOpenTextarea(null)}
                                                                sx={{
                                                                    textTransform: 'none',
                                                                    backgroundColor: websiteSettings.mainColor,
                                                                    color: websiteSettings.textColor,
                                                                    borderRadius: '30px',
                                                                    fontSize: '16px',
                                                                    padding: '0px 35px',
                                                                    '&:hover': {
                                                                        backgroundColor: websiteSettings.mainColor || '#0056b3',
                                                                    },
                                                                }}
                                                            >
                                                                Save
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Dialog>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Mobile Number<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledFamilyInfo}
                                                    id="outlined-required"
                                                    size="small"
                                                    value={motherMobileNumber}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (/^\d{0,10}$/.test(value)) {
                                                            setMotherMobileNumber(value);
                                                        }
                                                    }}
                                                    inputProps={{
                                                        maxLength: 10,
                                                        pattern: "[0-9]*",
                                                    }}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Email ID</Typography><br />
                                                <TextField
                                                    disabled={isDisabledFamilyInfo}
                                                    id="outlined-size-small"
                                                    type="email"
                                                    size="small"
                                                    value={motherEmail}
                                                    sx={{ mt: 0.5 }}
                                                    onChange={(e) => setMotherEmail(e.target.value)}
                                                    error={motherEmail !== "" && !motherEmail.includes("@")}
                                                    helperText={motherEmail !== "" && !motherEmail.includes("@") ? "Enter a valid email address" : ""}
                                                />

                                            </Box>
                                        </Grid2>
                                        <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
                                            {!isDisabledFamilyInfo &&
                                                <>
                                                    <Button onClick={handleFamilyInfoClear} sx={{ textTransform: "none", color: "#000", py: 0.2, fontSize: "12px", px: 2.5, borderRadius: "20px" }}>
                                                        Clear
                                                    </Button>
                                                    <Button onClick={handleFamilyInfoSubmit} sx={{ textTransform: "none", color: "#000", py: 0.2, px: 2.5, fontSize: "12px", borderRadius: "20px", backgroundColor: websiteSettings.mainColor }}>
                                                        Save
                                                    </Button>
                                                </>
                                            }
                                            {isDisabledFamilyInfo &&
                                                <Box sx={{ fontSize: "13px", color: "green", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center" }}><CheckCircleIcon style={{ fontSize: "20px" }} />&nbsp; Saved</Box>
                                            }
                                        </Box>
                                    </Grid2>
                                </AccordionDetails>
                            </Accordion>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel4-header"
                                    sx={{ backgroundColor: "#fff7f7", py: 0.5, position: "relative" }}
                                >
                                    <Typography sx={{ fontWeight: "600" }} component="span">Guardian Info</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid2 container pb={1}>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Guardian Name In English<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledGuardianInfo}
                                                    id="outlined-size-small"
                                                    size="small"
                                                    value={guardianNameEnglish}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                        setGuardianNameEnglish(inputValue);
                                                    }}
                                                    inputProps={{
                                                        maxLength: 25,
                                                        pattern: "[A-Za-z ]*"
                                                    }}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Guardian Name In Tamil<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledGuardianInfo}
                                                    id="outlined-size-small"
                                                    size="small"
                                                    value={guardianNameTamil}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                        setGuardianNameTamil(inputValue);
                                                    }}
                                                    inputProps={{
                                                        maxLength: 25,
                                                        pattern: "[A-Za-z ]*"
                                                    }}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Relationship</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledGuardianInfo}
                                                    disablePortal
                                                    options={DropDownList.relationship}
                                                    value={guardianRelationship}
                                                    onChange={(event, newValue) => setGuardianRelationship(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Organization</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledGuardianInfo}
                                                    disablePortal
                                                    options={DropDownList.organization}
                                                    value={guardianOrganization}
                                                    onChange={(event, newValue) => setGuardianOrganization(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Designation</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledGuardianInfo}
                                                    disablePortal
                                                    options={DropDownList.designation}
                                                    value={guardianDesignation}
                                                    onChange={(event, newValue) => setGuardianDesignation(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Annual Income</Typography><br />
                                                <Autocomplete
                                                    disabled={isDisabledGuardianInfo}
                                                    disablePortal
                                                    options={DropDownList.annualIncome}
                                                    value={guardianAnnualIncome}
                                                    onChange={(event, newValue) => setGuardianAnnualIncome(newValue || "")}
                                                    sx={{ width: "223px", mt: 0.5 }}
                                                    PopperComponent={(props) => (
                                                        <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                    )}
                                                    componentsProps={{
                                                        popper: {
                                                            sx: {
                                                                maxHeight: "180px",
                                                                overflowY: "auto",
                                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                borderRadius: "6px",
                                                            },
                                                        },
                                                        listbox: {
                                                            sx: {
                                                                fontSize: "14px",
                                                                padding: "5px",
                                                            },
                                                        },
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                sx: {
                                                                    paddingRight: 0,
                                                                    height: "41px",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Office Address</Typography><br />
                                                <TextField
                                                    disabled
                                                    id="outlined-size-small"
                                                    value={guardianOfficeAddress}
                                                    size="small"
                                                    sx={{ mt: 0.5, width: "223px" }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={() => handleOpenTextArea(4)} edge="end">
                                                                    <AddIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Box>
                                            <Dialog
                                                open={openTextarea === 4}
                                                onClose={() => setOpenTextarea(null)}
                                                maxWidth="sm"
                                                fullWidth
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        minHeight: '200px',
                                                        padding: 2,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            backgroundColor: '#fff',
                                                            pr: 3,
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: "14px",
                                                                fontWeight: 'bold',
                                                                marginBottom: 1,
                                                                pb: 1,
                                                                borderBottom: "1px solid #AFAFAF",
                                                            }}
                                                        >
                                                            Add Office Address
                                                        </Typography>
                                                        <TextareaAutosize
                                                            disabled={isDisabledGuardianInfo}
                                                            minRows={6}
                                                            placeholder="Type here..."
                                                            value={guardianOfficeAddress}
                                                            onChange={(e) =>
                                                                setGuardianOfficeAddress(e.target.value)
                                                            }
                                                            style={{
                                                                width: '100%',
                                                                padding: '12px',
                                                                borderRadius: '6px',
                                                                border: '1px solid #ccc',
                                                                fontSize: '14px',
                                                                marginBottom: '20px',
                                                                resize: 'none',
                                                                border: "none",
                                                                outline: 'none',
                                                            }}
                                                        />
                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Button
                                                                onClick={() => setOpenTextarea(null)}
                                                                sx={{
                                                                    textTransform: 'none',
                                                                    backgroundColor: websiteSettings.mainColor,
                                                                    color: websiteSettings.textColor,
                                                                    borderRadius: '30px',
                                                                    fontSize: '16px',
                                                                    padding: '0px 35px',
                                                                    '&:hover': {
                                                                        backgroundColor: websiteSettings.mainColor || '#0056b3',
                                                                    },
                                                                }}
                                                            >
                                                                Save
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Dialog>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Mobile Number<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                <TextField
                                                    disabled={isDisabledGuardianInfo}
                                                    id="outlined-required"
                                                    size="small"
                                                    value={guardianMobileNumber}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (/^\d{0,10}$/.test(value)) {
                                                            setGuardianMobileNumber(value);
                                                        }
                                                    }}
                                                    inputProps={{
                                                        maxLength: 10,
                                                        pattern: "[0-9]*",
                                                    }}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }} >
                                            <Box >
                                                <Typography sx={{ fontSize: "12px" }} component="span">Email ID</Typography><br />
                                                <TextField
                                                    disabled={isDisabledGuardianInfo}
                                                    id="outlined-size-small"
                                                    type="email"
                                                    size="small"
                                                    value={guardianEmail}
                                                    sx={{ mt: 0.5 }}
                                                    onChange={(e) => setGuardianEmail(e.target.value)}
                                                    error={motherEmail !== "" && !motherEmail.includes("@")}
                                                    helperText={motherEmail !== "" && !motherEmail.includes("@") ? "Enter a valid email address" : ""}
                                                />
                                            </Box>
                                        </Grid2>

                                        <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
                                            {!isDisabledGuardianInfo &&
                                                <>
                                                    <Button onClick={handleGuardianInfoClear} sx={{ textTransform: "none", color: "#000", py: 0.2, fontSize: "12px", px: 2.5, borderRadius: "20px" }}>
                                                        Clear
                                                    </Button>
                                                    <Button onClick={handleGuardianInfoSubmit} sx={{ textTransform: "none", color: "#000", py: 0.2, px: 2.5, fontSize: "12px", borderRadius: "20px", backgroundColor: websiteSettings.mainColor }}>
                                                        Save
                                                    </Button>
                                                </>}
                                            {isDisabledGuardianInfo &&
                                                <Box sx={{ fontSize: "13px", color: "green", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center" }}><CheckCircleIcon style={{ fontSize: "20px" }} />&nbsp; Saved</Box>
                                            }
                                        </Box>
                                    </Grid2>
                                </AccordionDetails>
                            </Accordion>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel5-header"
                                    sx={{ backgroundColor: "#fff7f7", py: 0.5, position: "relative" }}
                                >
                                    <Typography sx={{ fontWeight: "600" }} component="span">Sibling Info</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box>
                                        {siblings.map((sibling, index) => (
                                            <Box key={sibling.id} sx={{ my: 1.8, p: 1, borderRadius: "10px", position: "relative" }}>
                                                <Box px={1}>
                                                    <Grid2 container sx={{ backgroundColor: "#8600BB1A" }}>
                                                        <Grid2 size={10} >
                                                            <Box sx={{ backgroundColor: "#8600BB", width: "150px", textAlign: "center", borderRadius: "0px 50px 50px 0px", py: 0.5 }}>
                                                                <Typography sx={{ fontSize: "14px", color: "#fff", py: 0.3 }}>Sibling {index + 1}</Typography>
                                                            </Box>
                                                        </Grid2>
                                                        <Grid2 size={2} sx={{ display: "flex", justifyContent: "end", px: 1, alignItems: "center" }}>
                                                            {siblings.length < 3 && index === 0 && (
                                                                // <Button onClick={addSibling} sx={{ textDecoration: "underline !important", color: "black", py: 0.3 }}>
                                                                //     Add
                                                                // </Button>
                                                                <IconButton sx={{ width: "25px", height: "25px" }} onClick={addSibling} >
                                                                    <AddIcon style={{ fontSize: "20px", color: "#8600BB" }} />
                                                                </IconButton>
                                                            )}
                                                            {index > 0 && (
                                                                <IconButton sx={{ width: "25px", height: "25px" }} onClick={() => removeSibling(sibling.id)} >
                                                                    <RemoveIcon style={{ fontSize: "20px", color: "#8600BB" }} />
                                                                </IconButton>
                                                            )}
                                                        </Grid2>
                                                    </Grid2>
                                                </Box>
                                                <Grid2 container pt={1.5}>
                                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }}  >
                                                        <Box>
                                                            <Typography sx={{ fontSize: "12px" }}>Sibling Name In English<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography>
                                                            {/* <TextField
                                                                size="small"
                                                                fullWidth
                                                                value={sibling.siblingNameInEnglish}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value;
                                                                    if (/^[A-Za-z\s]{0,25}$/.test(inputValue)) {
                                                                        handleChange(sibling.id, "siblingNameInEnglish", inputValue);
                                                                    }
                                                                }}
                                                                sx={{ mt: 0.5 }}
                                                            /> */}
                                                            <TextField
                                                                disabled={isDisabledSiblingInfo}
                                                                size="small"
                                                                fullWidth
                                                                value={sibling.siblingNameInEnglish}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value.trim();
                                                                    if (/^[A-Za-z\s]{0,25}$/.test(inputValue)) {
                                                                        let isDuplicate = false;
                                                                        if (inputValue.length > 0) {
                                                                            isDuplicate = siblings.some(
                                                                                (s) => s.id !== sibling.id && s.siblingNameInEnglish === inputValue
                                                                            );
                                                                        }
                                                                        setSiblings((prevSiblings) =>
                                                                            prevSiblings.map((s) =>
                                                                                s.id === sibling.id
                                                                                    ? {
                                                                                        ...s,
                                                                                        siblingNameInEnglish: inputValue,
                                                                                        nameError: isDuplicate ? "This name already exists" : ""
                                                                                    }
                                                                                    : s
                                                                            )
                                                                        );
                                                                    }
                                                                }}
                                                                error={Boolean(sibling.nameError)}
                                                                helperText={sibling.nameError}
                                                            />

                                                        </Box>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 0.5 }}  >
                                                        <Box>
                                                            <Typography sx={{ fontSize: "12px" }}>Sibling Name In Tamil<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography>
                                                            <TextField
                                                                disabled={isDisabledSiblingInfo}
                                                                size="small"
                                                                fullWidth
                                                                value={sibling.siblingNameInTamil}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value;
                                                                    if (/^[A-Za-z\s]{0,25}$/.test(inputValue)) {
                                                                        handleChange(sibling.id, "siblingNameInTamil", inputValue);
                                                                    }
                                                                }}
                                                                sx={{ mt: 0.5 }}
                                                            />
                                                        </Box>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 0.3 }} >
                                                        <Box >
                                                            <Typography sx={{ fontSize: "12px" }} component="span">Gender<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                            <Autocomplete
                                                                disabled={isDisabledSiblingInfo}
                                                                disablePortal
                                                                options={["Male", "Female"]}
                                                                value={sibling.siblingGender}
                                                                onChange={(e, newValue) => handleChange(sibling.id, "siblingGender", newValue)}
                                                                sx={{ width: "223px", mt: 0.5 }}
                                                                PopperComponent={(props) => (
                                                                    <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                                )}
                                                                componentsProps={{
                                                                    popper: {
                                                                        sx: {
                                                                            maxHeight: "180px",
                                                                            overflowY: "auto",
                                                                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                            borderRadius: "6px",
                                                                        },
                                                                    },
                                                                    listbox: {
                                                                        sx: {
                                                                            fontSize: "14px",
                                                                            padding: "5px",
                                                                        },
                                                                    },
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        fullWidth
                                                                        InputProps={{
                                                                            ...params.InputProps,
                                                                            sx: {
                                                                                paddingRight: 0,
                                                                                height: "41px",
                                                                                fontSize: "14px",
                                                                            },
                                                                        }}
                                                                    />
                                                                )}
                                                            />

                                                        </Box>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 0.3 }} >
                                                        <Box >
                                                            <Typography sx={{ fontSize: "12px" }} component="span">Relationship<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography><br />
                                                            <Autocomplete
                                                                disabled={isDisabledSiblingInfo}
                                                                disablePortal
                                                                options={["Elder Brother", "Younger Brother", "Elder Sister", "Younger Sister"]}
                                                                value={sibling.siblingRelationship}
                                                                onChange={(e, newValue) => handleChange(sibling.id, "siblingRelationship", newValue)}
                                                                sx={{ width: "223px", mt: 0.5 }}
                                                                PopperComponent={(props) => (
                                                                    <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                                )}
                                                                componentsProps={{
                                                                    popper: {
                                                                        sx: {
                                                                            maxHeight: "180px",
                                                                            overflowY: "auto",
                                                                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                            borderRadius: "6px",
                                                                        },
                                                                    },
                                                                    listbox: {
                                                                        sx: {
                                                                            fontSize: "14px",
                                                                            padding: "5px",
                                                                        },
                                                                    },
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        fullWidth
                                                                        InputProps={{
                                                                            ...params.InputProps,
                                                                            sx: {
                                                                                paddingRight: 0,
                                                                                height: "41px",
                                                                                fontSize: "14px",
                                                                            },
                                                                        }}
                                                                    />
                                                                )}
                                                            />

                                                        </Box>
                                                    </Grid2>
                                                    {sibling.siblingStudyingInSameSchool === "no" &&
                                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }}  >
                                                            <Box>
                                                                <Typography sx={{ fontSize: "12px" }}>School Name</Typography>
                                                                <TextField
                                                                    disabled={isDisabledSiblingInfo}
                                                                    size="small"
                                                                    fullWidth
                                                                    value={sibling.siblingSchoolName}
                                                                    onChange={(e) => {
                                                                        const inputValue = e.target.value;
                                                                        if (/^[A-Za-z\s]{0,50}$/.test(inputValue)) {
                                                                            handleChange(sibling.id, "siblingSchoolName", inputValue);
                                                                        }
                                                                    }}
                                                                    sx={{ mt: 0.5 }}
                                                                />
                                                            </Box>
                                                        </Grid2>
                                                    }
                                                    {sibling.siblingStudyingInSameSchool === "yes" &&
                                                        <>
                                                            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 1 }}  >
                                                                <Box>
                                                                    <Typography sx={{ fontSize: "12px" }}>Admission No</Typography>
                                                                    <TextField
                                                                        disabled={isDisabledSiblingInfo}
                                                                        size="small"
                                                                        fullWidth
                                                                        value={sibling.siblingAdmissionNo}
                                                                        onChange={(e) => {
                                                                            const inputValue = e.target.value;
                                                                            if (/^[A-Za-z0-9\s]{0,15}$/.test(inputValue)) {
                                                                                handleChange(sibling.id, "siblingAdmissionNo", inputValue);
                                                                            }
                                                                        }}
                                                                        sx={{ mt: 0.5 }}
                                                                    />
                                                                </Box>
                                                            </Grid2>
                                                            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 0.3 }} >
                                                                <Box >
                                                                    <Typography sx={{ fontSize: "12px" }} component="span">Class</Typography><br />
                                                                    <Autocomplete
                                                                        disabled={isDisabledSiblingInfo}
                                                                        disablePortal
                                                                        options={grades}
                                                                        getOptionLabel={(option) => option.sign}
                                                                        value={grades.find((item) => item.sign === sibling.siblingClass) || null}
                                                                        onChange={(e, newValue) => handlesiblingClassChange(sibling.id, "siblingClass", newValue)}
                                                                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                                                        sx={{ width: "223px", mt: 0.5 }}
                                                                        PopperComponent={(props) => (
                                                                            <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                                        )}
                                                                        componentsProps={{
                                                                            popper: {
                                                                                sx: {
                                                                                    maxHeight: "180px",
                                                                                    overflowY: "auto",
                                                                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                                    borderRadius: "6px",
                                                                                },
                                                                            },
                                                                            listbox: {
                                                                                sx: {
                                                                                    fontSize: "14px",
                                                                                    padding: "5px",
                                                                                },
                                                                            },
                                                                        }}
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                fullWidth
                                                                                InputProps={{
                                                                                    ...params.InputProps,
                                                                                    sx: {
                                                                                        paddingRight: 0,
                                                                                        height: "41px",
                                                                                        width: "100%",
                                                                                        fontSize: "14px",
                                                                                    },
                                                                                }}
                                                                            />
                                                                        )}
                                                                    />

                                                                </Box>
                                                            </Grid2>
                                                            <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ display: "flex", justifyContent: "center", pt: 0.3 }} >
                                                                <Box >
                                                                    <Typography sx={{ fontSize: "12px" }} component="span">Section</Typography><br />
                                                                    <Autocomplete
                                                                        disabled={isDisabledSiblingInfo}
                                                                        disablePortal
                                                                        options={siblingSections}
                                                                        getOptionLabel={(option) => option.sectionName}
                                                                        value={siblingSections.find((option) => option.sectionName === sibling.siblingSection) || null}
                                                                        onChange={(e, newValue) => handleChange(sibling.id, "siblingSection", newValue ? newValue.sectionName : "")}
                                                                        isOptionEqualToValue={(option, value) => option.sectionName === value.sectionName}
                                                                        sx={{ width: "223px", mt: 0.5 }}
                                                                        PopperComponent={(props) => (
                                                                            <Popper {...props} modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]} />
                                                                        )}
                                                                        componentsProps={{
                                                                            popper: {
                                                                                sx: {
                                                                                    maxHeight: "180px",
                                                                                    overflowY: "auto",
                                                                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                                                                    borderRadius: "6px",
                                                                                },
                                                                            },
                                                                            listbox: {
                                                                                sx: {
                                                                                    fontSize: "14px",
                                                                                    padding: "5px",
                                                                                },
                                                                            },
                                                                        }}
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                fullWidth
                                                                                InputProps={{
                                                                                    ...params.InputProps,
                                                                                    sx: {
                                                                                        paddingRight: 0,
                                                                                        height: "41px",
                                                                                        fontSize: "14px",
                                                                                    },
                                                                                }}
                                                                            />
                                                                        )}
                                                                    />

                                                                </Box>
                                                            </Grid2>
                                                        </>
                                                    }
                                                    <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }} sx={{ pt: 1, px: 1 }}  >
                                                        <Box>
                                                            <Typography sx={{ fontSize: "12px" }}>Studying in Same School</Typography>
                                                            <FormControl disabled={isDisabledSiblingInfo}>
                                                                <RadioGroup
                                                                    row
                                                                    value={sibling.siblingStudyingInSameSchool}
                                                                    onChange={(e) => handleChange(sibling.id, "siblingStudyingInSameSchool", e.target.value)}
                                                                >
                                                                    <FormControlLabel value="yes" control={<Radio style={{ color: "gray" }} size="small" />} label="Yes" />
                                                                    <FormControlLabel value="no" control={<Radio style={{ color: "gray" }} size="small" />} label="No" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Box>
                                                    </Grid2>

                                                </Grid2>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
                                        {!isDisabledSiblingInfo &&
                                            <>
                                                <Button onClick={handleSibilingInfoClear} sx={{ textTransform: "none", color: "#000", py: 0.2, fontSize: "12px", px: 2.5, borderRadius: "20px" }}>
                                                    Clear
                                                </Button>
                                                <Button onClick={handleSibilingInfoSubmit} sx={{ textTransform: "none", color: "#000", py: 0.2, px: 2.5, fontSize: "12px", borderRadius: "20px", backgroundColor: websiteSettings.mainColor }}>
                                                    Save
                                                </Button>
                                            </>
                                        }
                                        {isDisabledSiblingInfo &&
                                            <Box sx={{ fontSize: "13px", color: "green", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center" }}><CheckCircleIcon style={{ fontSize: "20px" }} />&nbsp; Saved</Box>
                                        }
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel6-header"
                                    sx={{ backgroundColor: "#fff7f7", py: 0.5, position: "relative" }}
                                >
                                    <Typography sx={{ fontWeight: "600" }} component="span">Upload Documents</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                    <Dialog
                                        open={openPreviewImage}
                                        onClose={() => setOpenPreviewImage(false)}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            '& .MuiPaper-root': {
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none',
                                                borderRadius: 0,
                                                padding: 0,
                                                overflow: 'visible',
                                                maxWidth: '90vw',
                                                maxHeight: '90vh',
                                            },
                                        }}
                                        BackdropProps={{
                                            style: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
                                        }}
                                    >
                                        <img
                                            src={previewImage}
                                            alt="Popup"
                                            style={{
                                                width: 'auto',
                                                height: 'auto',
                                                maxWidth: '80vw',
                                                maxHeight: '80vh',
                                                display: 'block',
                                                margin: 'auto',
                                            }}
                                        />

                                        <DialogActions
                                            sx={{
                                                position: 'absolute',
                                                top: '-40px',
                                                right: "-50px",
                                                padding: 0,
                                            }}
                                        >
                                            <IconButton
                                                onClick={() => setOpenPreviewImage(false)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    color: '#fff',
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </DialogActions>
                                    </Dialog>

                                    <Dialog open={openPdf} onClose={handleClosePdf} fullWidth maxWidth="md">
                                        <DialogContent>
                                            {pdfUrl ? (
                                                <iframe
                                                    src={pdfUrl}
                                                    title="PDF Preview"
                                                    width="100%"
                                                    height="500px"
                                                />
                                            ) : (
                                                <p>Invalid PDF file.</p>
                                            )}
                                        </DialogContent>
                                    </Dialog>

                                    <Grid2 container rowSpacing={1} sx={{ pt: 2 }}>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }} >
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsBirth()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsBirth()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Birth Certificate</Typography>
                                                </Box>
                                                {birthCertificateFileType === "image" && birthCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(birthCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {birthCertificateFileType === "pdf" && birthCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(birthCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}

                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }} >
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsPhoto()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsPhoto()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Passport Size Photo<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography>
                                                </Box>
                                                {photoCertificateFileType === "image" && photoCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(photoCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {photoCertificateFileType === "pdf" && photoCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(photoCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }} >
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsAcademic()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsAcademic()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Previous Academic Report</Typography>
                                                </Box>
                                                {academicCertificateFileType === "image" && academicCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(academicCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {academicCertificateFileType === "pdf" && academicCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(academicCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }} >
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsTransfer()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsTransfer()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Transfer Certificate(TC)</Typography>
                                                </Box>
                                                {transferCertificateFileType === "image" && transferCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(transferCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {transferCertificateFileType === "pdf" && transferCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(transferCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }} >
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsAddress()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsAddress()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Address Proof(Student)<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography>
                                                </Box>
                                                {addressCertificateFileType === "image" && addressCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(addressCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {addressCertificateFileType === "pdf" && addressCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(addressCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }} >
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsAddressGuardian()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsAddressGuardian()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Address Proof(Guardian)</Typography>
                                                </Box>
                                                {addressGuardianCertificateFileType === "image" && addressGuardianCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(addressGuardianCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {addressGuardianCertificateFileType === "pdf" && addressGuardianCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(addressGuardianCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }} >
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsCaste()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsCaste()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Community Certificate<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography>
                                                </Box>
                                                {communityCertificateFileType === "image" && communityCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(communityCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {communityCertificateFileType === "pdf" && communityCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(communityCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }} >
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsIncome()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsIncome()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Income Certificate</Typography>
                                                </Box>
                                                {incomeCertificateFileType === "image" && incomeCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(incomeCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {incomeCertificateFileType === "pdf" && incomeCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(incomeCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }} >
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsMedical()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsMedical()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Medical Certificate</Typography>
                                                </Box>
                                                {medicalCertificateFileType === "image" && medicalCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(medicalCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {medicalCertificateFileType === "pdf" && medicalCertificate && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(medicalCertificate)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsSpecial()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsSpecial()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Special Needs Document</Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "6px", pt: 0.5, color: "#5A5A5A" }} component="span">Student special accommodations or support.</Typography>
                                                </Box>
                                                {specialNeedsDocumentFileType === "image" && specialNeedsDocument && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(specialNeedsDocument)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {specialNeedsDocumentFileType === "pdf" && specialNeedsDocument && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(specialNeedsDocument)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }} >
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsEmployment()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsEmployment()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Parent Employment Proof</Typography>
                                                </Box>
                                                {parentEmploymentProofFileType === "image" && parentEmploymentProof && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(parentEmploymentProof)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {parentEmploymentProofFileType === "pdf" && parentEmploymentProof && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(parentEmploymentProof)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }} >
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsAffidavit()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsAffidavit()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Affidavit / Declaration</Typography>
                                                </Box>
                                                {affidavitDeclarationFileType === "image" && affidavitDeclaration && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(affidavitDeclaration)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {affidavitDeclarationFileType === "pdf" && affidavitDeclaration && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(affidavitDeclaration)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }} >
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Box
                                                    {...getRootPropsAadhar()}
                                                    sx={{
                                                        border: "2px dashed #1976d2",
                                                        borderRadius: "8px",
                                                        p: 1,
                                                        width: "160px",
                                                        height: "145px",
                                                        // backgroundColor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                                                        backgroundColor: "#e3f2fd",
                                                        textAlign: "center",
                                                        cursor: isDisabledDocument ? "not-allowed" : "pointer",
                                                        pointerEvents: isDisabledDocument ? "none" : "auto",
                                                        opacity: isDisabledDocument ? 0.5 : 1,
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Box>
                                                        <input {...getInputPropsAadhar()} />
                                                        <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                                        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: "12px" }}>
                                                            Drag and Drop files here or <Typography sx={{ fontSize: "12px" }} component="span" color="primary">Choose file</Typography>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Typography sx={{ fontSize: "12px", textAlign: "center", pt: 0.5 }} component="span">Aadhar Card<span style={{ color: "#ff0000", fontSize: "16px" }}>*</span></Typography>
                                                </Box>
                                                {aadharCardFileType === "image" && aadharCard && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handlePreview(aadharCard)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                                {aadharCardFileType === "pdf" && aadharCard && (
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                            onClick={() => handleOpenPdf(aadharCard)}
                                                            sx={{ textTransform: "none", fontSize: "12px", py: 0, textDecoration: "underline !important" }}
                                                        >
                                                            View Document
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>
                                    </Grid2>
                                    <Box sx={{ px: 1.4, pt: 2, pb: 1 }}>
                                        <Typography variant="caption" color="#A8A8A8">
                                            Supported Format: JPG, JPEG, WebP, PNG
                                        </Typography>
                                        <Typography variant="caption" color="#A8A8A8" sx={{ display: "block", mt: 0.5 }}>
                                            Maximum Size: 25MB
                                        </Typography>
                                    </Box>
                                    <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
                                        {!isDisabledDocument &&
                                            <>
                                                <Button onClick={handleDocumentsClear} sx={{ textTransform: "none", color: "#000", py: 0.2, fontSize: "12px", px: 2.5, borderRadius: "20px" }}>
                                                    Clear
                                                </Button>
                                                <Button onClick={handleDocumentsSubmit} sx={{ textTransform: "none", color: "#000", py: 0.2, px: 2.5, fontSize: "12px", borderRadius: "20px", backgroundColor: websiteSettings.mainColor }}>
                                                    Save
                                                </Button>
                                            </>
                                        }
                                        {isDisabledDocument &&
                                                <Box sx={{ fontSize: "13px", color: "green", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center" }}><CheckCircleIcon style={{ fontSize: "20px" }} />&nbsp; Saved</Box>
                                            }
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel7-header"
                                    sx={{ backgroundColor: "#fff7f7", py: 0.5, position: "relative" }}
                                >
                                    <Typography sx={{ fontWeight: "600" }} component="span">Student General Health Info</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid2 container spacing={2} pb={1}>
                                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                            <Box sx={{
                                                backgroundColor: "#8600BB",
                                                width: "110px",
                                                borderRadius: "10px 10px 0px 0px", py: 0.5,
                                                px: 2,
                                                color: "#fff"
                                            }}>Medical History</Box>
                                            <Box sx={{ border: "1px solid #0000001A", borderRadius: "5px" }}>
                                                <Box sx={{ backgroundColor: "#F7F7F7", p: 1.5 }}>
                                                    <Typography sx={{ fontWeight: "600" }} component="span">Chronic Illnesses</Typography>
                                                </Box>
                                                <FormGroup sx={{ display: "flex", px: 2, pt: 1 }}>
                                                    <Grid2 container spacing={1} pb={1}>
                                                        <Grid2 size={{ xs: 6, sm: 6, md: 4, lg: 2.5 }} >
                                                            <FormControlLabel disabled={isDisabledHealthInfo} control={<Checkbox name="asthma" checked={medicalConditions.asthma === "yes"} onChange={handleCheckboxChange} />} label="Asthma" />
                                                        </Grid2>
                                                        <Grid2 size={{ xs: 6, sm: 6, md: 4, lg: 2.5 }} >
                                                            <FormControlLabel disabled={isDisabledHealthInfo} control={<Checkbox name="diabetes" checked={medicalConditions.diabetes === "yes"} onChange={handleCheckboxChange} />} label="Diabetes" />
                                                        </Grid2>
                                                        <Grid2 size={{ xs: 6, sm: 6, md: 4, lg: 4 }} >
                                                            <FormControlLabel disabled={isDisabledHealthInfo} control={<Checkbox name="heartProblem" checked={medicalConditions.heartProblem === "yes"} onChange={handleCheckboxChange} />} label="Heart Problem" />
                                                        </Grid2>
                                                        <Grid2 size={{ xs: 6, sm: 6, md: 4, lg: 3 }} >
                                                            <FormControlLabel disabled={isDisabledHealthInfo} control={<Checkbox name="epilepsy" checked={medicalConditions.epilepsy === "yes"} onChange={handleCheckboxChange} />} label="Epilepsy" />
                                                        </Grid2>
                                                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                                            <FormControlLabel disabled={isDisabledHealthInfo} control={<Checkbox name="allergies" checked={medicalConditions.allergies === "yes"} onChange={handleCheckboxChange} />} label="Allergies (specify)" />
                                                            <Textarea
                                                                disabled={isDisabledHealthInfo}
                                                                minRows={4}
                                                                value={allergiesSpecify}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value;
                                                                    if (inputValue.length <= 100) {
                                                                        setAllergiesSpecify(inputValue);
                                                                    }
                                                                }}
                                                            />
                                                            <Typography variant="caption" sx={{ color: "#A1A1A1", fontSize: "12px" }}>{allergiesSpecify.length}/100</Typography>
                                                        </Grid2>
                                                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                                            <FormControlLabel disabled={isDisabledHealthInfo} control={<Checkbox name="others" checked={medicalConditions.others === "yes"} onChange={handleCheckboxChange} />} label="Others (specify)" />
                                                            <Textarea minRows={4} value={othersSpecify}
                                                                disabled={isDisabledHealthInfo}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value;
                                                                    if (inputValue.length <= 100) {
                                                                        setOthersSpecify(inputValue);
                                                                    }
                                                                }} />
                                                            <Typography variant="caption" sx={{ color: "#A1A1A1", fontSize: "12px" }}>{othersSpecify.length}/100</Typography>
                                                        </Grid2>
                                                        <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ borderTop: "1px dotted #0000007A", mt: 2, mb: 1 }}></Grid2>
                                                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                                            <Typography sx={{}}>Previous Medical Conditions</Typography>
                                                            <Textarea disabled={isDisabledHealthInfo} minRows={4} value={previousMedicalConditions} onChange={(e) => {
                                                                const inputValue = e.target.value;
                                                                if (inputValue.length <= 100) {
                                                                    setPreviousMedicalConditions(inputValue);
                                                                }
                                                            }} />
                                                            <Typography variant="caption" sx={{ color: "#A1A1A1", fontSize: "12px" }}>{previousMedicalConditions.length}/100</Typography>
                                                        </Grid2>
                                                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                                            <Typography sx={{}}>Past Surgeries</Typography>
                                                            <Textarea disabled={isDisabledHealthInfo} minRows={4} value={pastSurgeries} onChange={(e) => {
                                                                const inputValue = e.target.value;
                                                                if (inputValue.length <= 100) {
                                                                    setPastSurgeries(inputValue);
                                                                }
                                                            }} />
                                                            <Typography variant="caption" sx={{ color: "#A1A1A1", fontSize: "12px" }}>{pastSurgeries.length}/100</Typography>
                                                        </Grid2>
                                                    </Grid2>
                                                </FormGroup>
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                            <Box sx={{ border: "1px solid #0000001A", borderRadius: "5px", mt: 3.7 }}>
                                                <Box sx={{ backgroundColor: "#F7F7F7", p: 1.5 }}>
                                                    <Typography sx={{ fontWeight: "600" }} component="span">Vacination Details</Typography>
                                                </Box>
                                                <FormGroup sx={{ display: "flex", px: 2, pt: 1 }}>
                                                    <Typography sx={{ color: "#A1A1A1", fontSize: "14px" }} component="span">Provide dates for the following Vaccinations, If applicable.</Typography>
                                                    <Grid2 container spacing={2} pb={1} pt={2}>
                                                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                                            <Grid2 container spacing={1} pb={1}>
                                                                <Grid2 size={12} >
                                                                    <Grid2 container spacing={1} pb={1}>
                                                                        <Grid2 size={5} sx={{ display: "flex", alignItems: "center" }}>
                                                                            <Typography component="span">Polio</Typography>
                                                                        </Grid2>
                                                                        <Grid2 size={7}>
                                                                            <TextField
                                                                                disabled={isDisabledHealthInfo}
                                                                                type="date"
                                                                                value={polio ? formatDateToInput(polio) : ""}
                                                                                onChange={(e) => setPolio(formatDateToDisplay(e.target.value))}
                                                                                sx={{
                                                                                    width: "160px",
                                                                                    "& .MuiInputBase-root": { height: "30px" }
                                                                                }}
                                                                            />
                                                                        </Grid2>
                                                                    </Grid2>

                                                                    <Grid2 container spacing={1} pb={1}>
                                                                        <Grid2 size={5} sx={{ display: "flex", alignItems: "center" }}>
                                                                            <Typography component="span">DTP</Typography>
                                                                        </Grid2>
                                                                        <Grid2 size={7}>
                                                                            <TextField
                                                                                disabled={isDisabledHealthInfo}
                                                                                type="date"
                                                                                value={dtp ? formatDateToInput(dtp) : ""}
                                                                                onChange={(e) => setDtp(formatDateToDisplay(e.target.value))}
                                                                                sx={{
                                                                                    width: "160px",
                                                                                    "& .MuiInputBase-root": { height: "30px" }
                                                                                }}
                                                                            />
                                                                        </Grid2>
                                                                    </Grid2>

                                                                    <Grid2 container spacing={1} pb={1}>
                                                                        <Grid2 size={5} sx={{ display: "flex", alignItems: "center" }}>
                                                                            <Typography component="span">MMR</Typography>
                                                                        </Grid2>
                                                                        <Grid2 size={7}>
                                                                            <TextField
                                                                                disabled={isDisabledHealthInfo}
                                                                                type="date"
                                                                                value={mmr ? formatDateToInput(mmr) : ""}
                                                                                onChange={(e) => setMmr(formatDateToDisplay(e.target.value))}
                                                                                sx={{
                                                                                    width: "160px",
                                                                                    "& .MuiInputBase-root": { height: "30px" }
                                                                                }}
                                                                            />
                                                                        </Grid2>
                                                                    </Grid2>

                                                                    <Grid2 container spacing={1} pb={1}>
                                                                        <Grid2 size={5} sx={{ display: "flex", alignItems: "center" }}>
                                                                            <Typography component="span">Hepatitis B</Typography>
                                                                        </Grid2>
                                                                        <Grid2 size={7}>
                                                                            <TextField
                                                                                disabled={isDisabledHealthInfo}
                                                                                type="date"
                                                                                value={hepatitisB ? formatDateToInput(hepatitisB) : ""}
                                                                                onChange={(e) => setHepatitisB(formatDateToDisplay(e.target.value))}
                                                                                sx={{
                                                                                    width: "160px",
                                                                                    "& .MuiInputBase-root": { height: "30px" }
                                                                                }}
                                                                            />
                                                                        </Grid2>
                                                                    </Grid2>

                                                                    <Grid2 container spacing={1} pb={1}>
                                                                        <Grid2 size={5} sx={{ display: "flex", alignItems: "center" }}>
                                                                            <Typography component="span">Covid-19</Typography>
                                                                        </Grid2>
                                                                        <Grid2 size={7}>
                                                                            <TextField
                                                                                disabled={isDisabledHealthInfo}
                                                                                type="date"
                                                                                value={covid19 ? formatDateToInput(covid19) : ""}
                                                                                onChange={(e) => setCovid19(formatDateToDisplay(e.target.value))}
                                                                                sx={{
                                                                                    width: "160px",
                                                                                    "& .MuiInputBase-root": { height: "30px" }
                                                                                }}
                                                                            />
                                                                        </Grid2>
                                                                    </Grid2>

                                                                </Grid2>
                                                            </Grid2>
                                                        </Grid2>
                                                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                                            <Box sx={{ pb: 1 }}>
                                                                <Typography component="span">Others (specify)</Typography>
                                                            </Box>
                                                            <Textarea disabled={isDisabledHealthInfo} minRows={5} value={vacinationOthersSpecify} onChange={(e) => {
                                                                const inputValue = e.target.value;
                                                                if (inputValue.length <= 100) {
                                                                    setVacinationOthersSpecify(inputValue);
                                                                }
                                                            }} />
                                                            <Typography variant="caption" sx={{ color: "#A1A1A1", fontSize: "12px" }}>{vacinationOthersSpecify.length}/100</Typography>
                                                        </Grid2>
                                                    </Grid2>
                                                </FormGroup>
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                            <Box sx={{ border: "1px solid #0000001A", borderRadius: "5px" }}>
                                                <Box sx={{ backgroundColor: "#F7F7F7", p: 1.5 }}>
                                                    <Typography sx={{ fontWeight: "600" }} component="span">Current Medications</Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", px: 2, pt: 2, pb: medication === "yes" ? 0 : 2 }}>
                                                    <Typography sx={{ fontSize: "16px" }} component="span">Is the student curently on any Medications ?</Typography>
                                                    <Box sx={{ border: "1px solid #0000001A", display: "flex", justifyContent: "center", borderRadius: "5px", width: "115px", ml: 2 }}>
                                                        <FormControl disabled={isDisabledHealthInfo}>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                name="radio-buttons-group"
                                                                value={medication}
                                                                onChange={(e) => setMedication(e.target.value)}
                                                                style={{ display: "flex", flexDirection: "row" }}
                                                            >
                                                                <FormControlLabel
                                                                    value="yes"
                                                                    control={<Radio sx={{
                                                                        color: "gray",
                                                                        p: 0.3,
                                                                        mr: 0.5,
                                                                        '&.Mui-checked': {
                                                                            color: "gray",
                                                                        },
                                                                    }} size="small" />}
                                                                    label="Yes"
                                                                    sx={{ my: 0, ml: 0, mr: 0.5, '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
                                                                />
                                                                <Typography sx={{ color: "#0000001a", px: 0.3 }}>|</Typography>

                                                                <FormControlLabel
                                                                    value="no"
                                                                    control={<Radio sx={{
                                                                        color: "gray",
                                                                        p: 0.3,
                                                                        mr: 0.5,
                                                                        '&.Mui-checked': {
                                                                            color: "gray",
                                                                        },
                                                                    }} size="small" />}
                                                                    label="No"
                                                                    sx={{ m: 0, '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
                                                                />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Box>
                                                </Box>
                                                {medication === "yes" && (
                                                    <Box px={2} pb={2}>
                                                        <Box sx={{ pb: 1 }}>
                                                            <Typography sx={{ fontSize: "14px", color: "gray" }} component="span">Enter Details</Typography>
                                                        </Box>
                                                        <Textarea disabled={isDisabledHealthInfo} minRows={7} value={medicationDescription} onChange={(e) => {
                                                            const inputValue = e.target.value;
                                                            if (inputValue.length <= 200) {
                                                                setMedicationDescription(inputValue);
                                                            }
                                                        }} />
                                                        <Typography variant="caption" sx={{ color: "#A1A1A1", fontSize: "12px" }}>{medicationDescription.length}/200</Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>

                                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                            <Box sx={{ border: "1px solid #0000001A", borderRadius: "5px" }}>
                                                <Box sx={{ backgroundColor: "#F7F7F7", p: 1.5 }}>
                                                    <Typography sx={{ fontWeight: "600" }} component="span">Allergies</Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", px: 2, pt: 2, pb: allergies === "yes" ? 0 : 2 }}>
                                                    <Typography sx={{ fontSize: "16px" }} component="span">Does the student have any known allergies ?</Typography>
                                                    <Box sx={{ border: "1px solid #0000001A", display: "flex", justifyContent: "center", borderRadius: "5px", width: "115px", ml: 2 }}>
                                                        <FormControl disabled={isDisabledHealthInfo}>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                name="radio-buttons-group"
                                                                value={allergies}
                                                                onChange={(e) => setAllergies(e.target.value)}
                                                                style={{ display: "flex", flexDirection: "row" }}
                                                            >
                                                                <FormControlLabel
                                                                    value="yes"
                                                                    control={<Radio sx={{
                                                                        color: "gray",
                                                                        p: 0.3,
                                                                        mr: 0.5,
                                                                        '&.Mui-checked': {
                                                                            color: "gray",
                                                                        },
                                                                    }} size="small" />}
                                                                    label="Yes"
                                                                    sx={{ my: 0, ml: 0, mr: 0.5, '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
                                                                />
                                                                <Typography sx={{ color: "#0000001a", px: 0.3 }}>|</Typography>

                                                                <FormControlLabel
                                                                    value="no"
                                                                    control={<Radio sx={{
                                                                        color: "gray",
                                                                        p: 0.3,
                                                                        mr: 0.5,
                                                                        '&.Mui-checked': {
                                                                            color: "gray",
                                                                        },
                                                                    }} size="small" />}
                                                                    label="No"
                                                                    sx={{ m: 0, '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
                                                                />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Box>
                                                </Box>
                                                {allergies === "yes" && (
                                                    <Box px={2} pb={1}>
                                                        <Box sx={{ pb: 1 }}>
                                                            <Typography sx={{ fontSize: "14px", color: "gray" }} component="span">Enter Details</Typography>
                                                        </Box>
                                                        <Textarea disabled={isDisabledHealthInfo}
                                                            sx={{ width: "85%" }} minRows={4} value={allergiesDescription} onChange={(e) => {
                                                                const inputValue = e.target.value;
                                                                if (inputValue.length <= 200) {
                                                                    setAllergiesDescription(inputValue);
                                                                }
                                                            }} />
                                                        <Typography variant="caption" sx={{ color: "#A1A1A1", fontSize: "12px" }}>{allergiesDescription.length}/200</Typography>
                                                        <Box sx={{ pt: 1.5 }}>
                                                            <Typography sx={{ fontSize: "16px" }} component="span">Reaction Severity</Typography>
                                                        </Box>
                                                        <FormControl disabled={isDisabledHealthInfo} component="fieldset" sx={{ width: "100%" }}>
                                                            <RadioGroup
                                                                row
                                                                value={severity}
                                                                onChange={handleSeverityChange}
                                                                sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
                                                            >
                                                                <Grid2 container spacing={1} sx={{ width: "100%" }}>
                                                                    <Grid2 xs={12} sm={6} md={4} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
                                                                        <FormControlLabel value="mild" control={<Radio />} label="Mild" sx={{ width: "100%" }} />
                                                                    </Grid2>
                                                                    <Grid2 xs={12} sm={6} md={4} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
                                                                        <FormControlLabel value="moderate" control={<Radio />} label="Moderate" sx={{ width: "100%" }} />
                                                                    </Grid2>
                                                                    <Grid2 xs={12} sm={6} md={4} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
                                                                        <FormControlLabel value="severe" control={<Radio />} label="Severe" sx={{ width: "100%" }} />
                                                                    </Grid2>
                                                                </Grid2>
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid2>

                                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                            <Box sx={{ border: "1px solid #0000001A", borderRadius: "5px" }}>
                                                <Box sx={{ backgroundColor: "#F7F7F7", p: 1.5 }}>
                                                    <Typography sx={{ fontWeight: "600" }} component="span">Emergency Contact Details</Typography>
                                                </Box>
                                                <Grid2 container spacing={2} sx={{ p: 2 }}>
                                                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: "12px" }} component="span">Primary Contact Name</Typography><br />
                                                            <TextField
                                                                disabled={isDisabledHealthInfo}
                                                                fullWidth
                                                                id="outlined-size-small"
                                                                size="small"
                                                                value={primaryContactName}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                                    setPrimaryContactName(inputValue);
                                                                }}
                                                                inputProps={{
                                                                    maxLength: 25,
                                                                    pattern: "[A-Za-z ]*"
                                                                }}
                                                                sx={{ mt: 0.5, height: "27px", "& .MuiInputBase-root": { height: "29px" } }}
                                                            />
                                                        </Box>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: "12px" }} component="span">Relationship</Typography><br />
                                                            <TextField
                                                                disabled={isDisabledHealthInfo}
                                                                fullWidth
                                                                id="outlined-size-small"
                                                                size="small"
                                                                value={primaryRelationship}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                                    setPrimaryRelationship(inputValue);
                                                                }}
                                                                inputProps={{
                                                                    maxLength: 25,
                                                                    pattern: "[A-Za-z ]*"
                                                                }}
                                                                sx={{ mt: 0.5, height: "27px", "& .MuiInputBase-root": { height: "29px" } }}
                                                            />
                                                        </Box>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: "12px" }} component="span">Contact Number</Typography><br />

                                                            <TextField
                                                                disabled={isDisabledHealthInfo}
                                                                fullWidth
                                                                id="outlined-required"
                                                                size="small"
                                                                value={primaryContactNumber}
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (/^\d{0,10}$/.test(value)) {
                                                                        setPrimaryContactNumber(value);
                                                                    }
                                                                }}
                                                                inputProps={{
                                                                    maxLength: 10,
                                                                    pattern: "[0-9]*",
                                                                }}
                                                                sx={{ mt: 0.5, height: "27px", "& .MuiInputBase-root": { height: "29px" } }}
                                                            />
                                                        </Box>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ borderTop: "1px dotted #0000007A", mt: 2, mb: 1 }}></Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: "12px" }} component="span">Alternate Contact Name</Typography><br />
                                                            <TextField
                                                                disabled={isDisabledHealthInfo}
                                                                fullWidth
                                                                id="outlined-size-small"
                                                                size="small"
                                                                value={alternateContactName}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                                    setAlternateContactName(inputValue);
                                                                }}
                                                                inputProps={{
                                                                    maxLength: 25,
                                                                    pattern: "[A-Za-z ]*"
                                                                }}
                                                                sx={{ mt: 0.5, height: "27px", "& .MuiInputBase-root": { height: "29px" } }}
                                                            />
                                                        </Box>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: "12px" }} component="span">Relationship</Typography><br />
                                                            <TextField
                                                                disabled={isDisabledHealthInfo}
                                                                fullWidth
                                                                id="outlined-size-small"
                                                                size="small"
                                                                value={alternateRelationship}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                                    setAlternateRelationship(inputValue);
                                                                }}
                                                                inputProps={{
                                                                    maxLength: 25,
                                                                    pattern: "[A-Za-z ]*"
                                                                }}
                                                                sx={{ mt: 0.5, height: "27px", "& .MuiInputBase-root": { height: "29px" } }}
                                                            />
                                                        </Box>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: "12px" }} component="span">Contact Number</Typography><br />
                                                            <TextField
                                                                disabled={isDisabledHealthInfo}
                                                                fullWidth
                                                                id="outlined-required"
                                                                size="small"
                                                                value={alternateContactNumber}
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (/^\d{0,10}$/.test(value)) {
                                                                        setAlternateContactNumber(value);
                                                                    }
                                                                }}
                                                                inputProps={{
                                                                    maxLength: 10,
                                                                    pattern: "[0-9]*",
                                                                }}
                                                                sx={{ mt: 0.5, height: "27px", "& .MuiInputBase-root": { height: "29px" } }}
                                                            />
                                                        </Box>
                                                    </Grid2>
                                                </Grid2>
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                            <Box sx={{ border: "1px solid #0000001A", borderRadius: "5px" }}>
                                                <Box sx={{ backgroundColor: "#F7F7F7", p: 1.5 }}>
                                                    <Typography sx={{ fontWeight: "600" }} component="span">Physician Contact Details</Typography>
                                                </Box>
                                                <Grid2 container spacing={2} sx={{ p: 2 }}>
                                                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: "12px" }} component="span">Family Physician’s Name</Typography><br />
                                                            <TextField
                                                                disabled={isDisabledHealthInfo}
                                                                fullWidth
                                                                id="outlined-size-small"
                                                                size="small"
                                                                value={physicianName}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 25);
                                                                    setPhysicianName(inputValue);
                                                                }}
                                                                inputProps={{
                                                                    maxLength: 25,
                                                                    pattern: "[A-Za-z ]*"
                                                                }}
                                                                sx={{ mt: 0.5, height: "27px", "& .MuiInputBase-root": { height: "29px" } }}
                                                            />
                                                        </Box>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: "12px" }} component="span">Physician’s Contact Number</Typography><br />
                                                            <TextField
                                                                disabled={isDisabledHealthInfo}
                                                                fullWidth
                                                                id="outlined-required"
                                                                size="small"
                                                                value={physicianContactNumber}
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (/^\d{0,10}$/.test(value)) {
                                                                        setPhysicianContactNumber(value);
                                                                    }
                                                                }}
                                                                inputProps={{
                                                                    maxLength: 10,
                                                                    pattern: "[0-9]*",
                                                                }}
                                                                sx={{ mt: 0.5, height: "27px", "& .MuiInputBase-root": { height: "29px" } }}
                                                            />
                                                        </Box>
                                                    </Grid2>
                                                    <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: "12px" }} component="span">Preferred Hospital / Clinic (Local)</Typography><br />
                                                            <TextField
                                                                disabled={isDisabledHealthInfo}
                                                                fullWidth
                                                                id="outlined-size-small"
                                                                size="small"
                                                                value={preferredHospital}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 50);
                                                                    setPreferredHospital(inputValue);
                                                                }}
                                                                inputProps={{
                                                                    maxLength: 50,
                                                                    pattern: "[A-Za-z ]*"
                                                                }}
                                                                sx={{ mt: 0.5, height: "27px", "& .MuiInputBase-root": { height: "29px" } }}
                                                            />
                                                        </Box>
                                                    </Grid2>
                                                </Grid2>
                                            </Box>
                                        </Grid2>
                                        <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
                                            {!isDisabledHealthInfo &&
                                                <>
                                                    <Button onClick={handleHealthInfoClear} sx={{ textTransform: "none", color: "#000", py: 0.2, fontSize: "12px", px: 2.5, borderRadius: "20px" }}>
                                                        Clear
                                                    </Button>
                                                    <Button onClick={handleHealthInfoSubmit} sx={{ textTransform: "none", color: "#000", py: 0.2, px: 2.5, fontSize: "12px", borderRadius: "20px", backgroundColor: websiteSettings.mainColor }}>
                                                        Save
                                                    </Button>
                                                </>
                                            }{isDisabledHealthInfo &&
                                                <Box sx={{ fontSize: "13px", color: "green", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center" }}><CheckCircleIcon style={{ fontSize: "20px" }} />&nbsp; Saved</Box>
                                            }
                                        </Box>
                                    </Grid2>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}